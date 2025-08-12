import {ProductType} from "./ProductType";
import {SupplierType} from "./SupplierType";
import {RangeType} from "./RangeType";
import z from "zod";

export const CharacteristicTypeSchema = z.object({
    id: z.number(),

    wbBrand: z.string().optional(),
    wbBarcode: z.string().optional(),
    wbSku: z.string().optional(),

    ozBrand: z.string().optional(),
    ozBarcode: z.string().optional(),
    ozSku: z.string().optional(),

    rangeId: z.number(),
    productId: z.number(),
    supplierId: z.number(),

    article: z.string().optional(),
})

export type CharacteristicTypeInput = z.input<typeof CharacteristicTypeSchema>;

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
