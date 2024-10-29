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

//setup database connexion
try {
    await client.authenticate();
    console.log(`🚀 database connected`);
} catch (error) {
    console.error(`❌ unable to connect to database: ${error.message}`);
}

// Sync tables with databases
(async () => {
    try {
      await client.sync({ alter: true }); // Utiliser `{ force: true }` seulement si vous voulez recréer les tables
      console.log('🛠️ Tables synchronized successfully');
    } catch (error) {
      console.error(`❌ Error synchronizing tables: ${error.message}`);
    }
  })();

//export client
export default client;