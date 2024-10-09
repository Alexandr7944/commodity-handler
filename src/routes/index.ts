import {Application, Request, Response} from "express";
import productRoutes from "./product.routes";
import supplierRoutes from "./supplier.routes";
import rangeRoutes from "./range.routes";
import characteristicRoutes from "./characteristic.routes";
import bitrixRoutes from "./bitrix.routes";

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
