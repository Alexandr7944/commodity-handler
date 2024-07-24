import rangeRepositories from "../repositories/range.repositories";
import {Request, Response} from 'express';
import Database from "../db/Database";
import RangeService from "../services/range.service";
import assert from "node:assert";

class RangeController {

    async create(req: Request, res: Response) {
        const range = req.body;

        try {
            const newRange = await rangeRepositories.create(range);
            res.status(201).send(newRange);
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Some error occurred while creating the Range. Error: ${error?.message}`
            });
        }
    }

    async createMultiple(req: Request, res: Response) {
        const range = req.body;
        try {
            const newRanges = await rangeRepositories.createMultiple(range);
            res.status(201).send(newRanges);
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Some error occurred while creating Range. Error: ${error?.message}`
            });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const ranges = await rangeRepositories.findAll();
            res.status(200).send(ranges);
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Some error occurred while retrieving ranges. Error: ${error?.message}`
            });
        }
    }

    async findOne(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        try {
            const range = await rangeRepositories.findOne(id);

            range
                ? res.status(200).send(range)
                : res.status(404).send({message: `Cannot find Range with id=${id}.`});
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Error retrieving Range with id=${id}. Error: ${error.message}`
            });
        }
    }


    async update(req: Request, res: Response) {
        const range = req.body;
        range.id = parseInt(req.params.id);

        try {
            await Database.sequelize?.transaction(async (trx) => {
                const [num] = await rangeRepositories.update(range, trx);
                assert.ok(num, new Error('Range was not updated!'));
                await new RangeService().update({ranges: [range]});
                res.status(200).send({message: "Range was updated successfully."});
            });
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Error updating Range with id=${range.id}. Error: ${error.message}`
            });
        }
    }

    async destroy(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        try {
            const num = await rangeRepositories.destroy(id);

            num
                ? res.status(200).send({message: "Range was deleted successfully."})
                : res.status(404).send({
                    message: `Cannot delete Range with id=${id}. Maybe Range was not found or req.body is empty!`
                });
        } catch (error: Error | any) {
            res.status(500).send({
                message: error.message || `Could not delete Range with id==${id}. Error: ${error.message}`
            });
        }
    }
}

export default RangeController;
