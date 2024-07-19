import {ProductType} from "./ProductType";

export type CatalogType = {
    id: number,
    productId: number,
    product?: ProductType
}
