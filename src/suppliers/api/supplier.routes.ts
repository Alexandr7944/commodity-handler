import express from "express";
import SupplierController from "@/suppliers/api/supplier.controller";

class ProductRoutes {
    router: express.Router;
    controller: SupplierController;


    constructor() {
        this.router = express.Router();
        this.controller = new SupplierController();
        this.init();
    }

    init() {
        this.router.post('/', this.controller.create);
        this.router.get('/', this.controller.findAll);
        this.router.get('/:id', this.controller.findOne);
        this.router.put('/:id', this.controller.update);
        this.router.delete('/:id', this.controller.destroy);
    }
}

export default ProductRoutes;
