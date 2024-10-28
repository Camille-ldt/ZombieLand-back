import { sequelize } from '../sequelize.js';
import { Model, DataTypes } from 'sequelize';

// Export Category class
export class Category extends Model {}

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
        sequelize, 
        tableName: "Category",
        timestramps: true,
    });
