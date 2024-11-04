import User from '../models/User.js';
import { uploadImage } from '../services/uploadImage.js';

//Get all users (obtenir tous les utilisateurs)

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        if (!users.length) {
            return res.status(404).json({message: 'Aucun utilisateur trouvé'});
        }
        res.status (200).json(users);
    } catch (error) {
        console.error('Server error while fetching users');
        res.status(500).json({message: 'Server error while fetching users'});
    }  
};

//Get a user (obtenir un utilisateur)
export const getOneUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const user = await User.findByPk(userId);
        if (!user){
            return res.status(404).json({message: 'Utilisateur non trouvé'});
        };
        res.status(200).json(user);
    }  catch (error) {
            console.error('Server error while fetching user', error);
            res.status(500).json({message: 'Server error while fetching user'});
        }
    };

// Get a new user (créer un utilisateur)
export const createUser = async (req, res) => {
    try { 
        const { firstname, lastname, email, password, filePath } = req.body;

        // Upload the image to Cloudinary and get the URL
        const image = filePath ? await uploadImage(filePath, 'avatars') : null;

        // Create a new user with the image URL
        const newUser = await User.create({ firstname, lastname, email, password, image });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Server error while creating user:', error);
        res.status(500).json({ message: 'Server error while creating user' });
    }
};

// Update a user (mettre à jour un utilisateur)
export const updateUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const { firstname, lastname, email, password, filePath } = req.body;

        // Récupérer l'utilisateur existant
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Si un nouveau fichier est fourni, télécharge et mets à jour l'URL
        let image = user.image;
        if (filePath) {
            // Supprimer l'ancienne image de Cloudinary si elle existe
            if (image) {
                const publicId = image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`avatars/${publicId}`);
            }

            // Télécharger la nouvelle image
            image = await uploadImage(filePath, 'avatars');
        }

        // Mise à jour des données de l'utilisateur
        await user.update({ firstname, lastname, email, password, image });

        res.status(200).json(user);
    } catch (error) {
        console.error('Server error while updating user:', error);
        res.status(500).json({ message: 'Server error while updating user' });
    }
};

// Delete a user (supprimer un utilisateur)
export const deleteUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const user = await User.findByPk(userId);
        if (!user){
            return res.status(404).json({message: 'User not found'});
        };
        // Supprimer l'image de Cloudinary si elle existe
        if (user.image) {
            const publicId = user.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`avatars/${publicId}`);
        }
        await user.destroy(user);
        res.status(204).json({ message: `User with ID ${userId} successfully deleted` }); 
    } catch (error) {
        console.error('Server error while deleting user');
        res.status(500).json({message: 'Server error while deleting user'});
    }
};
