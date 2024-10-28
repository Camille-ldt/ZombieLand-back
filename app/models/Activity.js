import { Sequelize, Model, DataTypes } from 'sequelize';
import {sequelize} from '../sequelize.js';


//Export activity class
export class Activity extends Model {}

//class init
Activity.init({
    title:{
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    category_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'category',
            key: 'id'
        }

    }
    

}, {
    sequelize,
    tableName: "activity",
    timestamps: true
});