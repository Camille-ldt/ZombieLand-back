import { sequelize } from '../sequelize.js';
import { Model, DataTypes } from 'sequelize';

// Export Category class
export class Period extends Model {}

Period.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        update_at: {
            type: DataTypes.DATE,
            defaultValue:DataTypes.NOW,
                    },
},{
        sequelize, 
        tableName: "Period",
        timestramps: true,
    });