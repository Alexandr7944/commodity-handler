import express, {Application, Request, Response} from "express";
import ProductRoutes from "@/products/api/product.routes";
import SupplierRoutes from "@/suppliers/api/supplier.routes";
import CharacteristicRoutes from "@/characteristics/api/characteristic.routes";
import RangeRoutes from "@/ranges/api/range.routes";
import BitrixRoutes from "@/bitrix/api/bitrix.routes";

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
        this.app.use("/", (_req: Request, res: Response) => res.json({message: 'Server work'}));
    }
}

export default Routes;
