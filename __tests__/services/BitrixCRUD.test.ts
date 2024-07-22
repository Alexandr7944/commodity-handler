import BitrixCRUD from "../../src/services/BitrixCRUD";

describe('test BitrixCRUD', () => {
    let bitrixCRUD: BitrixCRUD = new BitrixCRUD();
    test('test urlConverter', () => {
        const url = bitrixCRUD.urlConverter('lists.field.get.json', {
            IBLOCK_TYPE_ID: 'bitrix_processes',
            IBLOCK_ID: '47',
            FIELD_ID: '459'
        })
        expect(url).toBe(`${bitrixCRUD.bitrixUrl.href}lists.field.get.json?IBLOCK_TYPE_ID=bitrix_processes&IBLOCK_ID=47&FIELD_ID=459`)
    });

    test('test array urlConverter', () => {
        const url = bitrixCRUD.urlConverter('crm.product.list.json', {
            IBLOCK_TYPE_ID: 'bitrix_processes',
            SELECT: ['ID', 'NAME'],
        })
        expect(url).toBe(`${bitrixCRUD.bitrixUrl.href}crm.product.list.json?IBLOCK_TYPE_ID=bitrix_processes&SELECT%5B0%5D=ID&SELECT%5B1%5D=NAME`)
    });

    test('test getProductName', () => {
        const name = bitrixCRUD.getProductName({
            id: 'id',
            name: 'name',
            article: 'article',
            color: 'color',
            size: 'size'
        });
        expect(name).toBe('article/color/size - name');
    })
})
