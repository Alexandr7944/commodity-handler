import catalogRepositories from "@/repositories/catalog.repositories";
import {Request, Response} from 'express';

class CatalogController {

    async create(req: Request, res: Response) {
        const catalog = req.body;
        try {
            const newCatalog = await catalogRepositories.create(catalog);
            res.status(201).send(newCatalog);
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Some error occurred while creating the Catalog. Error: ${error?.message}`
            });
        }
    }

    async createMultiple(req: Request, res: Response) {
        const catalog = req.body;
        try {
            const newCatalogs = await catalogRepositories.createMultiple(catalog);
            res.status(201).send(newCatalogs);
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Some error occurred while creating Catalog. Error: ${error?.message}`
            });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const catalogs = await catalogRepositories.findAll();
            res.status(200).send(catalogs);
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Some error occurred while retrieving catalogs. Error: ${error?.message}`
            });
        }
    }

    async findOne(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        try {
            const catalog = await catalogRepositories.findOne(id);

            catalog
                ? res.status(200).send(catalog)
                : res.status(404).send({message: `Cannot find Catalog with id=${id}.`});
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Error retrieving Catalog with id=${id}. Error: ${error.message}`
            });
        }
    }


    async update(req: Request, res: Response) {
        const catalog = req.body;
        catalog.id = parseInt(req.params.id);

        try {
            const num = await catalogRepositories.update(catalog);

            num
                ? res.status(200).send({message: "Catalog was updated successfully."})
                : res.status(404).send({
                    message: `Cannot update Catalog with id=${catalog.id}. Maybe Catalog was not found or req.body is empty!`
                });
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Error updating Catalog with id=${catalog.id}. Error: ${error.message}`
            });
        }
    }

    async destroy(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        try {
            const num = await catalogRepositories.destroy(id);

            num
                ? res.status(200).send({message: "Catalog was deleted successfully."})
                : res.status(404).send({
                    message: `Cannot delete Catalog with id=${id}. Maybe Catalog was not found or req.body is empty!`
                });
        } catch (error: Error | any) {
            res.status(500).send({
                message: error.message || `Could not delete Catalog with id==${id}. Error: ${error.message}`
            });
        }
    }
}

export default CatalogController;
