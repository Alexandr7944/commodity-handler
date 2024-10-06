import express from "express";
import RangeController from "@/controllers/range.controller";

class RangeRoutes {
    router: express.Router;
    controller: RangeController;


    constructor() {
        this.router = express.Router();
            this.controller = new RangeController();
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

export default new RangeRoutes().router;
