import express from "express";
import CharacteristicController from "@/characteristics/api/characteristic.controller";
import Auth from "@/credentials/domain/Auth";

class CharacteristicRoutes {
    router: express.Router;
    controller: CharacteristicController;


    constructor() {
        this.router = express.Router();
        this.controller = new CharacteristicController();
        this.init();
    }

    init() {
        this.router.post('/', this.controller.create);
        this.router.get('/', this.controller.findAll);
        this.router.get('/:id', this.controller.findOne);
        this.router.put('/:id', this.controller.update);
        this.router.delete('/:id', Auth.checkAuth, this.controller.destroy);
    }

}

export default CharacteristicRoutes;
