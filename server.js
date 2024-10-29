import 'dotenv/config';
import './app/sequelize.js';
import './app/models.js';

import client from './app/sequelize.js';

import { createServer } from 'node:http';
import { app } from './app/app.js';


const PORT = process.env.PORT ?? 3000;

const server = createServer(app);

server.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
});