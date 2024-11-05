
const User = require('../../models/User.js');
const request = require('supertest');
const bcrypt = require('bcrypt');

describe('User registration and password reset', () => {
    beforeAll(async () => {
        await User.destroy({ where: { username: 'testuser' } });
    });

    it('should create a user with a hashed password', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({ username: 'testuser', password: 'testpassword' });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');

        const user = await User.findOne({ where: { username: 'testuser' } });
        expect(user).not.toBeNull();

        const isPasswordHashed = await bcrypt.compare('testpassword', user.password);
        expect(isPasswordHashed).toBe(true);
    });

    afterAll(async () => {
        await User.destroy({ where: { username: 'testuser' } });
    });
});