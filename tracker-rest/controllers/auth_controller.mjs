import User from '../models/user_model.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export async function register(req, res) {
    try {
        const { username, password } = req.body;
        // Find if existing username
        const existingUser = await User.findOne({ username: username.toLowerCase() });
        // Existing username, username is already taken
        if (existingUser) {
            return res.status(400).json('Username already exists');
        }
        // Create and save new user
        const user = new User({ username, password });
        await user.save();
        // User created
        res.status(201).json('User created successfully');
    } catch (error) {
        res.status(500).json('Server error');
    }
}

// User login
export async function login(req, res) {
    try {
        const { username, password } = req.body;
        // Find existing username
        const user = await User.findOne({ username: username.toLowerCase() });
        // No user found or password does not match
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json('Invalid credentials');
        }
        // Get the token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ token, username });
    } catch (error) {
        res.status(500).json('Server error');
    }
}

/* LOGOUT SHOULD BE HANDLED ON CLIENT SIDE */
// User logout (handle on client side - leaving for now as may be useful later)
export function logout(req, res) {
    // For JWT, logout is usually handled on the client side by removing the token
    res.status(200).json('Logged out successfully');
}