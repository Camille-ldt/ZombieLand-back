import { Model, DataTypes } from 'sequelize';
import client from '../sequelize.js';

// Export Role class
export default class Role extends Model {};

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
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    sequelize: client,
    tableName: "role",
    timestamps: true
});

