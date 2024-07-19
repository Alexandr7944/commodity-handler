import {ProductType} from "./ProductType";

export type RangeType = {
    id: number,
    type?: string,  // 'ТОП' | 'Активный' | 'Расходники' | 'Выкупы' | 'Арихив'
    productId: number,
    product?: ProductType
}
