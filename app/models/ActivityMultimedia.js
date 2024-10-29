import { Model, DataTypes } from 'sequelize';
import client from '../sequelize.js';

// Export ActivityMultimedia class
export default class ActivityMultimedia extends Model {}

ActivityMultimedia.init({
  activity_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'activity',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  multimedia_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'multimedia',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  sequelize: client,
  tableName: 'activity_Multimedia',
  timestamps: false
});

