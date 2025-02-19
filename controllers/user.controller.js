const jwt = require('jsonwebtoken');
const UserSchema = require('../models/user.model');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({ error: 'Please fill all the fields' });
    }

    try {
    let encryptedPassword = await bcrypt.hash(password, 10);    
    const user = await UserSchema.create({ name, email, password: encryptedPassword });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ error: 'Please fill all the fields' });
    }

    try {
        const user = await UserSchema.findOne({ email });
        if(!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            message: 'Login successful',
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
module.exports = { register, login };