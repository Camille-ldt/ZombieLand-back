// Importation des configurations nécessaires et des modules
import 'dotenv/config';
import './app/sequelize.js';
import './app/models.js'; 
import { createServer } from 'node:http'; 
import app from './app/app.js'; 

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
