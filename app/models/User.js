import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize.js";


export class User extends Model {};

User.init({
    firstname: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    lastname: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    sequelize,
    tableName: "User",
    timestamps: true
});