import express from "express";
import CatalogController from "../controllers/catalog.controller";
import Auth from "../services/Auth";

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
        this.router.put('/:id', Auth.checkAuth, this.controller.update);
        this.router.delete('/:id', Auth.checkAuth, this.controller.destroy);
    }

}

export default new CatalogRoutes().router;
