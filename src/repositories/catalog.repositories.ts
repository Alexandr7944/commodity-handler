import Models from "../models";
import {CatalogType} from "../interfaces";
import {Transaction} from "sequelize";
const {Catalog, Product} = Models;
class CatalogRepositories {

    async create(catalog: CatalogType, transaction?: Transaction) {
        return await Catalog.create(catalog, {
            ...(transaction ? {transaction} : {}),
        });
    }

    async createMultiple(body: CatalogType[]) {
        return await Catalog.bulkCreate(body);
    }

    async findAll() {
        return await Catalog.findAll({
            order: [['id', 'ASC']],
        });
    }

    async findOne(id: number) {
        return await Catalog.findByPk(id, {include: [Product]});
    }

    async update(body: CatalogType) {
        return await Catalog.update(body, {
            where: {id: body.id}
        });
    }

    async destroy(id: number, transaction?: Transaction) {
        return await Catalog.destroy({
            where: {id},
            ...(transaction ? {transaction} : {}),
        });
    }
}

export default new CatalogRepositories()
