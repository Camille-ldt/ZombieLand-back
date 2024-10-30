// Import necessary classes and types from Sequelize
import { Model, DataTypes } from 'sequelize';
// Import the Sequelize connection instance
import client from '../sequelize.js';

// Declare and export the User class that extends Sequelize's Model
export default class User extends Model {};

// Initialize the User model with its attributes and options
User.init({
    //Define the user id
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //Define the firstname of the user
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //the lastname of the user
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday:{
        type: DataTypes.DATE,
        allowNull: false  
    },
    //his phone number
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //his email
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    //his password
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //his image
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    //his role id
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'role',
            key: 'id'
        }
    }
}, {
    // Use the Sequelize connection instance
    sequelize: client,
    tableName: "user",
    timestamps: true,
    underscored: true  // Utilise des noms de colonnes en snake_case
});