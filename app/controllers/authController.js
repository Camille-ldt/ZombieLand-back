// Fichier : app/controllers/authController.js

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Fonction d'inscription
export const register = async (req, res) => {
    try {
        const { email, password, firstname, lastname, birthday, phone_number, role_id } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashedPassword,
            firstname,
            lastname,
            birthday,
            phone_number,
            role_id
        });

        res.status(201).json({ message: 'Utilisateur enregistré avec succès', user });
    } catch (error) {
        console.error("Erreur dans register:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// Fonction pour la connexion des utilisateurs
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error("Erreur dans login:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
