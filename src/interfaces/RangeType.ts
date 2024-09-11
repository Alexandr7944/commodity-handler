import {ProductType} from "./ProductType";

export type RangeType = {
    id: number,
    type?: string,  // 'ТОП' | 'Активный' | 'Расходники' | 'Выкупы' | 'Арихив'
    productId: number,
    owner?: string,
    linkGoogleDrive?: string,
    package?: string,
    composition?: string,
    HS?: string,
    country?: string,
    nameProducer?: string,
    addressProducer?: string,
    cargoDeclaration?: string,
    product?: ProductType,
}
