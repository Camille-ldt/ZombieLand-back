import { Sequelize, Model, DataTypes } from 'sequelize';
import {sequelize} from '../sequelize.js';

class ActivityMultimedia extends Model {}

ActivityMultimedia.init({
  activity_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Activity',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  multimedia_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Multimedia',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  sequelize,
  modelName: 'ActivityMultimedia',
  tableName: 'Activity_Multimedia',
  timestamps: false
});

module.exports = ActivityMultimedia;