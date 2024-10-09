import BitrixCRUD from "./BitrixCRUD";
import {CharacteristicType, ProductType, CharacteristicBitrixType} from "@/interfaces";
import supplierRepositories from "@/repositories/supplier.repositories";
import assert from "node:assert";

class CharacteristicService extends BitrixCRUD {
    private saveElement = {} as CharacteristicBitrixType
    private block = {
        IBLOCK_TYPE_ID: 'bitrix_processes',
        IBLOCK_ID: '47',
    }

    constructor() {
        super();
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.getCharacteristics = this.getCharacteristics.bind(this);
    }

    async create({characteristic, product}: { characteristic: CharacteristicType, product: ProductType }) {
        const supplier = await supplierRepositories.findOne(characteristic.supplierId);
        assert.ok(supplier?.code, 'Supplier not found');

        this.saveElement = {
            IBLOCK_ID: this.block.IBLOCK_ID,
            NAME: `${supplier.code}${this.getProductName(product)}`,
            PROPERTY_437: characteristic.rangeId,
            PROPERTY_687: `${supplier.code}${product.article}/`,
            PROPERTY_443: characteristic.supplierId,
            PROPERTY_461: await this.numberField(product.color, 'PROPERTY_461', this.block.IBLOCK_ID),
            PROPERTY_729: await this.numberField(characteristic.wbBrand, 'PROPERTY_729', this.block.IBLOCK_ID),
            PROPERTY_939: await this.numberField(characteristic.ozBrand, 'PROPERTY_939', this.block.IBLOCK_ID),
            PROPERTY_609: characteristic.wbBarcode || '',
            PROPERTY_611: characteristic.wbSku || '',
            PROPERTY_613: characteristic.ozBarcode || '',
            PROPERTY_615: characteristic.ozSku || '',
        };

        const url = this.urlConverter('lists.element.add.json', {
            ...this.block,
            ELEMENT_CODE: `element_${product.id}_${characteristic.supplierId}`,
            fields: this.saveElement
        });
        const {result} = await this.fetchRequest(url);
        console.log({method: 'CharacteristicService.create', characteristic, result});
        return result;
    }

    async getCharacteristics(id?: number) {
        const url = this.urlConverter('lists.element.get.json', {
            ...this.block,
            filter: {ID: id || ""}
        });
        return this.getDataFromBitrix(url);
    }

    async update(item: CharacteristicType) {
        [this.saveElement] = await this.getCharacteristics(item.id);
        for (const key in this.saveElement) {
            if (this.saveElement[key as keyof CharacteristicBitrixType] instanceof Object) {
                const value = Object.values(this.saveElement[key as keyof CharacteristicBitrixType] || {})[0];
                this.saveElement = {...this.saveElement, [key]: value};
            }
        }

        let [wbBrands, ozBrands] = await Promise.all([
            this.getField('47', 'PROPERTY_729'),
            this.getField('47', 'PROPERTY_939')
        ]);
        const getBrand = (brands: Record<string, string>, key?: string) =>
            Object.entries(brands).find(([_key, value]) => value === key)?.[0] || '';

        this.saveElement = {
            ...this.saveElement,
            PROPERTY_729: getBrand(wbBrands, item?.wbBrand),
            PROPERTY_609: item.wbBarcode || '',
            PROPERTY_611: item.wbSku || '',
            PROPERTY_939: getBrand(ozBrands, item?.ozBrand),
            PROPERTY_613: item.ozBarcode || '',
            PROPERTY_615: item.ozSku || '',
            PROPERTY_437: item.rangeId,
        }

        await this.save(item.id);
    }

    async updateValueProduct({ids, product}: { ids: { id: number }[], product: ProductType }) {
        for await (const {id} of ids) {
            [this.saveElement] = await this.getCharacteristics(id);
            for (const key in this.saveElement) {
                if (this.saveElement[key as keyof CharacteristicBitrixType] instanceof Object) {
                    const value = Object.values(this.saveElement[key as keyof CharacteristicBitrixType] || {})[0];
                    this.saveElement = {...this.saveElement, [key]: value};
                }
            }
            const code = this.saveElement['NAME'].slice(0, 2);
            this.saveElement['NAME'] = code + this.getProductName(product);
            this.saveElement['PROPERTY_687'] = code + product.article + '/';

            await this.save(id);
        }
    }

    async destroy(id: number) {
        const url = this.urlConverter('lists.element.delete.json', {
            ...this.block,
            ELEMENT_ID: id
        });
        const {result} = await this.fetchRequest(url);
        console.log({method: 'CharacteristicService.destroy', id, result});
    }

    get fields() {
        return {
            wbBrand: 'PROPERTY_729',
            wbBarcode: 'PROPERTY_609',
            wbSku: 'PROPERTY_611',
            ozBrand: 'PROPERTY_939',
            ozBarcode: 'PROPERTY_613',
            ozSku: 'PROPERTY_615',
            rangeId: 'PROPERTY_437',
            article: 'PROPERTY_687', // width code supplier
        }
    }

    async save(id: number) {
        console.log(this.saveElement);
        const url = this.urlConverter('lists.element.update.json', {
            ...this.block,
            ELEMENT_ID: id,
            fields: this.saveElement
        });
        const {result} = await this.fetchRequest(url);
        console.log({method: 'CharacteristicService.update', element: this.saveElement, result});
    }
}

export default CharacteristicService;
