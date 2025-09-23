import {Catalog} from "@/db/Database";
import {CatalogType} from "@/interfaces";
import {Transaction} from "sequelize";

class CatalogRepositories {

    async create(catalog: CatalogType, transaction?: Transaction) {
        return await Catalog.create(catalog, {
            ...(transaction ? {transaction} : {}),
        });
    }

    async findAll() {
        return await Catalog.findAll({
            order: [['id', 'ASC']],
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
