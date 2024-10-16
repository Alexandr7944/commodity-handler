import express from "express";
import CharacteristicController from "@/controllers/characteristic.controller";
import Auth from "@/services/Auth";

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
        this.router.get('/', this.controller.findAll);
        this.router.get('/:id', this.controller.findOne);
        this.router.put('/:id', this.controller.update);
        this.router.delete('/:id', Auth.checkAuth, this.controller.destroy);
    }

}

export default new CharacteristicRoutes().router;
