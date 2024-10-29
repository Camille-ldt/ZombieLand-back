import { Model, DataTypes } from 'sequelize';
import client from '../sequelize.js';

// Export Avis class
export default class Avis extends Model {}

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
            model: 'user',
            key: 'id'
        }
    }
},{
    sequelize: client,
    tableName: 'avis',
    timestamps: true
});

