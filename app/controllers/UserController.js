import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Role from '../models/Role.js';
import { uploadImage } from '../services/uploadImage.js';
import cloudinary from 'cloudinary';

// Get all users (Obtenir tous les utilisateurs)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        if (!users.length) {
            return res.status(404).json({ message: 'Aucun utilisateur trouvé' });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error('Server error while fetching users (Erreur serveur lors de la récupération des utilisateurs)');
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des utilisateurs' });
    }
};

// Get a user by ID (Obtenir un utilisateur par ID)
export const getOneUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Server error while fetching user (Erreur serveur lors de la récupération de l\'utilisateur)', error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'utilisateur' });
    }
};

// Create a new user (Créer un nouvel utilisateur)
export const createUser = async (req, res) => {
    try {
        const { firstname, lastname, phone_number, email, password, birthday, role_id, filePath } = req.body;

        // Hash the user's password before saving (Hacher le mot de passe de l'utilisateur avant de l'enregistrer)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Upload the image to Cloudinary and get the URL (Télécharger l'image sur Cloudinary et obtenir l'URL)
        const image = filePath ? await uploadImage(filePath, 'avatars') : null;

        // Create the user (Créer l'utilisateur)
        const user = await User.create({
            firstname,
            lastname,
            phone_number,
            email,
            password: hashedPassword,
            birthday,
            role_id,
            image
        });

        res.status(201).json({ message: 'Utilisateur créé avec succès', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user (Mettre à jour un utilisateur)
export const updateUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const { firstname, lastname, phone_number, email, password, birthday, role_id, filePath } = req.body;

        // Find the existing user (Trouver l'utilisateur existant)
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Hash the new password if provided (Hacher le nouveau mot de passe si fourni)
        let updatedPassword = user.password;
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }

        // If a new file is provided, upload and update the URL (Si un nouveau fichier est fourni, téléchargez-le et mettez à jour l'URL)
        let image = user.image;
        if (filePath) {
            // Delete the old image from Cloudinary if it exists (Supprimer l'ancienne image de Cloudinary si elle existe)
            if (image) {
                const publicId = image.split('/').pop().split('.')[0];
                await cloudinary.v2.uploader.destroy(`avatars/${publicId}`);
            }
            // Upload the new image (Télécharger la nouvelle image)
            image = await uploadImage(filePath, 'avatars');
        }

        // Update user data (Mettre à jour les données de l'utilisateur)
        await user.update({
            firstname,
            lastname,
            phone_number,
            email,
            password: updatedPassword,
            birthday,
            role_id,
            image
        });

        res.status(200).json(user);
    } catch (error) {
        console.error('Server error while updating user (Erreur serveur lors de la mise à jour de l\'utilisateur):', error);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de l\'utilisateur' });
    }
};

// Delete a user (Supprimer un utilisateur)
export const deleteUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        // Delete the image from Cloudinary if it exists (Supprimer l'image de Cloudinary si elle existe)
        if (user.image) {
            const publicId = user.image.split('/').pop().split('.')[0];
            await cloudinary.v2.uploader.destroy(`avatars/${publicId}`);
        }
        await user.destroy();
        res.status(204).json({ message: `Utilisateur avec l'ID ${userId} supprimé avec succès` });
    } catch (error) {
        console.error('Server error while deleting user (Erreur serveur lors de la suppression de l\'utilisateur)');
        res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'utilisateur' });
    }
};

// Authenticate user and return a JWT token (Authentifier l'utilisateur et renvoyer un token JWT)
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email (Trouver l'utilisateur par email)
        const user = await User.findOne({ where: { email }, include: 'role' });
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        // Check if password matches (Vérifier si le mot de passe correspond)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Identifiants invalides' });
        }

        // Create a JWT token (Créer un token JWT)
        const token = jwt.sign({ id: user.id, role: user.role.name }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Connexion réussie', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Assign role to a user (Attribuer un rôle à un utilisateur)
export const assignRole = async (req, res) => {
    try {
        const { userId, roleId } = req.body;

        // Find the user (Trouver l'utilisateur)
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        // Assign role (Attribuer le rôle)
        user.role_id = roleId;
        await user.save();

        res.status(200).json({ message: 'Rôle attribué avec succès', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    assignRole
};