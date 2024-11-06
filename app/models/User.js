import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import client from '../sequelize.js';

export default class User extends Model {}

// Initialisation du modèle User avec hachage automatique
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false  
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'role',
            key: 'id'
        }
    }
}, {
    sequelize: client,
    tableName: "user",
    timestamps: true,
    underscored: true
});

// Middleware Sequelize pour hacher le mot de passe avant l'enregistrement
User.beforeCreate(async (user) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});
User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        console.log("Mot de passe avant hachage:", user.password);
        user.password = await bcrypt.hash(user.password, 10);
        console.log("Mot de passe après hachage:", user.password);
    }
});
