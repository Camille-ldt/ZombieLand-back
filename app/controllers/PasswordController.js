import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

// Gérer la demande de réinitialisation de mot de passe
export const forgotPassword = async (req, res) => {
  try {
    // Vérifier si l'utilisateur existe dans la base de données
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).json({
        message: 'Aucun utilisateur trouvé avec cette adresse e-mail.',
        suggestion: 'Veuillez vérifier l’adresse e-mail saisie ou créer un compte si vous n’en avez pas.',
      });
    }

    // Générer un token de réinitialisation
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Expire dans 1 heure
    await user.save();

    // Configurer le service de messagerie
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Options de l'e-mail à envoyer
    const mailOptions = {
      to: user.email,
      from: 'no-reply@zombieland.com',
      subject: 'Réinitialisation de mot de passe',
      text: `Bonjour ${user.username},

      Vous recevez cet e-mail parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte. 
      Veuillez cliquer sur le lien suivant, ou le copier dans votre navigateur pour compléter le processus de réinitialisation :

      http://your-app.com/reset/${token}

      Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.

      Cordialement,
      L'équipe de Zombieland`,
    };

    // Envoyer l'e-mail
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      message: 'E-mail de réinitialisation envoyé avec succès.',
      info: 'Vérifiez votre boîte de réception et suivez les instructions pour réinitialiser votre mot de passe. Si vous ne voyez pas l’e-mail, vérifiez votre dossier de spam.',
    });
  } catch (error) {
    res.status(500).json({
      error: 'Une erreur interne est survenue lors de la demande de réinitialisation.',
      details: error.message,
      suggestion: 'Veuillez réessayer plus tard ou contacter le support si le problème persiste.',
    });
  }
};

// Fonction pour gérer la réinitialisation du mot de passe
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Rechercher l'utilisateur avec le token de réinitialisation valide et non expiré
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() }, // Le token doit être encore valide
      },
    });

    if (!user) {
      return res.status(400).json({
        message: 'Le lien de réinitialisation est invalide ou a expiré.',
        suggestion: 'Veuillez demander une nouvelle réinitialisation de mot de passe.',
      });
    }

    // Hacher le nouveau mot de passe et le sauvegarder
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({
      message: 'Mot de passe réinitialisé avec succès.',
      info: 'Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.',
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erreur lors de la réinitialisation du mot de passe.',
      details: error.message,
      suggestion: 'Veuillez réessayer ou contacter le support si le problème persiste.',
    });
  }
};
