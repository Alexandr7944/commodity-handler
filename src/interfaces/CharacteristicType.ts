import {ProductType} from "./ProductType";
import {SupplierType} from "./SupplierType";
import {RangeType} from "./RangeType";

export type CharacteristicType = {
    id: number,

    wbBrand?: string,
    wbBarcode?: string,
    wbSku?: string,

    ozBrand?: string,
    ozBarcode?: string,
    ozSku?: string,

    rangeId: number,
    productId: number,
    supplierId: number,
    range?: RangeType,
    supplier?: SupplierType,
    product?: ProductType,

    article: string,
}
