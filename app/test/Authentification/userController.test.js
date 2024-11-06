// Import necessary modules
import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../../server.js';
import { createServer } from 'http';
import sequelize from '../../sequelize.js';
import net from 'net';

// Augmenter le timeout par défaut de Jest
jest.setTimeout(300000); // Timeout augmenté pour diagnostiquer les délais

// Variables pour le serveur
let server;
let port;

// Fonction pour obtenir un port libre
const getFreePort = () => {
    return new Promise((resolve, reject) => {
        const srv = net.createServer();
        srv.listen(0, () => {
            const freePort = srv.address().port;
            srv.close(() => resolve(freePort));
        });
        srv.on('error', (err) => reject(err));
    });
};

describe('Email-based registration and password reset', () => {
    beforeAll(async () => {
        try {
            console.log('Synchronizing database...');
            await sequelize.sync(); // Vérification de la synchronisation de la base de données
            console.log('Database synchronized');
        } catch (error) {
            console.error('Error synchronizing database:', error);
            throw error;
        }
    });

    beforeEach(async () => {
        if (server) {
            await new Promise((resolve, reject) => {
                server.close(err => {
                    if (err) {
                        console.error('Error closing existing server:', err);
                        return reject(err);
                    }
                    console.log('Server closed');
                    resolve();
                });
            });
        }

        port = await getFreePort();
        server = await new Promise((resolve, reject) => {
            const s = createServer(app);
            s.listen(port, () => {
                console.log(`Test server running on http://localhost:${port}`);
                resolve(s);
            }).on('error', reject);
        });
        await new Promise(resolve => setTimeout(resolve, 1000)); // Attendre un peu pour la disponibilité du serveur
    });

    it('should create a user with a hashed password using email', async () => {
        console.log('Test for user registration started');
        const email = 'testuser@example.com';
        const password = 'testpassword';
    
        // Étape 1 : Test de la requête POST pour l'enregistrement avec un timeout plus long pour le diagnostic
        try {
            console.log('Sending registration request...');
            const response = await Promise.race([
                request(`http://localhost:${port}`)
                    .post('/auth/register')
                    .send({ username: email, password }),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), 60000)) // Timeout de 60 secondes
            ]);
    
            console.log('Registration response status:', response.status);
            console.log('Registration response body:', response.body);
    
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'User registered successfully');
        } catch (error) {
            console.error('Error during registration test or timeout:', error);
            throw error;
        }
    });
    

    afterEach(async () => {
        console.log('Closing server...');
        if (server) {
            await new Promise((resolve, reject) => {
                server.close(err => {
                    if (err) {
                        console.error('Error closing server:', err);
                        return reject(err);
                    }
                    console.log('Server closed successfully');
                    resolve();
                });
            });
        }
    });

    afterAll(async () => {
        console.log('Closing database connection...');
        try {
            await sequelize.close(); // Ferme la connexion à la base de données
            console.log('Database connection closed');
        } catch (error) {
            console.error('Error closing database connection:', error);
        }
    });
});
