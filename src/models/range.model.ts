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
    id?: number;

    @Column({
        type: DataType.STRING(255),
        field: "type",
    })
    type?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "productId",
    })
    productId?: number;

    @BelongsTo(() => Product, 'productId')
    declare product?: NonAttribute<Product>;
}

export default Range;
