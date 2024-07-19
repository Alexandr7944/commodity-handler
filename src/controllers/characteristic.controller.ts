import characteristicRepositories from "../repositories/characteristic.repositories";
import {Request, Response} from 'express';
import Database from "../db/Database";
import CharacteristicService from "../services/characteristic.service";

class CharacteristicController {

    async create(req: Request, res: Response) {
        const characteristics = req.body;
        try {
            const newCharacteristic = await characteristicRepositories.create(characteristics);
            res.status(201).send(newCharacteristic);
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Some error occurred while creating the Characteristic. Error: ${error?.message}`
            });
        }
    }

    async createMultiple(req: Request, res: Response) {
        const characteristics = req.body;
        try {
            const newCharacteristic = await characteristicRepositories.createMultiple(characteristics);
            res.status(201).send(newCharacteristic);
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Some error occurred while creating Characteristic. Error: ${error?.message}`
            });
        }
    }

    async findAll(req: Request, res: Response) {
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
            const characteristics = await characteristicRepositories.findOne(id);

            characteristics
                ? res.status(200).send(characteristics)
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
            Database.sequelize?.transaction(async (trx) => {
                const num = await characteristicRepositories.update(characteristic, trx);
                if (!num)
                    throw new Error('Maybe Characteristic was not found or req.body is empty!');

                await new CharacteristicService().update(characteristic)
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

            num
                ? res.status(200).send({message: "Characteristic was deleted successfully."})
                : res.status(404).send({
                    message: `Cannot delete Characteristic with id=${id}. Maybe Characteristic was not found or req.body is empty!`
                });
        } catch (error: Error | any) {
            res.status(500).send({
                message: error.message || `Could not delete Characteristic with id==${id}. Error: ${error.message}`
            });
        }
    }
}

export default CharacteristicController;
