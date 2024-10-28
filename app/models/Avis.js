import { Sequelize, Model, DataTypes } from 'sequelize';
import {sequelize} from '../sequelize.js';


export class Avis extends Model {}

Avis.init({
    note:{
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5
        },
        allowNull: false 
    },
    comment:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'users',
            key: 'id'
        }
    }
},{
    sequelize,
    tableName: 'avis',
    timestamps: true
});