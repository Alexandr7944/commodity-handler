import {Model, Table, Column, DataType, BelongsTo} from "sequelize-typescript";
import {NonAttribute} from "@sequelize/core";
import {Product} from "@/db/Database";

@Table({
    timestamps: false,
    tableName:  "catalog",
})

class Catalog extends Model {

    @Column({
        type:       DataType.INTEGER,
        allowNull:  false,
        primaryKey: true,
        field:      "id",
    })
    declare id?: number;

    @Column({
        type:      DataType.INTEGER,
        allowNull: false,
        field:     "productId",
    })
    declare productId?: number;

    @BelongsTo(() => Product, 'productId')
    declare product?: NonAttribute<Product>;
}

export default Catalog;
