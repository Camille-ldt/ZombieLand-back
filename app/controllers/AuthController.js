// Import modules for authentication and security (Importer des modules pour l'authentification et la sécurité)
import bcrypt from 'bcrypt'; // Library for hashing passwords (Bibliothèque pour hacher les mots de passe)
import jwt from 'jsonwebtoken'; // Library for generating JSON Web Tokens (JWT) (Bibliothèque pour générer des tokens JWT)
import crypto from 'crypto'; // Node.js module for cryptographic operations (Module Node.js pour les opérations cryptographiques)
import { Op } from 'sequelize'; 
import User from '../models/User.js'; 
import { sendEmail } from '../services/emailService.js'; // Email service for sending emails (Service d'email pour envoyer des emails)

// Function to hash a password (Fonction pour hacher un mot de passe)
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

// User login function (Fonction de connexion de l'utilisateur)
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email (Trouver l'utilisateur par email)
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Identifiants invalides' }); // Invalid credentials error
        }

        // Compare provided password with stored hashed password (Comparer le mot de passe fourni avec le mot de passe haché)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Identifiants invalides' }); // Invalid credentials error
        }

        // Generate JWT including user's role (Générer un token JWT avec le rôle de l'utilisateur)
        const token = jwt.sign(
            { id: user.id, role: user.role_id },
            process.env.JWT_SECRET, // Secret key from environment variables (Clé secrète des variables d'environnement)
            { expiresIn: '1h' } // Token expiration time (Durée de validité du token)
        );

        console.log(`Utilisateur connecté: ${email} (ID: ${user.id})`); // Log successful login

        res.status(200).json({ token }); // Return the JWT token to the client
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        res.status(500).json({ message: 'Erreur serveur' }); // Server error response
    }
};

// Function to update a user's password (Fonction pour mettre à jour le mot de passe d'un utilisateur)
export const updatePassword = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const { password } = req.body;

        // Find the user by ID (Trouver l'utilisateur par ID)
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' }); // User not found error
        }

        // Hash the new password (Hacher le nouveau mot de passe)
        const hashedPassword = await hashPassword(password);

        // Update the user's password (Mettre à jour le mot de passe)
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du mot de passe:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du mot de passe' });
    }
};

// Function to generate a password reset token (Fonction pour générer un token de réinitialisation de mot de passe)
export const generateResetToken = async (req, res) => {
    try {
        const { email } = req.body;

        // Find the user by email (Trouver l'utilisateur par email)
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Aucun utilisateur trouvé avec cet email.' }); // User not found error
        }

        // Generate a secure token and its expiry time (Générer un token sécurisé et son expiration)
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // Valid for 1 hour (Valide pendant 1 heure)

        // Hash the token and store it in the database (Hacher le token et le stocker dans la base de données)
        user.resetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetTokenExpiry = new Date(resetTokenExpiry);

        await user.save();

        // Generate the reset link (Générer le lien de réinitialisation)
        const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

        // Send the reset email (Envoyer l'email de réinitialisation)
        await sendEmail({
            to: email,
            subject: 'Réinitialisation de votre mot de passe',
            text: `Bonjour,\n\nCliquez sur ce lien pour réinitialiser votre mot de passe :\n\n${resetLink}\n\nCe lien est valable pendant 1 heure.`,
            html: `
                <p>Bonjour,</p>
                <p>Réinitialisez votre mot de passe en cliquant sur ce lien :</p>
                <a href="${resetLink}">${resetLink}</a>
            `,
        });

        res.status(200).json({ message: 'Lien de réinitialisation envoyé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la génération du token de réinitialisation:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Function to reset the user's password (Fonction pour réinitialiser le mot de passe de l'utilisateur)
export const resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;

        // Hash the provided token for database comparison (Hacher le token pour la comparaison dans la base de données)
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Find the user with the provided token (Trouver l'utilisateur avec le token fourni)
        const user = await User.findOne({
            where: {
                resetToken: hashedToken,
                resetTokenExpiry: { [Op.gt]: new Date() }, // Check if the token is still valid (Vérifier si le token est toujours valide)
            },
        });

        if (!user) {
            return res.status(400).json({ message: 'Token invalide ou expiré.' }); // Invalid or expired token error
        }

        // Hash and update the new password (Hacher et mettre à jour le nouveau mot de passe)
        user.password = await hashPassword(newPassword);
        user.resetToken = null; // Clear the reset token (Supprimer le token de réinitialisation)
        user.resetTokenExpiry = null;

        await user.save();

        res.status(200).json({ message: 'Mot de passe réinitialisé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la réinitialisation du mot de passe:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
