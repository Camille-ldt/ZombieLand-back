// Import des modèles nécessaires, par exemple :
import User from '../models/User.js';

// Contrôleur pour obtenir tous les utilisateurs
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        console.log('All users fetched successfully');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ error: error.message });
    }
};

// Contrôleur pour obtenir un utilisateur spécifique par ID
export const getOneUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            console.log(`User with ID ${req.params.id} fetched successfully`);
            res.status(200).json(user);
        } else {
            console.log(`User with ID ${req.params.id} not found`);
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: error.message });
    }
};

// Contrôleur pour créer un nouvel utilisateur
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        console.log('User created successfully:', user);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: error.message });
    }
};

// Contrôleur pour mettre à jour un utilisateur par ID
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            console.log(`User with ID ${req.params.id} updated successfully`);
            res.status(200).json({ message: 'User updated successfully', user });
        } else {
            console.log(`User with ID ${req.params.id} not found for update`);
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: error.message });
    }
};

// Contrôleur pour supprimer un utilisateur par ID
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            console.log(`User with ID ${req.params.id} deleted successfully`);
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            console.log(`User with ID ${req.params.id} not found for deletion`);
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: error.message });
    }
};
