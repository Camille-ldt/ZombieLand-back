import { Model, DataTypes } from 'sequelize';
import client from '../sequelize.js';

// Export ActivityAvis class
export default class ActivityAvis extends Model {}

ActivityAvis.init({
  activity_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'activity',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  avis_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'avis',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  sequelize: client,
  tableName: 'activity_avis',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['activity_id', 'avis_id']
    }
  ]
});
