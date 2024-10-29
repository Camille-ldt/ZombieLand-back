import { Model, DataTypes } from 'sequelize';
import client from '../sequelize.js';

// Export Reservation class
export default class Reservation extends Model {};

Reservation.init({
    number_reservation: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date_start: {
        type: DataTypes.DATE,
        allowNull: false
    },
    date_end: {
        type: DataTypes.DATE,
        allowNull: false
    },
    number_tickets: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'user',
            key: 'id'
        }
    }
}, {
    sequelize: client,
    tableName: "reservation",
    timestamps: true
});

