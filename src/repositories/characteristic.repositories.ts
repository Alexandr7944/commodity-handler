import Characteristic from "../models/characteristic.model";
import {CharacteristicType} from "../interfaces";
import Product from "../models/product.model";
import Supplier from "../models/supplier.model";
import Range from "../models/range.model";
import {Transaction} from "sequelize";

class CharacteristicRepositories {

    async create(characteristics: CharacteristicType, transaction?: Transaction) {
        return await Characteristic.create(characteristics, {
            ...(transaction ? {transaction} : {}),
        });
    }

    async createMultiple(body: CharacteristicType[]) {
        return await Characteristic.bulkCreate(body);
    }

    async findAll() {
        return await Characteristic.findAll({
            include: [Product, Supplier, Range],
            order: [['id', 'ASC']],
        });
    }

    async findOne(id: number) {
        return await Characteristic.findByPk(id, {
            include: [Product, Supplier, Range]
        });
    }

    async update(body: CharacteristicType, transaction: Transaction) {
        return await Characteristic.update(body, {
            where: {id: body.id},
            transaction
        });
    }

    async destroy(id: number) {
        return await Characteristic.destroy({
            where: {id}
        });
    }
}

export default new CharacteristicRepositories()
