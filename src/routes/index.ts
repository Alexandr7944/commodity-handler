import {Application, NextFunction, Request, Response} from "express";
import ProductRoutes from "@/products/api/product.routes";
import SupplierRoutes from "@/suppliers/api/supplier.routes";
import CharacteristicRoutes from "@/characteristics/api/characteristic.routes";
import RangeRoutes from "@/ranges/api/range.routes";
import BitrixRoutes from "@/bitrix/api/bitrix.routes";
import createHttpError from "http-errors";

class Routes {
    constructor(private app: Application) {
        this.initRoutes();
    }

    initRoutes() {
        this.app.use("/characteristic", new CharacteristicRoutes().router);
        this.app.use("/range", new RangeRoutes().router);
        this.app.use("/supplier", new SupplierRoutes().router);
        this.app.use("/product", new ProductRoutes().router);
        this.app.use("/bitrix", new BitrixRoutes().router);
        this.app.use("/test", (_req: Request, res: Response) => res.json({message: 'Server work'}));

        this.app.use(function (_req: Request, _res: Response, next: NextFunction) {
            next(createHttpError(404, 'Route not found'));
        });

        this.initErrorRoute();
    }

    initErrorRoute() {
        this.app.use(function (err: Error | any, _req: Request, res: Response, _next: NextFunction) {
            if (err.status && err.status < 500) {
                console.warn(err.status, err.message);
                return res.status(err.status).send(err.message);
            }
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
    }
}

export default Routes;
