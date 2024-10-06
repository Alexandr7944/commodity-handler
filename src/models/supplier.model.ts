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
    name?: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        unique: true,
        field: "code",
    })
    code?: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: "type",
    })
    type?: string;
}

export default SupplierModel;
