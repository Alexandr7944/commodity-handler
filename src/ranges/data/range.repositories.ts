import {Range, Product} from "@/db/Database";
import {RangeType} from "@/interfaces";
import {Transaction} from "sequelize";

class RangeRepositories {

    async create(range: RangeType, transaction?: Transaction) {
        return await Range.create(range, {
            ...(transaction ? {transaction} : {}),
        });
    }

    async findAll() {
        return await Range.findAll({
            order: [['id', 'ASC']],
        });
    }

    async findOne(id: number) {
        return await Range.findByPk(id, {include: [Product]});
    }

    async update(body: RangeType, transaction: Transaction) {
        return await Range.update(body, {
            where: {id: body.id},
            transaction,
        });
    }

    async destroy(id: number, transaction?: Transaction) {
        return await Range.destroy({
            where: {id},
            ...(transaction ? {transaction} : {}),
        });
    }
}

export default new RangeRepositories()
