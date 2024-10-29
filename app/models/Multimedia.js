import { Sequelize, Model, DataTypes } from 'sequelize';
import {sequelize} from '../sequelize.js';

export class Multimedia extends Model {}

Multimedia.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at' 
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'updated_at'  
    }
  }, {
    sequelize,
    modelName: 'Multimedia',
    tableName: 'Multimedia',
    timestamps: true 
  });