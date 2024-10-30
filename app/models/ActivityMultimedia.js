// Import necessary classes and types from Sequelize
import { Model, DataTypes } from 'sequelize';
// Import the Sequelize connection instance
import client from '../sequelize.js';

// Declare and export the ActivityMultimedia class that extends Sequelize's Model
export default class ActivityMultimedia extends Model {}

// Initialize the ActivityMultimedia model with its attributes and options
ActivityMultimedia.init({
  //Define the id of the activity concerned by the multimedia
  activity_id: {
    type: DataTypes.INTEGER,
    allowNull: false, //cannot be null
    primaryKey: true, //is a primary key
    references: {
      model: 'activity',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  //Define the id of the multimedia we want to link to the activity
  multimedia_id: {
    type: DataTypes.INTEGER,
    allowNull: false, //cannot be null
    primaryKey: true, //is a primary key
    references: {
      model: 'multimedia',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  // Use the Sequelize connection instance
  sequelize: client,
  tableName: 'activity_multimedia',  
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['activity_id', 'multimedia_id']
    }
  ]
});