import {NextFunction, Request, Response} from "express";
import BitrixCRUD from "@/bitrix/domain/BitrixCRUD";
import createHttpError from "http-errors";


export default class BitrixController {
    service: BitrixCRUD;

    constructor() {
        this.service = new BitrixCRUD();
    }

    public async getBrands(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const brands = await this.service.getBrands();
            res.status(201).json(brands);
        } catch (err: Error | any) {
            next(createHttpError(500));
        }
    }

    public async getColors(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const colors = await this.service.getColors();
            res.status(201).json(colors);
        } catch (err: Error | any) {
            next(createHttpError(500));
        }
    }

    public async getCountry(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const country = await this.service.getCountry();
            res.status(201).json(country);
        } catch (err: Error | any) {
            next(createHttpError(500));
        }
    }
}
