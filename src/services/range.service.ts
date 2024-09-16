import BitrixCRUD from "./BitrixCRUD";
import {ProductType, RangeBitrixType, RangeType} from "../interfaces";

class RangeService extends BitrixCRUD {
    private saveElement = {} as RangeBitrixType;
    block = {
        IBLOCK_TYPE_ID: 'bitrix_processes',
        IBLOCK_ID: '37',
    }
    private dictionary: {
        'PROPERTY_927': 'owner',
        'PROPERTY_713': 'linkGoogleDrive',
        'PROPERTY_505': 'package',
        'PROPERTY_509': 'composition',
        'PROPERTY_471': 'HS',
        'PROPERTY_721': 'nameProducer',
        'PROPERTY_723': 'addressProducer',
        'PROPERTY_725': 'cargoDeclaration',
    };

    constructor() {
        super();
        this.dictionary = {
            'PROPERTY_927': 'owner',
            'PROPERTY_713': 'linkGoogleDrive',
            'PROPERTY_505': 'package',
            'PROPERTY_509': 'composition',
            'PROPERTY_471': 'HS',
            'PROPERTY_721': 'nameProducer',
            'PROPERTY_723': 'addressProducer',
            'PROPERTY_725': 'cargoDeclaration',
        }
        this.create = this.create.bind(this);
        this.getRanges = this.getRanges.bind(this);
        this.update = this.update.bind(this);
    }

    async create({range, product}: { range: RangeType, product: ProductType }): Promise<number> {
        this.saveElement['IBLOCK_ID'] = this.block.IBLOCK_ID;
        Object.entries(this.dictionary).forEach(([key, value]) => {
            if (range[value as keyof RangeType])
                this.saveElement = {...this.saveElement, [key]: range[value as keyof RangeType]}
        })
        this.saveElement['PROPERTY_771'] = await this.numberField(range.type, 'PROPERTY_771', this.block.IBLOCK_ID);             //type
        this.saveElement['PROPERTY_459'] = await this.numberField(product.color, 'PROPERTY_459', this.block.IBLOCK_ID);          //color
        this.saveElement['PROPERTY_919'] = await this.numberField(range.country, 'PROPERTY_919', this.block.IBLOCK_ID);          //country
        this.writeProductValue(product);

        const url = this.urlConverter('lists.element.add.json', {
            ...this.block,
            ELEMENT_CODE: `element_${product.id}`,
            fields: this.saveElement,
        });
        const {result} = await this.fetchRequest(url);
        console.log({method: 'RangeService.create', range, product, result});
        return result;
    }

    async getRanges(id?: number) {
        const url = this.urlConverter('lists.element.get.json', {
            ...this.block,
            ...(id ? {filter: {ID: id}} : {})
        });
        return this.getDataFromBitrix(url);
    }

    async update(range: RangeType) {
        [this.saveElement] = await this.getRanges(range.id);
        if (!this.saveElement)
            throw new Error('Range not found');
        for (const key in this.saveElement) {
            if (this.saveElement[key as keyof RangeBitrixType] instanceof Object) {
                const oldValue = Object.values(this.saveElement[key as keyof RangeBitrixType] || {})[0];
                const rangeKey = this.dictionary[key as keyof typeof this.dictionary] || '';
                const newValue = range[rangeKey as keyof RangeType];
                const resultValue = (newValue === null && oldValue !== newValue) ? (newValue || '') : oldValue;
                this.saveElement = {...this.saveElement, [key]: resultValue};
            }
        }

        this.saveElement['PROPERTY_771'] = await this.numberField(range.type, 'PROPERTY_771', this.block.IBLOCK_ID);
        this.saveElement['PROPERTY_919'] = await this.numberField(range.country, 'PROPERTY_919', this.block.IBLOCK_ID);

        const url = this.urlConverter('lists.element.update.json', {
            ...this.block,
            ELEMENT_ID: range.id,
            fields: this.saveElement
        });
        const {result} = await this.fetchRequest(url);
        console.log({method: 'RangeService.update', range, result});

    }

    async updateValueProduct({ranges, product}: { ranges: { id: number }[], product?: ProductType }) {
        for await (const range of ranges) {
            [this.saveElement] = await this.getRanges(range.id);
            for (const key in this.saveElement) {
                if (this.saveElement[key as keyof RangeBitrixType] instanceof Object) {
                    const value = Object.values(this.saveElement[key as keyof RangeBitrixType] || {})[0];
                    this.saveElement = {...this.saveElement, [key]: value};
                }
            }

            product && this.writeProductValue(product);
            const url = this.urlConverter('lists.element.update.json', {
                ...this.block,
                ELEMENT_ID: range.id,
                fields: this.saveElement
            });
            const {result} = await this.fetchRequest(url);
            console.log({method: 'RangeService.updateValueProduct', ranges, product, result});
        }
    }

    async destroy(id: number) {
        const url = this.urlConverter('lists.element.delete.json', {
            ...this.block,
            ELEMENT_ID: id
        });
        const result = await this.fetchRequest(url);
        console.log({method: 'RangeService.destroy', id, result});
    }

    writeProductValue(product: ProductType) {
        this.saveElement['NAME'] = this.getProductName(product);
        this.saveElement['PROPERTY_681'] = `${product.article}/`;
        this.saveElement['PROPERTY_935'] = product.size || '';
    }

    getRangeObj(range: RangeBitrixType) {
        const getValue = (obj: undefined | Record<string, string>) => Object.values(obj || {})[0];
        let result = {id: Number(range.ID)};
        Object.entries(this.dictionary).forEach(([key, value]) => {
            // @ts-ignore
            result[value] = getValue(range[key]);
        })
        return result;
    }
}

export default RangeService;
