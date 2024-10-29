import { Model, DataTypes } from 'sequelize';
import client from '../sequelize.js';

// Export Category class
export default class Period extends Model {}

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
        sequelize: client, 
        tableName: "period",
        timestramps: true,
    });