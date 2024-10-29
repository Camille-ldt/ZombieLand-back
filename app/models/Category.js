import client from '../sequelize.js';
import { Model, DataTypes } from 'sequelize';

// Export Category class
export default class Category extends Model {}

Category.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
    },
    updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
                },
},{
        sequelize: client, 
        tableName: "category",
        timestramps: true,
    });
