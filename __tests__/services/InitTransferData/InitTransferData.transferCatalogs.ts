import ProductRepositories from "@/repositories/product.repositories";
import InitTransferData from "@/services/InitTransferData";
import {CatalogRepositories} from "@/repositories";

jest.mock("@/services/catalog.service", () =>
    class CatalogService {
        async getCatalogs() {
            return Promise.resolve([
                {ID: 1, NAME: '123456/color/size - name'},
            ])
        }
    }
);
jest.useFakeTimers()

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
