import User from '../models/User.js';

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
        const userId = req.params.id;
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
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error('Server error while creating user');
        res.status(500).json({message: 'Server error while creating user'});
    }
};

// Update a user (mettre à jour un utilisateur)
export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;        
        const updateUser = await User.update(req.body, {where: {id: userId}});
        res.status(200).json(updateUser);
    } catch (error) {
        console.error('Server error while updating user');
        res.status(500).json({message: 'Server error while updating user'});
    }
};

// Delete a user (supprimer un utilisateur)
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user){
            return res.status(404).json({message: 'User not found'});
        };
        await user.destroy(user);
        res.status(204).json({ message: `User with ID ${userId} successfully deleted` }); 
    } catch (error) {
        console.error('Server error while deleting user');
        res.status(500).json({message: 'Server error while deleting user'});
    }
};
