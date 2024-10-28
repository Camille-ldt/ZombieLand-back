import { Model, Datatypes } from "sequelize";
import { sequelize } from "./sequelize.js";

// Export Role class
export class Role extends Model {};


Role.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    create_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },

    updated_at: {
        type: DataType.DATE,
        defaultValue: DataTypes.NOW,
    }
});