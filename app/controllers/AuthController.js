import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Fonction pour la connexion des utilisateurs
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Recherche de l'utilisateur par email
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        // Génération du token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error("Erreur dans login:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};