import {ProductType} from "../interfaces";
import assert from "node:assert";

class BitrixCRUD {
    acc: any[];
    bitrixUrl: URL;

    constructor() {
        this.acc = [];
        this.bitrixUrl = new URL(`${process.env.B24_HOST}/rest/${process.env.B24_USER}/${process.env.B24_KEY}/`);
    }

    async getBrands() {
        const [wbBrands, ozBrands] = await Promise.all([
            this.getField('47', 'PROPERTY_729'),
            this.getField('47', 'PROPERTY_939')
        ]);
        return {wbBrands, ozBrands};
    }

    async getColors() {
        return await this.getField('37', 'PROPERTY_459')
    }

    async getField(blockId: string, fieldId: string) {
        const url = this.urlConverter('lists.field.get.json', {
            IBLOCK_TYPE_ID: 'bitrix_processes',
            IBLOCK_ID: blockId,
            FIELD_ID: fieldId
        });
        let field = await this.fetchRequest(url);
        const secondKey = Object.keys(field.result)[0];
        return field?.result?.[secondKey]?.['DISPLAY_VALUES_FORM'] || null;
    }

    async getDataFromBitrix(url: string) {
        let firstCatalog = await this.fetchRequest(url);
        if (!firstCatalog || !firstCatalog.result) {
            console.log('first element is empty');
            return [];
        }
        const {result, total, next} = firstCatalog;
        if (result && (!total || !next))
            return result;

        this.acc.push(...result);
        for (let i = next; i <= total;) {
            let data = await this.fetchRequest(`${url}${url.includes('?') ? '&' : '?'}start=${i}`);
            if (!data || !data.result)
                console.log('data is empty');
            const {result} = data;
            this.acc.push(...result);
            i += next;
        }
        console.log(`elements amount: ${this.acc.length}, total: ${total}, next: ${next}`);
        setTimeout(() => this.acc = []);
        return this.acc;
    }

    async fetchRequest(url: string) {
        const response = await fetch(url);
        assert.ok(response.ok, `Could not fetch ${url}, received ${response.status}`);
        return await response.json();
    }

    // Record<string, string | number | string[] | Record<string, string | number | RangeBitrixType | CharacteristicBitrixType> | RangeBitrixType | CharacteristicBitrixType>
    urlConverter(method: string, query: any): string {
        const url = new URL(method, this.bitrixUrl);
        for (const key in query) {
            const value = query[key];
            if (typeof value === 'object') {
                for (const i in value) {
                    url.searchParams.append(`${key}[${i}]`, String(value[i as keyof typeof value]));
                }
            } else {
                url.searchParams.append(key, String(value));
            }
        }
        return url.href;
    }

    async numberField(searchValue: string | number | undefined, field: string, blockId: string) {
        if (!searchValue) return '';

        const fields = await this.getField(blockId, field);
        console.log(fields);
        const value = Number.isNaN(+searchValue)
            ? Object.entries(fields || {}).find(([_key, value]) => value === searchValue)?.[0]
            : fields[searchValue as keyof typeof fields];
        assert.ok(value, `Value ${searchValue} not found`);

        return value;
    }

    getProductName(product: ProductType): string {
        let name = `${product.article.trim()}`;
        if (product.color)
            name += `/${product.color.trim()}`;
        if (product.size)
            name += `/${product.size.trim()}`;

        name += ` - ${product.name.trim()}`
        return name;
    }
}

export default BitrixCRUD;
