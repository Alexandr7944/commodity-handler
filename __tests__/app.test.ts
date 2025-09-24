import express from "express";
import request from "supertest";
import Database from "@/db/Database";
import Router from "@/routes";

describe("test the JWT authorization middleware", () => {
    const app = express();

    beforeAll(async () => {
        await Database.sequelize?.sync({force: true});
        new Router(app);
    })

    test('test route /', async () => {
        await request(app)
            .get('/test')
            .set('referer', 'test')
            .expect(200)
    })

    afterAll(() => {
        Database.sequelize?.close();
    })
})
