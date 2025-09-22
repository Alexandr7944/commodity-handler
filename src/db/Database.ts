import {Sequelize} from "sequelize-typescript";
import config from "@/db/db.config";
import Catalog from "@/catalogs/data/catalog.model";
import Product from "@/products/data/product.model";
import Range from "@/ranges/data/range.model";
import Supplier from "@/suppliers/data/supplier.model";
import Characteristic from "@/characteristics/data/characteristic.model";
import Credential from "@/credentials/data/credential.model";

export {
    Catalog,
    Characteristic,
    Credential,
    Product,
    Range,
    Supplier
}
// import {Catalog, Credential, Characteristic, Product, Range, Supplier} from "@/models";

class Database {
    public sequelize: Sequelize | undefined;

    constructor() {
        this.connectToDatabase().catch(e => {
            console.log(e);
            throw e;
        });
    }

    private async connectToDatabase() {
        // @ts-ignore
        this.sequelize = new Sequelize({
            ...config,
            models: [Catalog, Credential, Characteristic, Product, Range, Supplier]
        });

        await this.sequelize
            .authenticate()
            .then(() => {
                if (process.env.TYPE !== 'TEST')
                    console.log("Connection has been established successfully.");
            })
            .catch((err) => {
                console.error("Unable to connect to the Database:", err);
            });
    }
}

export default new Database();
