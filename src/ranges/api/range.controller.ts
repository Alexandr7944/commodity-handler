import {Request, Response} from 'express';
import Database from "@/db/Database";
import assert from "node:assert";
import rangeRepositories from "@/ranges/data/range.repositories";
import RangeService from "@/ranges/domain/range.service";

class RangeController {
    async update(req: Request, res: Response) {
        const range = req.body;
        range.id = parseInt(req.params.id);

        try {
            await Database.sequelize?.transaction(async (trx) => {
                const [num] = await rangeRepositories.update(range, trx);
                assert.ok(num, new Error('Range was not updated!'));
                await new RangeService().update(range);
                res.status(200).send({message: "Range was updated successfully."});
            });
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Error updating Range with id=${range.id}. Error: ${error.message}`
            });
        }
    }
}

export default RangeController;
