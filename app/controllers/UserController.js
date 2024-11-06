import User from '../models/User.js';
import { uploadImage } from '../services/uploadImage.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import cloudinary from 'cloudinary';

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

// Créer un utilisateur
export const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { firstname, lastname, email, password, filePath } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        let image = null;
        if (filePath) {
            image = await uploadImage(filePath, 'avatars');
        }

        const newUser = await User.create({ firstname, lastname, email, password: hashedPassword, image });
        res.status(201).json({ ...newUser.toJSON(), password: undefined });
    } catch (error) {
        console.error('Erreur serveur lors de la création de l\'utilisateur', error);
        res.status(500).json({ message: 'Erreur serveur lors de la création de l\'utilisateur' });
    }
};

// Mettre à jour un utilisateur
export const updateUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const { firstname, lastname, email, password, filePath } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        let image = user.image;
        if (filePath) {
            if (image) {
                const publicId = image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`avatars/${publicId}`);
            }
            image = await uploadImage(filePath, 'avatars');
        }

        const updateData = { firstname, lastname, email, image };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        await user.update(updateData);
        res.status(200).json({ ...user.toJSON(), password: undefined });
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
