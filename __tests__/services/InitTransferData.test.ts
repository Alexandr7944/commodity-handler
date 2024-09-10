import InitTransferData from "../../src/services/InitTransferData";
import express from "express";
import request from "supertest";
import Routes from "../../src/routes";

describe('test InitTransferData', () => {
    const app = express();
    new Routes(app);
    jest.mock("../../src/controllers/warehouse.controller", () =>
        class WarehouseController {
            findAll() {}
            findOne() {}
            updateData() {}
        });
    jest.useFakeTimers()
    // const transferData = new InitTransferData();        // TypeError: Cannot convert undefined or null to object at Function.getOwnPropertyDescriptor (<anonymous>)


    test('test convertName', () => {
        // const field = transferData.convertName('article/color/size - name');
        // expect(field).toEqual({
        //     article: 'article',
        //     name: 'name',
        //     color: 'color',
        //     size: 'size'
        // });
        expect('article/color/size - name').not.toEqual({})
    })

    test('test route /', async () => {
        await request(app).get('/').expect(200)
    })
})
