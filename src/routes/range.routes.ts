import express from "express";
import RangeController from "../controllers/range.controller";
import Auth from "../services/Auth";

class RangeRoutes {
    router: express.Router;
    controller: RangeController;


    constructor() {
        this.router = express.Router();
            this.controller = new RangeController();
            this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.put('/:id', this.controller.update);
    }

}

export default new RangeRoutes().router;
