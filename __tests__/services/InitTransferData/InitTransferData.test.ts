import InitTransferData from "@/services/InitTransferData";
import ProductRepositories from "@/repositories/product.repositories";
import {CatalogRepositories} from "@/repositories";

jest.mock("@/services/catalog.service", () =>
    class CatalogService {
        async getCatalogs() {
            return Promise.resolve([{ID: 1, NAME: '123456/color/size - name'}])
        }
    }
);
jest.useFakeTimers()

describe('test InitTransferData', () => {
    const product = {
        article: '123456',
        color: 'color',
        size: 'size',
        name: 'name'
    }

    describe('test InitTransferData getProductId', () => {
        test('test getProductId cache', async () => {
            ProductRepositories.findAll = jest.fn().mockResolvedValue([{id: 1, ...product}]);
            const transferData = new InitTransferData();
            await transferData.initCache();
            const productId = await transferData.getProductId(product);
            expect(productId).toBe(1);
        })

        test('test getProductId create product', async () => {
            ProductRepositories.create = jest.fn().mockResolvedValue({id: 100, ...product})
            const productId = await new InitTransferData().getProductId(product);
            expect(productId).toBe(100);
        })

        test('test getProductId negative', async () => {
            ProductRepositories.create = jest.fn().mockResolvedValue(null)
            await new InitTransferData().getProductId(product).catch(e =>
                expect(e.message).toBe('Product not found'));
        })
    })

    describe('test InitTransferData convertName', () => {
        test('test convertName positive', () => {
            const field = new InitTransferData().convertName('123456/color/size - name');
            expect(field).toEqual(product);
        })

        test('test convertName with negative article', () => {
            const field = new InitTransferData().convertName('article/color/size - name');
            expect(field).toBeUndefined();
        })

        test('test convertName with without name', () => {
            const field = new InitTransferData().convertName('article/color/size');
            expect(field).toBeUndefined();
        })
    })

    describe('test InitTransferData transferCatalog', () => {
        beforeEach(() => {
            jest.clearAllMocks()
        })

        const product = {
            article: '123456',
            color: 'color',
            size: 'size',
            name: 'name'
        }

        test('test transferCatalog product is db', async () => {
            ProductRepositories.create = jest.fn().mockResolvedValue({id: 1, ...product});
            CatalogRepositories.create = jest.fn().mockResolvedValue(1);
            const transferData = new InitTransferData();
            await transferData.transferCatalog();
            expect(ProductRepositories.create).toHaveBeenCalledTimes(1);
            expect(CatalogRepositories.create).toHaveBeenCalledTimes(1);
        })

        test('test transferCatalog productID is cached', async () => {
            ProductRepositories.findAll = jest.fn().mockResolvedValue([{id: 1, ...product}]);
            CatalogRepositories.create = jest.fn().mockResolvedValue(1);
            const transferData = new InitTransferData();
            await transferData.initCache();
            await transferData.transferCatalog();
            expect(ProductRepositories.create).toHaveBeenCalledTimes(0);
            expect(CatalogRepositories.create).toHaveBeenCalledTimes(1);
        })
    })

    describe('test InitTransferData initCache', () => {
        const key = ['name', '123456', 'color', 'size'].join('/');

        test('test initCache positive', async () => {
            ProductRepositories.findAll = jest.fn().mockResolvedValue([{id: 1, ...product}])
            const transferData = new InitTransferData();
            await transferData.initCache();
            expect(transferData.cache.get(key)).toBe(1);
        })

        test('test initCache negative', async () => {
            ProductRepositories.findAll = jest.fn().mockResolvedValue([product])
            const transferData = new InitTransferData();
            await transferData.initCache();
            expect(transferData.cache.get(key)).toBeUndefined();
        })
    })
})
