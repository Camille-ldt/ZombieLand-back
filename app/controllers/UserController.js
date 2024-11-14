// File Path: controllers/UserController.js

import { body, validationResult } from 'express-validator';
import { hashPassword } from './AuthController.js';
import * as AuthController from './AuthController.js';
import User from '../models/User.js';
import { uploadImage, deleteImage } from '../services/uploadImage.js';
import cloudinary from 'cloudinary';

// Create a user (Créer un utilisateur)
export const createUser = [
    // Input data validation (Validation des données d'entrée)
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    body('firstname').notEmpty().withMessage('Le prénom est requis'),
    body('lastname').notEmpty().withMessage('Le nom de famille est requis'),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).end(); // (Bad request - Demande incorrecte)
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
                city,
                role_id
            } = req.body;

            // Check if email already exists (Vérifier si l'email existe déjà)
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).end(); // (Email already in use - Email déjà utilisé)
            }

            // Use hashPassword function from AuthController to secure the password (Utiliser la fonction hashPassword d'AuthController pour sécuriser le mot de passe)
            const hashedPassword = await hashPassword(password);

            // Create a new user (Créer un nouvel utilisateur)
            const user = await User.create({
                email,
                password: hashedPassword,
                firstname,
                lastname,
                birthday: birthday || null,
                phone_number: phone_number || 'non renseigné',
                street_address: street_address || 'non renseigné',
                postal_code: postal_code || '00000',
                city: city || 'non renseigné',
                role_id: role_id || 2,
            });

            return res.status(201).end(); // (User created - Utilisateur créé)
        } catch (error) {
            console.error("Error creating user:", error); // (Erreur dans la création)
            return res.status(500).end(); // (Server error - Erreur serveur)
        }
    }
];

// Get all users (Obtenir tous les utilisateurs)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        if (!users.length) {
            return res.status(404); // (No users found - Aucun utilisateur trouvé)
        }
        res.status(200).json(users); // (Users retrieved - Utilisateurs récupérés)
    } catch (error) {
        console.error('Error retrieving users:', error); // (Erreur serveur lors de la récupération des utilisateurs)
        res.status(500); // (Server error - Erreur serveur)
    }
};

// Get one user (Obtenir un utilisateur)
export const getOneUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);

        // Vérifier si userId est un nombre valide
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findByPk(userId, {
            // attributes: { exclude: ['password'] }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a user (Mettre à jour un utilisateur)
export const updateUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const { firstname, lastname, email, phone_number, birthday, street_address, postal_code, city, image } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404); // (User not found - Utilisateur non trouvé)
        }

        const updateData = { firstname, lastname, email, phone_number, birthday, street_address, postal_code, city };

        // (Si on a reçu une image depuis le front-end)
        if (image) {
            // (Si l'utilisateur a déjà une image)
            if (user.image) {
                // (La supprimer de Cloudinary)
                await deleteImage(user.image);
            }

            // (Uploader l'image sur Cloudinary)
            const imageUrl = await uploadImage(image, 'users');
            // (Mettre à jour l'URL de l'image dans les données)
            updateData.image = imageUrl;
        }

        await user.update(updateData);

        res.status(200); // (User updated - Utilisateur mis à jour)
    } catch (error) {
        console.error('Error updating user:', error); // (Erreur serveur lors de la mise à jour de l'utilisateur)
        res.status(500); // (Server error - Erreur serveur)
    }
};

// Update user password using AuthController (Mettre à jour le mot de passe de l'utilisateur en utilisant AuthController)
export const updatePassword = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const { password } = req.body;

        // Call AuthController to update password securely (Appel de AuthController pour la gestion mdp sécurisée)
        await AuthController.updatePassword(req, res);
    } catch (error) {
        console.error('Error updating password:', error); // (Erreur lors de la mise à jour du mot de passe)
        res.status(500); // (Server error - Erreur serveur)
    }
};

// Delete a user (Supprimer un utilisateur)
export const deleteUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404); // (User not found - Utilisateur non trouvé)
        }
        if (user.image) {
            const publicId = user.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`avatars/${publicId}`);
        }
        await user.destroy();
        res.status(204); // (User deleted - Utilisateur supprimé)
    } catch (error) {
        console.error('Error deleting user:', error); // (Erreur serveur lors de la suppression de l'utilisateur)
        res.status(500); // (Server error - Erreur serveur)
    }
};

// Get current user (Obtenir l'utilisateur connecté)
export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user.id; // `req.user` est défini par le middleware `authenticateJWT`

        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error retrieving current user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
