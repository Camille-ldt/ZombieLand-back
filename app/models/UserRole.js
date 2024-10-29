import { Model, DataTypes } from 'sequelize';
import client from '../sequelize.js';

// Export UserRole class
export default class UserRole extends Model {}

UserRole.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'user',
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
    sequelize: client,
    tableName: 'user_role',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'role_id']
        }
    ]
});

