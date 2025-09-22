import {Column, Model, Table, DataType} from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: "credentials",
})

class Credential extends Model {

    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true,
        field: "token",
    })
    declare token?: string;

    @Column({
        type: DataType.STRING,
        field: "role",
        validate: {
            isIn: [["admin", "user"]],
        }
    })
    declare role?: string;
}

export default Credential
