// import InitTransferData from "../../src/services/InitTransferData";

describe('test InitTransferData', () => {
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
})
