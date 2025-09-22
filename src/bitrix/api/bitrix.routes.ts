import express, {Request, Response} from "express";
import Auth from "@/credentials/domain/Auth";
import InitTransferData from "@/bitrix/domain/InitTransferData";
import BitrixCRUD from "@/bitrix/domain/BitrixCRUD";

class BitrixRoutes {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get('/transfer', Auth.checkAuth, new InitTransferData().transfer);
        this.router.get('/brands', this.brands);
        this.router.get('/colors', this.colors);
        this.router.get('/country', this.country);
    }

    private async brands(_req: Request, res: Response) {
        const brands = await new BitrixCRUD().getBrands();
        res.status(201).json(brands);
    }

    private async colors(_req: Request, res: Response) {
        const colors = await new BitrixCRUD().getColors();
        res.status(201).json(colors);
    }

    private async country(_req: Request, res: Response) {
        const country = await new BitrixCRUD().getCountry();
        res.status(201).json(country);
    }
}

export default new BitrixRoutes().router;
