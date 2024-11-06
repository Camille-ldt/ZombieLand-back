// Importation des configurations nécessaires et des modules
import 'dotenv/config'; // Charge les variables d'environnement
import './app/sequelize.js'; // Initialise la connexion à la base de données
import './app/models.js'; // Charge les modèles de la base de données

import client from './app/sequelize.js'; // Import de l'instance Sequelize si nécessaire

import { createServer } from 'node:http'; // Utilisation du module HTTP natif pour créer un serveur
import { app } from './app/app.js'; // Importation de l'application Express

// Définition du port
const PORT = process.env.PORT ?? 3000;

// Création du serveur
const server = createServer(app);

// Démarrage du serveur et confirmation dans la console
server.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
});

// Exporter le serveur pour une utilisation dans les tests si nécessaire
export default server;
