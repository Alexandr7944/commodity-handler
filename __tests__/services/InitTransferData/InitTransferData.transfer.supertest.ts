import express from "express";
import Database from "@/db/Database";
import Router from "@/routes";
import request from "supertest";
import {Credential} from "@/db/Database";

const range = {
    "ID":                "33341",
    "IBLOCK_ID":         "37",
    "NAME":              "12400217/Красный - Балансир фигурный Коты",
    "IBLOCK_SECTION_ID": null,
    "CREATED_BY":        "167",
    "BP_PUBLISHED":      "Y",
    "CODE":              null,
    "TIMESTAMP_X":       "26.08.2024 13:38:16",
    "MODIFIED_BY":       "157",
    "USER_NAME":         "(malykhinanadezdas@gmail.com) Надежда Малыхина",
    "PROPERTY_689":      {
        "25359013": "ПЕРВИЧНЫЕ ДАННЫЕ"
    },
    "PROPERTY_927":      {
        "25368353": "167"
    },
    "PROPERTY_771":      {
        "25368347": "351"
    },
    "PROPERTY_681":      {
        "25359011": "12400217/"
    },
    "PROPERTY_459":      {
        "25359007": "1971"
    },
    "PROPERTY_713":      {
        "25359023": "https://drive.google.com/drive/folders/19oKojWcI39-j5-PIYxf2EVkzl10OziefI?usp=sharing"
    },
    "PROPERTY_691":      {
        "25359015": "ОПИСАНИЕ"
    },
    "PROPERTY_499":      {
        "25360203": "14"
    },
    "PROPERTY_505":      {
        "25360205": "фигуры деревянные"
    },
    "PROPERTY_509":      {
        "25359009": "картон, дерево"
    },
    "PROPERTY_693":      {
        "25359017": "КАТЕГОРИИ"
    },
    "PROPERTY_471":      {
        "25360201": "9503006900"
    },
    "PROPERTY_919":      {
        "25368349": "361"
    },
    "PROPERTY_721":      {
        "25360223": "SOUTH CHINA SERVICE GROUP LIMITED"
    },
    "PROPERTY_723":      {
        "25360225": " HONGKONG, UNIT 2508A 25/F BANK OF AMERICA TOWER 12 HARCOURT"
    },
    "PROPERTY_725":      {
        "25360227": "10720010/191021/0084505"
    },
    "PROPERTY_695":      {
        "25359019": "ГАБАРИТЫ"
    },
    "PROPERTY_511":      {
        "25360207": "523"
    },
    "PROPERTY_517":      {
        "25360209": "24,2"
    },
    "PROPERTY_525":      {
        "25360211": "28,5"
    },
    "PROPERTY_531":      {
        "25360213": "3,5"
    },
    "PROPERTY_697":      {
        "25359021": "УПАКОВКА"
    },
    "PROPERTY_577":      {
        "25360415": "32395",
        "25360839": "33429"
    },
    "PROPERTY_597":      {
        "25360219": "530"
    },
    "PROPERTY_549":      {
        "25360215": "24,2"
    },
    "PROPERTY_599":      {
        "25360221": "28,5"
    },
    "PROPERTY_561":      {
        "25360217": "3,5"
    },
    "PROPERTY_587":      {
        "25360417": "18527"
    },
    "PROPERTY_593":      {
        "25360419": "30"
    },
    "PROPERTY_921":      {
        "25368351": "367"
    }
};
const supplier = {
    "ID":                        "219",
    "COMPANY_TYPE":              "PARTNER",
    "TITLE":                     "ИП Полухин Дмитрий Валерьевич",
    "LOGO":                      {
        "id":          7919,
        "showUrl":     "/bitrix/components/bitrix/crm.company.show/show_file.php?ownerId=219&fieldName=LOGO&dynamic=N&fileId=7919",
        "downloadUrl": "/bitrix/components/bitrix/crm.company.show/show_file.php?auth=4d820567005fdd460036df0c00004437000007e87679e661521c0010ca7cdac3a135f1&ownerId=219&fieldName=LOGO&dynamic=N&fileId=7919"
    },
    "LEAD_ID":                   null,
    "HAS_PHONE":                 "N",
    "HAS_EMAIL":                 "N",
    "HAS_IMOL":                  "N",
    "ASSIGNED_BY_ID":            "131",
    "CREATED_BY_ID":             "131",
    "MODIFY_BY_ID":              "115",
    "BANKING_DETAILS":           "",
    "INDUSTRY":                  "MANUFACTURING",
    "REVENUE":                   null,
    "CURRENCY_ID":               null,
    "EMPLOYEES":                 "EMPLOYEES_1",
    "COMMENTS":                  "",
    "DATE_CREATE":               "2020-07-08T10:39:12+03:00",
    "DATE_MODIFY":               "2022-05-24T21:06:30+03:00",
    "OPENED":                    "Y",
    "IS_MY_COMPANY":             "N",
    "ORIGINATOR_ID":             null,
    "ORIGIN_ID":                 null,
    "ORIGIN_VERSION":            null,
    "LAST_ACTIVITY_TIME":        "2020-07-08T10:39:12+03:00",
    "ADDRESS":                   null,
    "ADDRESS_2":                 null,
    "ADDRESS_CITY":              null,
    "ADDRESS_POSTAL_CODE":       null,
    "ADDRESS_REGION":            null,
    "ADDRESS_PROVINCE":          null,
    "ADDRESS_COUNTRY":           null,
    "ADDRESS_COUNTRY_CODE":      null,
    "ADDRESS_LOC_ADDR_ID":       null,
    "ADDRESS_LEGAL":             null,
    "REG_ADDRESS":               null,
    "REG_ADDRESS_2":             null,
    "REG_ADDRESS_CITY":          null,
    "REG_ADDRESS_POSTAL_CODE":   null,
    "REG_ADDRESS_REGION":        null,
    "REG_ADDRESS_PROVINCE":      null,
    "REG_ADDRESS_COUNTRY":       null,
    "REG_ADDRESS_COUNTRY_CODE":  null,
    "REG_ADDRESS_LOC_ADDR_ID":   null,
    "UTM_SOURCE":                null,
    "UTM_MEDIUM":                null,
    "UTM_CAMPAIGN":              null,
    "UTM_CONTENT":               null,
    "UTM_TERM":                  null,
    "LAST_ACTIVITY_BY":          "131",
    "UF_CRM_5E6131862658A":      "",
    "UF_CRM_5E613186331D6":      "",
    "UF_CRM_RU_ANALITYCS":       "",
    "UF_CRM_1651668052":         "DP",
    "UF_CRM_RUROBOT_SBP_URL":    "",
    "UF_CRM_RUROBOT_CHEK_URL":   "",
    "UF_CRM_RU_DIADOK":          false,
    "UF_CRM_CO_RUROBOT_INN_BIK": "",
    "UF_CRM_CO_RUROBOT_INN_ADD": "",
    "UF_CRM_CO_RUROBOT_INN":     "",
    "UF_CRM_CO_RUROBOT_BIK":     "",
    "UF_CRM_CO_RUROBOT_BP":      ""
};
const characteristic = {
    "ID":                "33345",
    "IBLOCK_ID":         "47",
    "NAME":              "DP12400217/Красный - Балансир фигурный Коты",
    "IBLOCK_SECTION_ID": null,
    "CREATED_BY":        "167",
    "BP_PUBLISHED":      "Y",
    "CODE":              null,
    "TIMESTAMP_X":       "16.07.2024 17:22:09",
    "MODIFIED_BY":       "157",
    "USER_NAME":         "(malykhinanadezdas@gmail.com) Надежда Малыхина",
    "DATE_CREATE":       "08.04.2024 17:55:00",
    "CREATED_USER_NAME": "(Plekhun_natalya@mail.ru) Наталья Плехун",
    "PROPERTY_437":      {
        "25359051": "33341"
    },
    "PROPERTY_687":      {
        "25359055": "DP12400217/"
    },
    "PROPERTY_443":      {
        "25359053": "219"
    },
    "PROPERTY_1005":     {
        "25359061": "WB"
    },
    "PROPERTY_729":      {
        "25365933": "371"
    },
    "PROPERTY_609":      {
        "25360237": "2039868677855"
    },
    "PROPERTY_611":      {
        "25360239": "225911209"
    },
    "PROPERTY_1007":     {
        "25359063": "OZON"
    },
    "PROPERTY_929":      {
        "25365937": "373"
    },
    "PROPERTY_767":      {
        "25365935": "477"
    },
    "PROPERTY_937":      {
        "25365939": "383"
    }
};
const types = {
    "351": "ТОП",
    "353": "Активный",
    "355": "Расходники",
    "357": "Выкупы",
    "359": "Архив",
};
const wbBrands = {
    "303": "Real",
    "305": "R-Tech",
    "307": "R-Home",
    "309": "R-Zoo",
    "311": "R-Sport",
    "313": "Olan",
    "349": "DD пластик",
    "371": "Bammer",
    "377": "Lampur",
    "379": "Karlom",
    "471": "Intivito",
    "485": "Кот и пес",
    "487": "RAULLI",
    "491": "s`mart&mart",
    "529": "Reniola",
    "537": "TILINO",
    "541": "TILINO HOME"
};
const ozBrands = {
    "389": "Real",
    "391": "R-Tech",
    "393": "R-Home",
    "395": "R-Zoo",
    "397": "R-Sport",
    "399": "R-Sport",
    "401": "DD пластик",
    "403": "Bammer",
    "405": "Lampur",
    "407": "Karlom",
    "473": "Intivito",
    "489": "RAULLI",
    "493": "s`mart&mart",
    "539": "TILINO",
    "543": "TILINO HOME"
};
const result = [{
    "id":              1,
    "name":            "Балансир фигурный Коты",
    "size":            null,
    "color":           "Красный",
    "article":         "12400217",
    "catalogs":        [{"id": 33349, "productId": 1,}],
    "characteristics": [{
        "id":         33345,
        "ozBarcode":  null,
        "ozBrand":    null,
        "ozSku":      null,
        "productId":  1,
        "rangeId":    33341,
        "supplierId": 219,
        "wbBarcode":  "2039868677855",
        "wbBrand":    "Bammer",
        "wbSku":      "225911209",
    }],
    "ranges":          [{
        "HS":               "9503006900",
        "addressProducer":  " HONGKONG, UNIT 2508A 25/F BANK OF AMERICA TOWER 12 HARCOURT",
        "cargoDeclaration": "10720010/191021/0084505",
        "composition":      "картон, дерево",
        "country":          "Китай",
        "id":               33341,
        "linkGoogleDrive":  "https://drive.google.com/drive/folders/19oKojWcI39-j5-PIYxf2EVkzl10OziefI?usp=sharing",
        "nameProducer":     "SOUTH CHINA SERVICE GROUP LIMITED",
        "owner":            "167",
        "package":          "фигуры деревянные",
        "productId":        1,
        "type":             "ТОП",
    }],
}];
const characteristicFields = {
    wbBrand:   'PROPERTY_729',
    wbBarcode: 'PROPERTY_609',
    wbSku:     'PROPERTY_611',
    ozBrand:   'PROPERTY_939',
    ozBarcode: 'PROPERTY_613',
    ozSku:     'PROPERTY_615',
    rangeId:   'PROPERTY_437',
    article:   'PROPERTY_687',
}

jest.mock("@/services/BitrixCRUD", () =>
    class BitrixCRUD {
        async getField(blockId: string, fieldId: string) {
            if (blockId === '37' && fieldId === 'PROPERTY_771')
                return Promise.resolve(types)
            if (blockId === '47' && fieldId === 'PROPERTY_729')
                return Promise.resolve(wbBrands)
            if (blockId === '47' && fieldId === 'PROPERTY_939')
                return Promise.resolve(ozBrands)
            if (blockId === '37' && fieldId === 'PROPERTY_919')
                return Promise.resolve({"361": "Китай", "363": "РФ", "365": "Корея"})
        }
    }
);

import CatalogService from "@/bitrix/data/catalog.service";
import RangeService from "@/bitrix/data/range.service";
import SupplierService from "@/bitrix/data/supplier.service";
import CharacteristicService from "@/bitrix/data/characteristic.service";
import mocked = jest.mocked;

jest.mock("@/services/catalog.service");
jest.mock("@/services/range.service");
jest.mock("@/services/supplier.service");
jest.mock("@/services/characteristic.service");

const MockedCatalogService = mocked(CatalogService);
const MockedRangeService = mocked(RangeService);
const MockedSupplierService = mocked(SupplierService);
const MockedCharacteristicService = mocked(CharacteristicService);

jest.useFakeTimers()

describe('test InitTransferData transfer', () => {
    const app = express();

    beforeAll(async () => {
        await Database.sequelize?.sync({force: true});
        MockedCatalogService.prototype.getCatalogs = jest.fn().mockResolvedValue([{ID: '33349', NAME: '12400217/Красный - Балансир фигурный Коты'}])
        MockedRangeService.prototype.getRangeObj = jest.fn().mockReturnValue({id: range.ID});
        MockedRangeService.prototype.getRanges = jest.fn().mockResolvedValue([range]);
        MockedSupplierService.prototype.getSuppliers = jest.fn().mockResolvedValue([supplier]);
        MockedCharacteristicService.prototype.getCharacteristics = jest.fn().mockResolvedValue([characteristic]);
        MockedCharacteristicService.prototype.fields = characteristicFields;
        new Router(app);
    })

    test('test route /bitrix/transfer transfer data', async () => {
        Credential.findOne = jest.fn().mockResolvedValue(true);
        await request(app).get('/bitrix/transfer')
            .send({user: null})
            .set({
                authorization: `Basic ${btoa('test')}`,
                referer:       'test'
            }).expect(200);
    })

    test('test route /bitrix/transfer checking saved data', async () => {
        const products = await request(app).get('/product');
        expect(products.status).toBe(200);
        // expect(products.body?.length).toBe(1);
        // expect(products.body).toEqual(result);
    })

    afterAll(() => {
        Database.sequelize?.close();
    })
})
