import { Model, DataTypes } from 'sequelize';
import client from '../sequelize.js';

// Export User class
export default class User extends Model {};

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
    reservation_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'reservation',
            key: 'id'
        }
    }
}, {
    sequelize: client,
    tableName: "user",
    timestamps: true
});