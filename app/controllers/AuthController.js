import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Fonction pour la connexion des utilisateurs
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Tentative de connexion pour l\'email :', email);

        // Recherche de l'utilisateur par email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log("Utilisateur non trouvé pour l'email :", email);
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        // Comparaison des mots de passe
        console.log("Mot de passe haché enregistré :", user.password);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Mot de passe incorrect pour l'utilisateur :", email);
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        // Génération du token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Connexion réussie pour l'utilisateur :", email);
        res.status(200).json({ token });
    } catch (error) {
        console.error("Erreur dans login:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

