import BitrixCRUD from "./BitrixCRUD";
import {ProductType, RangeBitrixType} from "../interfaces";

class RangeService extends BitrixCRUD {
    private saveElement = {} as RangeBitrixType;
    block = {
        IBLOCK_TYPE_ID: 'bitrix_processes',
        IBLOCK_ID: '37',
    }

    constructor() {
        super();
        this.create = this.create.bind(this);
        this.getRanges = this.getRanges.bind(this);
        this.update = this.update.bind(this);
    }

    async create({type, product}: { type: string, product: ProductType }): Promise<number> {
        this.saveElement['IBLOCK_ID'] = this.block.IBLOCK_ID;
        this.saveElement['PROPERTY_771'] = await this.numberField(type, 'PROPERTY_771', this.block.IBLOCK_ID);                   //type
        this.saveElement['PROPERTY_459'] = await this.numberField(product.color, 'PROPERTY_459', this.block.IBLOCK_ID);          //color
        this.writeProductValue(product);

        console.log(this.saveElement);
        const url = this.urlConverter('lists.element.add.json', {
            ...this.block,
            ELEMENT_CODE: `element_${product.id}`,
            fields: this.saveElement,
        });
        const {result} = await this.fetchRequest(url);
        return result;
    }

    async getRanges(id?: number) {
        const url = this.urlConverter('lists.element.get.json', {
            ...this.block,
            ...(id ? {filter: {ID: id}} : {select: ['ID', 'NAME', 'PROPERTY_771']})
        });
        return this.getDataFromBitrix(url);
    }

    async update({ranges, product}: { ranges: { id: number, type?: string }[], product?: ProductType }) {
        for await (const range of ranges) {
            const {id, type} = range;
            [this.saveElement] = await this.getRanges(id);
            for (const key in this.saveElement) {
                if (this.saveElement[key as keyof RangeBitrixType] instanceof Object) {
                    const value = Object.values(this.saveElement[key as keyof RangeBitrixType] || {})[0];
                    this.saveElement = {...this.saveElement, [key]: value};
                }
            }

            if (type)
                this.saveElement['PROPERTY_771'] =  await this.numberField(type, 'PROPERTY_771', this.block.IBLOCK_ID);

            product && this.writeProductValue(product);

            console.log(this.saveElement);
            const url = this.urlConverter('lists.element.update.json', {
                ...this.block,
                ELEMENT_ID: id,
                fields: this.saveElement
            });
            await this.fetchRequest(url);
        }
    }

    async destroy(id: number) {
        const url = this.urlConverter('lists.element.delete.json', {
            ...this.block,
            ELEMENT_ID: id
        });
        await this.fetchRequest(url);
    }


    writeProductValue(product: ProductType) {
        this.saveElement['NAME'] = this.getProductName(product);
        this.saveElement['PROPERTY_681'] = `${product.article}/`;
        this.saveElement['PROPERTY_935'] = product.size || '';
    }
}

export default RangeService;
