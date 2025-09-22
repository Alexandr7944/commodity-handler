import express from "express";
import ProductController from "@/products/api/product.controller";
import Auth from "@/credentials/domain/Auth";

class ProductRoutes {
    router: express.Router;
    controller: ProductController;


    constructor() {
        this.router = express.Router();
        this.controller = new ProductController();
        this.init();
    }

    init() {
        this.router.post('/', this.controller.create);
        this.router.get('/', this.controller.findAll);
        this.router.get('/:id', this.controller.findOne);
        this.router.put('/:id', Auth.checkAuth, this.controller.update);
        this.router.delete('/:id', Auth.checkAuth, this.controller.destroy);
    }

}

export default ProductRoutes;
