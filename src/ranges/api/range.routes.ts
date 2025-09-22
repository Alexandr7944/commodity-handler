import express from "express";
import RangeController from "@/ranges/api/range.controller";

class RangeRoutes {
    router: express.Router;
    controller: RangeController;


    constructor() {
        this.router = express.Router();
            this.controller = new RangeController();
            this.init();
    }

    init() {
        this.router.put('/:id', this.controller.update);
    }

}

export default RangeRoutes;
