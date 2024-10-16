import {Sequelize} from "sequelize-typescript";
import config from "@/config/db.config";
import {Catalog, Credential, Characteristic, Product, Range, Supplier} from "@/models";

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
