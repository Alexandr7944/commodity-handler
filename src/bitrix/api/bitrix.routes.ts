import express, {NextFunction, Request, Response} from "express";
import Auth from "@/credentials/domain/Auth";
import InitTransferData from "@/bitrix/domain/InitTransferData";
import BitrixCRUD from "@/bitrix/domain/BitrixCRUD";
import createHttpError from "http-errors";

class BitrixRoutes {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.init();
    }

    init() {
        this.router.get('/transfer', Auth.checkAuth, new InitTransferData().transfer);
        this.router.get('/brands', this.brands);
        this.router.get('/colors', this.colors);
        this.router.get('/country', this.country);
    }

    private async brands(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const brands = await new BitrixCRUD().getBrands();
            res.status(201).json(brands);
        } catch (err: Error | any) {
            next(createHttpError(500));
        }
    }

    private async colors(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const colors = await new BitrixCRUD().getColors();
            res.status(201).json(colors);
        } catch (err: Error | any) {
            next(createHttpError(500));
        }
    }

    private async country(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const country = await new BitrixCRUD().getCountry();
            res.status(201).json(country);
        } catch (err: Error | any) {
            next(createHttpError(500));
        }
    }
}

export default BitrixRoutes;
