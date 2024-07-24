import Product from "../models/product.model";
import {ProductType} from "../interfaces";
import Catalog from "../models/catalog.model";
import Range from "../models/range.model";
import Characteristic from "../models/characteristic.model";
import {Transaction} from "sequelize";

class ProductRepositories {

    async create(product: Omit<ProductType, 'id'>, transaction?: Transaction) {
        return Product.create(product, {
            ...(transaction ? {transaction} : {}),
        });
    }

    async createMultiple(body: Omit<ProductType, 'id'>[]) {
        return Product.bulkCreate(body);
    }

    async findAll(params: Partial<ProductType>) {
        return Product.findAll({
            include: [Catalog, Range, Characteristic],
            order: [['id', 'ASC']],
            where: params,
        });
    }

    async findOne(id: number) {
        return Product.findByPk(id, {include: [Catalog, Range, Characteristic]});
    }

    async update(body: ProductType, transaction: Transaction) {
        return Product.update(body, {
            where: {id: body.id},
            transaction,
        });
    }

    async destroy(id: number, transaction?: Transaction) {
        return Product.destroy({
            where: {id},
            ...(transaction ? {transaction} : {}),
        });
    }
}

export default new ProductRepositories()
