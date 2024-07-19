import express from "express";
import CharacteristicController from "../controllers/characteristic.controller";

class CharacteristicRoutes {
    router: express.Router;
    controller: CharacteristicController;


    constructor() {
        this.router = express.Router();
        this.controller = new CharacteristicController();
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

export default new CharacteristicRoutes().router;
