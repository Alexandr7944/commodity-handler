import supplierRepositories from "@/repositories/supplier.repositories";
import {Request, Response} from 'express';
import SupplierService from "@/services/supplier.service";
import Database from "@/db/Database";

class SupplierController {

    async create(req: Request, res: Response) {
        const supplier = req.body;
        try {
            const bitrixId = await new SupplierService().create(supplier);
            if (!bitrixId && Number.isNaN(bitrixId))
                throw new Error('Supplier was not created!');

            supplier.id = bitrixId;
            const newSupplier = await supplierRepositories.create(supplier);
            res.status(201).send(newSupplier);
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Some error occurred while creating the Supplier. Error: ${error?.message}`
            });
        }
    }

    async createMultiple(req: Request, res: Response) {
        const supplier = req.body;
        try {
            const newSuppliers = await supplierRepositories.createMultiple(supplier);
            res.status(201).send(newSuppliers);
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Some error occurred while creating Supplier. Error: ${error?.message}`
            });
        }
    }

    async findAll(req: Request, res: Response) {
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
        const trx = await Database.sequelize?.transaction();
        if (!trx)
            throw new Error('Transaction not found!');

        try {
            const num = await supplierRepositories.update(supplier, trx);
            if (!num[0])
                throw new Error('Maybe Supplier was not found or req.body is empty!');

            await new SupplierService().update(supplier);
            trx.commit();
            res.status(200).send({message: "Supplier was updated successfully."})
        } catch (error: Error | any) {
            trx.rollback();
            res.status(500).send({
                message: `Error updating Supplier with id=${supplier.id}. Error: ${error.message}`
            });
        }
    }

    async destroy(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        try {
            await new SupplierService().destroy(id);
            const num = await supplierRepositories.destroy(id);

            num
                ? res.status(200).send({message: "Supplier was deleted successfully."})
                : res.status(404).send({
                    message: `Cannot delete Supplier with id=${id}. Maybe Supplier was not found or req.body is empty!`
                });
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Could not delete Supplier with id==${id}.`
            });
        }
    }
}

export default SupplierController;
