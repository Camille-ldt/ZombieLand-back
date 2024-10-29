import { Sequelize, Model, DataTypes } from 'sequelize';
import {sequelize} from '../sequelize.js';

export const ActivityAvis = sequelize.define('ActivityAvis', {
    activity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'activity',
            key: 'id'
        },
        onDelete:'CASCADE'
    },
    avis_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'avis',
            key: 'id'
        },
        onDelete:'CASCADE'
    }
}, {
    sequelize,
    tableName: 'activity_avis',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['activity_id', 'avis_id']
        }
    ]
});