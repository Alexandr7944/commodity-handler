import {Model, Table, Column, DataType, HasMany} from "sequelize-typescript";
import Catalog from "./catalog.model";
import Range from "./range.model";
import {NonAttribute} from "@sequelize/core";
import Characteristic from "./characteristic.model";

@Table({
    timestamps: false,
    tableName: "products",
})

class Product extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
    })
    id?: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "article",
    })
    article?: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "name",
    })
    name?: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "color",
    })
    color?: string;

    @Column({
        type: DataType.STRING(255),
        field: "size",
    })
    size?: string;

    @HasMany(() => Catalog, 'productId')
    declare catalogs?: NonAttribute<Catalog[]>;

    @HasMany(() => Range, 'productId')
    declare ranges?: NonAttribute<Range[]>;

    @HasMany(() => Characteristic, 'productId')
    declare characteristics?: NonAttribute<Characteristic[]>;
}

export default Product;
