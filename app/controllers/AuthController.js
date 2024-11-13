// controllers/AuthController.js

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Fonction pour hacher un mot de passe
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

// Connexion de l'utilisateur
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Identifiants invalides' }); 
        }

        // Comparer le mot de passe fourni avec le mot de passe haché stocké
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Identifiants invalides' }); 
        }

        // Générer le token JWT avec le rôle inclus
        const token = jwt.sign(
            { id: user.id, role: user.role_id }, 
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        console.log(`Utilisateur connecté: ${email} (ID: ${user.id})`);

        res.status(200).json({ token });
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        res.status(500).json({ message: 'Erreur serveur' }); 
    }
};

// Mettre à jour le mot de passe de l'utilisateur
export const updatePassword = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const { password } = req.body;

        // Trouver l'utilisateur par ID
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' }); 
        }

        // Hacher le nouveau mot de passe
        const hashedPassword = await hashPassword(password);

        // Mettre à jour le mot de passe
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Mot de passe mis à jour avec succès' }); 
    } catch (error) {
        console.error('Erreur lors de la mise à jour du mot de passe:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du mot de passe' }); 
    }
};
