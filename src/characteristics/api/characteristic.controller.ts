import {Request, Response} from 'express';
import Database from "@/db/Database";
import assert from "node:assert";
import characteristicRepositories from "@/characteristics/data/characteristic.repositories";
import CharacteristicService from "@/characteristics/domain/characteristic.service";

class CharacteristicController {
    service: CharacteristicService;

    constructor() {
        this.service = new CharacteristicService();
    }

    async create(req: Request, res: Response) {
        const {characteristic, product} = req.body;
        try {
            characteristic.id = await this.service.create({characteristic, product});
            const newCharacteristic = await characteristicRepositories.create(characteristic);
            assert.ok(newCharacteristic.id, 'Characteristic was not created!');
            res.status(201).send(newCharacteristic);
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Some error occurred while creating the Characteristic. Error: ${error?.message}`
            });
        }
    }

    async findAll(_req: Request, res: Response) {
        try {
            const characteristics = await characteristicRepositories.findAll();
            res.status(200).send(characteristics);
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Some error occurred while retrieving characteristics. Error: ${error?.message}`
            });
        }
    }

    async findOne(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const characteristic = await characteristicRepositories.findOne(id);
            characteristic
                ? res.status(200).send(characteristic)
                : res.status(404).send({message: `Cannot find Characteristic with id=${id}.`});
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Error retrieving Characteristic with id=${id}. Error: ${error.message}`
            });
        }
    }


    async update(req: Request, res: Response) {
        const characteristic = req.body;
        characteristic.id = parseInt(req.params.id);

        try {
            await Database.sequelize?.transaction(async (trx) => {
                const [num] = await characteristicRepositories.update(characteristic, trx);
                assert.ok(num, 'Characteristic was not updated!');
                await this.service.update(characteristic)
                res.status(200).send({message: "Characteristic was updated successfully."})
            })
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Error updating Characteristic with id=${characteristic.id}. Error: ${error.message}`
            });
        }
    }

    async destroy(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const num = await characteristicRepositories.destroy(id);
            assert.ok(num, 'Characteristic was not deleted!');
            await this.service.destroy(id)
            res.status(200).send({message: "Characteristic was deleted successfully."})
        } catch (error: Error | any) {
            res.status(500).send({
                message: error.message || `Could not delete Characteristic with id==${id}. Error: ${error.message}`
            });
        }
    }
}

export default CharacteristicController;
