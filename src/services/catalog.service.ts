import BitrixCRUD from "./BitrixCRUD";
import {ProductType} from "../interfaces";

class CatalogService extends BitrixCRUD {
    async getCatalogs({select}: { select?: string[] }) {
        const url = this.urlConverter('crm.product.list.json', {...(select ? {select} : {})});
        return this.getDataFromBitrix(url);
    }

    async create(product: ProductType): Promise<number> {
        const url = this.urlConverter('crm.product.add.json', {
            fields: {
                NAME: this.getProductName(product),
                CURRENCY_ID: "RUB",
                SORT: 500
            },
        });
        const {result} = await this.fetchRequest(url);
        console.log({method: 'CatalogService.create', product, result});
        return result;
    }

    async update({ids, product}: { ids: { id: number }[], product: ProductType }) {
        for await (const {id} of ids) {
            const url = this.urlConverter('crm.product.update.json', {
                ID: id,
                fields: {NAME: this.getProductName(product)},
            });
            const result = await this.fetchRequest(url);
            console.log({method: 'CatalogService.update', product, result});
        }
    }

    async destroy(id: number) {
        const url = this.urlConverter('crm.product.delete.json', {id});
        const result = await this.fetchRequest(url);
        console.log({method: 'CatalogService.destroy', id, result});
    }
}

export default CatalogService;
