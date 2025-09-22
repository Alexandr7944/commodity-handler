import {Request, Response} from 'express';
import assert from "node:assert";
import Database from "@/db/Database";
import supplierRepositories from "@/suppliers/data/supplier.repositories";
import SupplierService from "@/suppliers/domain/supplier.service";

class SupplierController {

    async create(req: Request, res: Response) {
        const supplier = req.body;
        try {
            supplier.id = await new SupplierService().create(supplier);
            const newSupplier = await supplierRepositories.create(supplier);
            res.status(201).send(newSupplier);
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Some error occurred while creating the Supplier. Error: ${error?.message}`
            });
        }
    }

    async findAll(_req: Request, res: Response) {
        try {
            const suppliers = await supplierRepositories.findAll();
            res.status(200).send(suppliers);
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Some error occurred while retrieving suppliers. Error: ${error?.message}`
            });
        }
    }

    async findOne(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        try {
            const supplier = await supplierRepositories.findOne(id);

            supplier
                ? res.status(200).send(supplier)
                : res.status(404).send({message: `Cannot find Supplier with id=${id}.`});
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Error retrieving Supplier with id=${id}. Error: ${error.message}`
            });
        }
    }


    async update(req: Request, res: Response) {
        const supplier = req.body;
        supplier.id = parseInt(req.params.id);

        try {
            await Database.sequelize?.transaction(async (trx) => {
                const [num] = await supplierRepositories.update(supplier, trx);
                assert.ok(num, 'Supplier was not updated!');
                await new SupplierService().update(supplier);
                res.status(200).send({message: "Supplier was updated successfully."})
            });
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Error updating Supplier with id=${supplier.id}. Error: ${error.message}`
            });
        }
    }

    async destroy(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        try {
            const num = await supplierRepositories.destroy(id);
            assert.ok(num, 'Supplier was not deleted!');
            await new SupplierService().destroy(id);
            res.status(200).send({message: "Supplier was deleted successfully."});
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Could not delete Supplier with id==${id}.`
            });
        }
    }
}

export default SupplierController;
