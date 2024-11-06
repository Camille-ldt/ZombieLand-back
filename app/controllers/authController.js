import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const Registrer = async (req, res) => {
    try {
        console.log('--- Register endpoint hit ---');
        console.log('Received data:', req.body);

        if (!req.body.username || !req.body.password) {
            console.error('Username or password missing');
            return res.status(400).json({ error: 'Username and password are required' });
        }

        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log('Password hashed successfully');

        console.log('Creating user in the database...');
        const user = await User.create({ username: req.body.username, password: hashedPassword });
        console.log('User created successfully:', user);

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const Login = async (req, res) => {
    try {
        console.log('--- Login endpoint hit ---');
        console.log('Received data:', req.body);

        const user = await User.findOne({ where: { username: req.body.username } });
        
        if (!user) {
            console.error('User not found');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('User found:', user);

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordValid) {
            console.error('Password mismatch');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('Password valid, generating token...');
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token generated:', token);

        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
