//import environement variables
import 'dotenv/config';
//import de sequelize
import { Sequelize } from 'sequelize';

// Configuration du client Sequelize avec les options de connexion SSL pour Supabase
const client = new Sequelize(process.env.PG_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Important pour Supabase afin d'accepter les certificats SSL auto-signés
      },
    },
    logging: false, // Désactive les logs SQL pour une console plus propre
  });

// Fonction de synchronisation des tables
async function syncDatabase() {
    try {
      await client.authenticate();
      console.log(`🧟 Database connected`);
  
      await client.sync({ alter: true });
      console.log('🛠️ Tables synchronized successfully');
    } catch (error) {
      console.error(`❌ Error synchronizing tables: ${error.message}`);
    }
  }
  
  // Appel de la synchronisation
  syncDatabase();
  
  // Export de l'instance Sequelize
  export default client;