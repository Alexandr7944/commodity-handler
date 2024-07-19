import {Model, Table, Column, DataType, BelongsTo} from "sequelize-typescript";
import {NonAttribute} from "@sequelize/core";
import Product from "./product.model";
import Supplier from "./supplier.model";
import Range from "./range.model";

@Table({
    timestamps: false,
    tableName: "characteristic",
})

class Characteristic extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: "id",
    })
    id?: number;

    @Column({
        type: DataType.STRING(255),
        field: "wbBrand",
    })
    wbBrand?: string;

    @Column({
        type: DataType.STRING(255),
        field: "wbBarcode",
    })
    wbBarcode?: string;

    @Column({
        type: DataType.INTEGER,
        field: "wbSku",
    })
    wbSku?: number;

    @Column({
        type: DataType.STRING(255),
        field: "ozBrand",
    })
    ozBrand?: string;

    @Column({
        type: DataType.STRING(255),
        field: "ozBarcode",
    })
    ozBarcode?: string;

    @Column({
        type: DataType.INTEGER,
        field: "ozSku",
    })
    ozSku?: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "productId",
    })
    productId?: number;

    @BelongsTo(() => Product, 'productId')
    declare product?: NonAttribute<Product>;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "supplierId",
    })
    supplierId?: number;

    @BelongsTo(() => Supplier, 'supplierId')
    declare supplier?: NonAttribute<Supplier>;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "rangeId",
    })
    rangeId?: number;

    @BelongsTo(() => Range, 'rangeId')
    declare range?: NonAttribute<Range>;
}

export default Characteristic;
