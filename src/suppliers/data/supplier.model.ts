import {Model, Table, Column, DataType} from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: "suppliers",
})

class SupplierModel extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: "id"
    })
    declare id?: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        unique: true,
        field: "name",
    })
    declare name?: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        unique: true,
        field: "code",
    })
    declare code?: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "type",
    })
    declare type?: string;
}

export default SupplierModel;
