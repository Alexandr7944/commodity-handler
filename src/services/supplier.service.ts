import BitrixCRUD from "./BitrixCRUD";
import {SupplierType} from "../interfaces";

class SupplierService extends BitrixCRUD {
    async getSuppliers() {
        const urlId = this.urlConverter('crm.company.list.json', {select: ['ID']});
        const suppliersId = await this.getDataFromBitrix(urlId);

        const suppliers = [];
        for await (const {ID} of suppliersId) {
            const supplier = await this.readOne(ID);
            if (!supplier?.['UF_CRM_1651668052'])
                continue;
            suppliers.push(supplier);
        }
        return suppliers;
    }

    async readOne(id: number) {
        const url = this.urlConverter('crm.company.get.json', {id});
        return this.getDataFromBitrix(url);
    }

    async create(supplier: SupplierType) {
        const url = this.urlConverter('crm.company.add.json', {
            fields: {
                TITLE: supplier.name,
                COMPANY_TYPE: supplier.type,
                UF_CRM_1651668052: supplier.code,
            },
            params: {REGISTER_SONET_EVENT: "Y"}
        });
        const {result} = await this.fetchRequest(url);
        return result;
    }

    async update(supplier: Omit<SupplierType, 'code'>) {
        const url = this.urlConverter('crm.company.update.json', {
            id: supplier.id,
            fields: {
                TITLE: supplier.name,
                COMPANY_TYPE: supplier.type,
            },
            params: {REGISTER_SONET_EVENT: "Y"}
        });
        await this.fetchRequest(url);
    }

    async destroy(id: number) {
        const url = this.urlConverter('crm.company.delete.json', {id});
        await this.fetchRequest(url);
    }
}

export default SupplierService;
