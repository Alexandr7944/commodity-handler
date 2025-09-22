import {Application, Request, Response} from "express";
import productRoutes from "@/products/api/product.routes";
import supplierRoutes from "@/suppliers/api/supplier.routes";
import characteristicRoutes from "@/characteristics/api/characteristic.routes";
import rangeRoutes from "@/ranges/api/range.routes";
import bitrixRoutes from "@/bitrix/api/bitrix.routes";

class Routes {
    constructor(app: Application) {
        app.use("/characteristic", characteristicRoutes);
        app.use("/range", rangeRoutes);
        app.use("/supplier", supplierRoutes);
        app.use("/product", productRoutes);
        app.use("/bitrix", bitrixRoutes);
        app.use("/", (req: Request, res: Response) => res.json({message: 'Server work'}));
    }
}

export default Routes;
