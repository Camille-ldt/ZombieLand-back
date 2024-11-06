// File Path: controllers/AuthController.js

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Function to hash a password (fonction pour hacher un mot de passe) (centralized in AuthController - centralisée dans AuthController)
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

// User Login (Connexion de l'utilisateur)
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' }); // (Unauthorized - Non autorisé) // (Identifiants invalides)
        }

        // Compare provided password with the stored hashed password (Comparer le mot de passe fourni avec le mot de passe haché stocké)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Unauthorized' }); // (Unauthorized - Non autorisé) // (Identifiants invalides)
        }

        // Generate JWT token (Générer le token JWT)
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error in login:", error); // (Erreur dans login)
        res.status(500).json({ message: 'Server error' }); // (Server error - Erreur serveur) // (Erreur serveur)
    }
};

// Update User Password (Mettre à jour le mot de passe de l'utilisateur)
export const updatePassword = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const { password } = req.body;

        // Find the user by ID (Trouver l'utilisateur par ID)
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // (User not found - Utilisateur non trouvé) // (Utilisateur non trouvé)
        }

        // Hash the new password (Hacher le nouveau mot de passe)
        const hashedPassword = await hashPassword(password);

        // Update the password (Mettre à jour le mot de passe)
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' }); // (Password updated - Mot de passe mis à jour) // (Mot de passe mis à jour avec succès)
    } catch (error) {
        console.error('Error updating password:', error); // (Erreur lors de la mise à jour du mot de passe)
        res.status(500).json({ message: 'Server error while updating password' }); // (Erreur serveur lors de la mise à jour du mot de passe)
    }
};
