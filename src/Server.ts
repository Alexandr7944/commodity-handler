import morgan from 'morgan';
import express, {Application} from "express";
import cors from "cors";
import Routes from "./routes";
import Database from "./db/Database";

require('console-stamp')(console, {
    format: ':date(dd.mm.yyyy HH:MM:ss.l) :label(10)'
});


class Server {
    constructor(app: Application) {
        this.config(app);
        this.syncDatabase();
        new Routes(app);
    }

    config(app: Application): void {
        const corsOptions = {
            credentials: true,
            origin: "https://docs.google.com/spreadsheets"
        };

        app.use(morgan('combined'));
        app.use(cors(corsOptions));
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
    }

    private syncDatabase() {
        Database.sequelize?.sync({
            alter: true,
            // force: false
        });
        console.log('Database sync complete');
    }
}

export default Server;
