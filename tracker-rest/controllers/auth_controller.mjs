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
        res.status(201).json(user);
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
        res.status(200).json({ token, userId: user._id });
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

// Update user's username and/or password
export async function updateUser(req, res) {
    try {
        const { newUsername, newPassword } = req.body;
        const userId = req.user._id;
        const update = {};

        // Prepare update object
        if (newUsername) {
            update.username = newUsername.toLowerCase(); // Update username
        }
        if (newPassword) {
            // Manually hash the new password
            update.password = await bcrypt.hash(newPassword, 8);
        }
        // Update the user in the database
        const user = await User.findByIdAndUpdate(
            userId,
            update,
            { new: true, runValidators: true } // Return updated object and run validators
        );
        // No user found
        if (!user) {
            return res.status(404).json('User not found');
        }
        // User updated successfully
        res.status(200).json('User updated successfully');
    } catch (error) {
        res.status(500).json('Server error: ' + error.message);
    }
}

// Delete a user
export async function deleteUser(req, res) {
    try {
        const userId = req.user._id;
        // Find user by ObjectID and delete
        const user = await User.findByIdAndDelete(userId);
        // No user found
        if (!user) {
            return res.status(404).json('User not found');
        }
        // User deleted
        res.status(200).json('User deleted successfully');
    } catch (error) {
        res.status(500).json('Server error: ' + error.message);
    }
}

// Return a user's details
export async function userDetail(req, res) {
    try {
        // Return data specific to the authenticated user
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json('Server error');
    }
}

// Get all users with ID, username
export async function getAllUsers(req, res) {
    try {
        // Find and return all users
        const users = await User.find({}, '_id username'); // Selects only _id, username
        res.json(users);
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
}