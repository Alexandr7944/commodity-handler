import {Request, Response} from 'express';
import {CharacteristicType, ProductType, RangeBitrixType, RangeType} from "@/interfaces";
import {Supplier, Catalog, Range, Characteristic} from "@/db/Database";
import BitrixCRUD from "./BitrixCRUD";
import assert from "node:assert";
import CatalogRepositories from "@/catalogs/data/catalog.repositories";
import RangeRepositories from "@/ranges/data/range.repositories";
import SupplierRepositories from "@/suppliers/data/supplier.repositories";
import CharacteristicRepositories from "@/characteristics/data/characteristic.repositories";
import ProductRepositories from "@/products/data/product.repositories";
import {CatalogTransferDataSchema} from "@/catalogs/schema/CatalogTransferData.schema";
import CatalogService from "@/catalogs/domain/catalog.service";
import RangeService from "@/ranges/domain/range.service";
import SupplierService from "@/suppliers/domain/supplier.service";
import CharacteristicService from "@/characteristics/domain/characteristic.service";

type CharacteristicBitrixType = {
    ID: string,
    NAME: string,
    PROPERTY_437: string,
    PROPERTY_687: string,
    PROPERTY_443: string,
    PROPERTY_729: string,
    PROPERTY_609: string,
    PROPERTY_611: string,
    PROPERTY_939: string,
    PROPERTY_613: string,
    PROPERTY_615: string,
}

type ParamsName = Omit<ProductType, 'id'> & { code?: string };

class InitTransferData {
    private bitrix: BitrixCRUD;
    cache: Map<string, number>;

    constructor() {
        this.bitrix = new BitrixCRUD();
        this.cache = new Map();
        this.transfer = this.transfer.bind(this);
        this.transferCatalog = this.transferCatalog.bind(this);
        this.transferRanges = this.transferRanges.bind(this);
    }

    async transfer(req: Request, res: Response) {
        try {
            await this.resetTables();
            await this.initCache();
            await this.transferCatalog();
            await this.transferRanges();
            await this.transferSuppliers();
            await this.transferCharacteristics();
            res.status(200).send({message: 'success'});
        } catch (e: Error | any) {
            console.log(e)
            res.status(500).send({message: e?.message});
        }
    }

    async resetTables() {
        await Promise.all([
            Range.truncate({cascade: true}),
            Characteristic.truncate({cascade: true}),
            Supplier.truncate({cascade: true}),
            Catalog.truncate({cascade: true}),
        ])
    }

    async transferCatalog() {
        const catalogs = await new CatalogService().getCatalogs({select: ['ID', 'NAME']});
        const validateCatalogs = CatalogTransferDataSchema.parse(catalogs);
        for await (const {id, name} of validateCatalogs) {
            const product = this.convertName(name);
            if (product) {
                try {
                    const idProduct = await this.getProductId(product);
                    await CatalogRepositories.create({id, productId: idProduct});
                } catch (e: Error | any) {
                    console.log('transferCatalog', {id, ...product, error: e?.message});
                }
            }
        }
    }

    async transferRanges() {
        const rangeService = new RangeService();
        const ranges: RangeBitrixType[] = await rangeService.getRanges();
        const types = await this.bitrix.getField('37', 'PROPERTY_771');
        const countries = await this.bitrix.getField('37', 'PROPERTY_919');
        assert.ok(ranges && types && countries, 'Ranges or types or countries is empty');

        for await (const range of ranges) {
            const product = this.convertName(range.NAME);
            let rangeBody: RangeType = {} as RangeType;
            if (product) {
                try {
                    const idProduct = await this.getProductId(product);
                    rangeBody = {
                        ...rangeService.getRangeObj(range),
                        type:      this.getField(range['PROPERTY_771'] || {}, types),
                        country:   this.getField(range['PROPERTY_919'] || {}, countries),
                        productId: idProduct,
                    };
                    await RangeRepositories.create(rangeBody);
                } catch (e: Error | any) {
                    console.log('transferRanges', {...rangeBody, error: e?.message});
                }
            }
        }
    }

    async transferSuppliers() {
        let suppliers = await new SupplierService().getSuppliers();
        for await (const supplier of suppliers) {
            const {ID, TITLE, UF_CRM_1651668052, COMPANY_TYPE} = supplier;
            try {
                await SupplierRepositories.create({
                    id:   Number(ID),
                    name: TITLE,
                    code: UF_CRM_1651668052,
                    type: COMPANY_TYPE
                });
            } catch (e: Error | any) {
                console.log('transferSuppliers', {ID, TITLE, UF_CRM_1651668052, error: e?.message});
            }
        }
    }

    async transferCharacteristics() {
        const service = new CharacteristicService();
        const characteristics = await service.getCharacteristics();
        const suppliers = await SupplierRepositories.findAll();
        const wbBrands = await this.bitrix.getField('47', 'PROPERTY_729');
        const ozBrands = await this.bitrix.getField('47', 'PROPERTY_939');

        for await (const item of characteristics) {
            const product = this.convertName(item.NAME);
            if (!product) continue;

            let result: CharacteristicType = {} as CharacteristicType;
            Object.entries(service.fields).forEach(([key, property]) => {
                const value = Object.values(item[property as keyof CharacteristicBitrixType] || {})?.[0];
                if (value)
                    result = {...result, [key]: value};
            })
            let code = null;
            if (result.article)
                code = /^[A-Z]{2}[0-9]{6}/.test(result.article) && result.article.slice(0, 2);

            if (!result.rangeId || !code)
                continue;

            const codeSupplier = this.getSupplier(code, suppliers);
            if (!codeSupplier)
                continue;

            result.id = Number(item.ID);
            result.supplierId = codeSupplier;
            result.productId = await this.getProductId(product);
            result.wbBrand = this.getField(item['PROPERTY_729'], wbBrands);
            result.ozBrand = this.getField(item['PROPERTY_939'], ozBrands);
            await CharacteristicRepositories
                .create(result)
                .catch((e: Error | any) => console.log('transferCharacteristics', {result, error: e?.message}));
        }
    }

    async getProductId(product: Omit<ProductType, 'id'>): Promise<number> {
        const key = [product.name, product.article, product.color, product.size].join('/');
        const productId = this.cache.get(key);
        if (productId)
            return productId;

        const saveProduct = await ProductRepositories.create(product);
        assert.ok(saveProduct?.id, 'Product not found');
        this.cache.set(key, saveProduct.id);
        return saveProduct.id;
    }

    getField(fieldsObj: Record<string, string>, fieldList: Record<string, string>) {
        const field = Object.values(fieldsObj || {})?.[0];
        if (field)
            return fieldList[field];
    }

    getSupplier(code: string, suppliers: Supplier[]): number | undefined {
        const supplierId = suppliers.find(({dataValues: item}) => item.code === code)?.id;
        if (supplierId)
            return +supplierId;
    }

    async initCache() {
        const products = await ProductRepositories.findAll({});
        products.forEach((product) => {
            const {id, article, color, size, name} = product;
            const key = [name, article, color, size].join('/');
            id && this.cache.set(key, id)
        })
    }

    convertName(field: string): ParamsName | undefined {
        if (!field) return;

        const [params, name] = field.split(' - ');
        let [article, color, size] = params.split('/');
        if (!name) return;
        if (/^[A-Z]{2}[0-9]{6,}$/.test(article))
            article = article.slice(2);

        if (!isNaN(Number(article)) && color) {
            return {
                article: article?.trim(),
                name:    name?.trim(),
                color:   color?.trim(),
                size:    size?.trim() || null
            }
        }
    }
}

export default InitTransferData;
