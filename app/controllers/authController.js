import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const Registrer = async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({ username: req.body.username, password: hashedPassword });
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Connexion
  export const Login = async (req, res) => {
    try {
      const user = await User.findOne({ where: { username: req.body.username } });
      if (!user || !await bcrypt.compare(req.body.password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  