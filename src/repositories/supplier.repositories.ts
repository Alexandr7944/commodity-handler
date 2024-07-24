import Supplier from "../models/supplier.model";
import {SupplierType} from "../interfaces";
import {Transaction} from "sequelize";


class SupplierRepositories {

    async create(product: SupplierType) {
        return await Supplier.create(product);
    }

    async findAll() {
        return await Supplier.findAll();
    }

    async findOne(id: number) {
        return await Supplier.findByPk(id);
    }

    async update(body: SupplierType, transaction: Transaction) {
        return await Supplier.update(body, {
            where: {id: body.id},
            transaction,
        });
    }

    async destroy(id: number) {
        return await Supplier.destroy({
            where: {id}
        });
    }
}

export default new SupplierRepositories()
