import express from "express";
import CatalogController from "../controllers/catalog.controller";

class CatalogRoutes {
    router: express.Router;
    controller: CatalogController;


    constructor() {
        this.router = express.Router();
        this.controller = new CatalogController();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post('/', this.controller.create);

        this.router.post('/multiple', this.controller.createMultiple);

        this.router.get('/', this.controller.findAll);

        this.router.get('/:id', this.controller.findOne);

        this.router.put('/:id', this.controller.update);

        this.router.delete('/:id', this.controller.destroy);
    }

}

export default new CatalogRoutes().router;
