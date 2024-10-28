import { Sequelize, Model, DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

export const UserRole = sequelize.define('UserRole', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'role',
            key: 'id'
        }
    }
}, {
    sequelize,
    tableName: 'user_role',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'role_id']
        }
    ]
});