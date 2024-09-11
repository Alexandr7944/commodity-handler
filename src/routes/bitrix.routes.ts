import express, {Request, Response} from "express";
import InitTransferData from "../services/InitTransferData";
import BitrixCRUD from "../services/BitrixCRUD";
import Auth from "../services/Auth";

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

    private async brands(req: Request, res: Response) {
        const brands = await new BitrixCRUD().getBrands();
        res.status(201).json(brands);
    }

    private async colors(req: Request, res: Response) {
        const colors = await new BitrixCRUD().getColors();
        res.status(201).json(colors);
    }

    private async country(req: Request, res: Response) {
        const country = await new BitrixCRUD().getCountry();
        res.status(201).json(country);
    }
}

export default new BitrixRoutes().router;
