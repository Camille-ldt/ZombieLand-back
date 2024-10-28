import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize.js";

// Export Payment class
export class Payment extends Model {}

Payment.init({
	amount: {
		type: DataTypes.DECIMAL(10, 2),
        allowNull: false
	},

	status: {
		type: DataTypes.TEXT,
	},

    date_amount: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },

    reservation_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Reservations',
        },
    },

    stripe_payment_id: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    }
});
