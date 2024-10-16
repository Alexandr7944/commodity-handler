import {Model, Table, Column, DataType, BelongsTo} from "sequelize-typescript";
import {NonAttribute} from "@sequelize/core";
import Product from "./product.model";

@Table({
    timestamps: false,
    tableName: "range",
})

class Range extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: "id",
    })
    declare id?: number;

    @Column({
        type: DataType.STRING(255),
        field: "type",
    })
    declare type?: string;

    @Column({
        type: DataType.STRING(255),
        field: "owner",
    })
    declare owner?: string;

    @Column({
        type: DataType.STRING(255),
        field: "linkGoogleDrive",
    })
    declare linkGoogleDrive?: string;

    @Column({
        type: DataType.STRING(255),
        field: "package",
    })
    declare package?: string;

    @Column({
        type: DataType.STRING(255),
        field: "composition",
    })
    declare composition?: string;

    @Column({
        type: DataType.STRING(255),
        field: "HS",
    })
    declare HS?: string;

    @Column({
        type: DataType.STRING(255),
        field: "country",
    })
    declare country?: string;

    @Column({
        type: DataType.STRING(255),
        field: "nameProducer",
    })
    declare nameProducer?: string;

    @Column({
        type: DataType.STRING(255),
        field: "addressProducer",
    })
    declare addressProducer?: string;

    @Column({
        type: DataType.STRING(255),
        field: "cargoDeclaration",
    })
    declare cargoDeclaration?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "productId",
    })
    declare productId?: number;

    @BelongsTo(() => Product, 'productId')
    declare product?: NonAttribute<Product>;
}

export default Range;

// Владелец - выбрать  ???                  owner            PROPERTY_927
// Ссылка на папку на гуглдиске             linkGoogleDrive  PROPERTY_713
// Комплектация                             package          PROPERTY_505
// Состав                                   composition      PROPERTY_509
// ТНВЭД                                    HS               PROPERTY_471
// Страна производства - выпадающий список  country          PROPERTY_919
// Наименование производителя               nameProducer     PROPERTY_721
// Адрес производителя                      addressProducer  PROPERTY_723
// ГТД                                      cargoDeclaration PROPERTY_725
