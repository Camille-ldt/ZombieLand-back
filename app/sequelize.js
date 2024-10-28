//import environement variables
import 'dotenv/config';
//import ORM
import { Sequelize } from 'sequelize';

//setup client with database
const client = new Sequelize(process.env.PG_URL);

//setup database connexion
try {
    await client.authenticate();
    console.log(`🚀 database connected`);
} catch (error) {
    console.error(`❌ unable to connect to database: ${error.message}`);
}

//export client
export default client;