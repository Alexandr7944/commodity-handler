import {Range, Product} from "@/models";
import {RangeType} from "@/interfaces";
import {Transaction} from "sequelize";

class RangeRepositories {

    async create(range: RangeType, transaction?: Transaction) {
        return await Range.create(range, {
            ...(transaction ? {transaction} : {}),
        });
    }

    async createMultiple(body: RangeType[]) {
        return await Range.bulkCreate(body);
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

    async destroy(id: number) {
        return await Range.destroy({
            where: {id}
        });
    }
}

export default new RangeRepositories()
