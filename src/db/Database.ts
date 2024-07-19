import {Sequelize} from "sequelize-typescript";
import config from "../config/db.config";
import models from "../models";

class Database {
    public sequelize: Sequelize | undefined;

    constructor() {
        this.connectToDatabase();
    }

    private async connectToDatabase() {
        // @ts-ignore
        this.sequelize = new Sequelize({
            ...config,
            models: Object.values(models)
        });

        await this.sequelize
            .authenticate()
            .then(() => {
                console.log("Connection has been established successfully.");
            })
            .catch((err) => {
                console.error("Unable to connect to the Database:", err);
            });
    }
}

export default new Database();
