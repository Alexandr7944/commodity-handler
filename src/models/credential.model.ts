import {Column, Model, Table, DataType} from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: "credentials",
})

class Credential extends Model {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        field: "token",
    })
    token?: string;

    @Column({
        type: DataType.STRING,
        field: "role",
        validate: {
            isIn: [["admin", "user"]],
        }
    })
    role?: string;
}

export default Credential
