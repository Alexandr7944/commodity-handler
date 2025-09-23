import express from "express";
import Auth from "@/credentials/domain/Auth";
import InitTransferData from "@/bitrix/domain/InitTransferData";
import BitrixController from "@/bitrix/api/bitrix.controller";

class BitrixRoutes {
    router: express.Router;
    controller: BitrixController;

    constructor() {
        this.router = express.Router();
        this.controller = new BitrixController()
        this.init();
    }

    init() {
        this.router.get('/transfer', Auth.checkAuth, new InitTransferData().transfer);
        this.router.get('/brands', this.controller.getBrands);
        this.router.get('/colors', this.controller.getColors);
        this.router.get('/country', this.controller.getCountry);
    }
}

export default BitrixRoutes;
