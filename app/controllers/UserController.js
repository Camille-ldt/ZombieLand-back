import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { uploadImage, deleteImage } from '../services/uploadImage.js';
import { body, validationResult } from 'express-validator';
import cloudinary from 'cloudinary';

// Créer un utilisateur/inscription
export const createUser = [
    // Validation des données d'entrée
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    body('firstname').notEmpty().withMessage('Le prénom est requis'),
    body('lastname').notEmpty().withMessage('Le nom de famille est requis'),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {
                email,
                password,
                firstname,
                lastname,
                birthday,
                phone_number,
                street_address,
                postal_code,
                city
            } = req.body;

            // Vérifier si l'email existe déjà
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
            }

            // Hacher le mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);

            // Créer un nouvel utilisateur
            const user = await User.create({
                email,
                password: hashedPassword,
                firstname,
                lastname,
                birthday,
                phone_number,
                street_address,
                postal_code,
                city
            });

            res.status(201).json({ message: 'Utilisateur enregistré avec succès', user });
        } catch (error) {
            console.error("Erreur dans la création :", error);
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }
];

// Obtenir tous les utilisateurs
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        if (!users.length) {
            return res.status(404).json({ message: 'Aucun utilisateur trouvé' });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error('Erreur serveur lors de la récupération des utilisateurs');
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des utilisateurs' });
    }
};

// Obtenir un utilisateur
export const getOneUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Erreur serveur lors de la récupération de l\'utilisateur', error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'utilisateur' });
    }
};

// Mettre à jour un utilisateur
export const updateUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const {
            firstname,
            lastname,
            email,
            password,
            phone_number,
            birthday,
            street_address,
            postal_code,
            city,
            image
        } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const updateData = {};

        if (firstname) {
            updateData.firstname = firstname;
        }
        if (lastname) {
            updateData.lastname = lastname;
        }
        if (email) {
            updateData.email = email;
        }
        if (phone_number) {
            updateData.phone_number = phone_number;
        }
        if (birthday) {
            updateData.birthday = birthday;
        }
        if (street_address) {
            updateData.street_address = street_address;
        }
        if (postal_code) {
            updateData.postal_code = postal_code;
        }
        if (city) {
            updateData.city = city;
        }

        // Si on a reçu une image depuis le front-end…
        if (image) {

            // Si l'utilisateur a déjà une image…
            if (user.image) {
                // …alors on la supprime de Cloudinary
                await deleteImage(user.image);
            }

            // …alors on l'upload sur Cloudinary (qui nous renvoie l'URL)
            const imageUrl = await uploadImage(image);
            // …et on renseigne l'URL de l'image dans les données à mettres à jour
            updateData.image = imageUrl;
        }

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        await user.update(updateData);

        res.status(200).json({
            message: 'Utilisateur mis à jour avec succès',
            user: {
                ...user.toJSON(),
                password: undefined
            }
        });
    } catch (error) {
        console.error('Erreur serveur lors de la mise à jour de l\'utilisateur', error);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de l\'utilisateur' });
    }
};

// Supprimer un utilisateur
export const deleteUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        if (user.image) {
            const publicId = user.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`avatars/${publicId}`);
        }
        await user.destroy();
        res.status(204).json({ message: `Utilisateur ID ${userId} supprimé` });
    } catch (error) {
        console.error('Erreur serveur lors de la suppression de l\'utilisateur', error);
        res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'utilisateur' });
    }
};
