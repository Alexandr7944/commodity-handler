import {NextFunction, Request, Response} from "express";
import createHttpError from "http-errors";
import BitrixCRUD from "@/bitrix/domain/BitrixCRUD";

export default class BitrixController {
    service: BitrixCRUD;

    constructor() {
        this.service = new BitrixCRUD();
        this.getBrands = this.getBrands.bind(this);
        this.getColors = this.getColors.bind(this);
        this.getCountry = this.getCountry.bind(this);
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
