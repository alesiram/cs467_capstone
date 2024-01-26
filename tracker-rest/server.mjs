import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import * as auth from './controllers/auth_controller.mjs'
import { authMiddleware } from './middleware/auth_middleware.mjs';

// Express middleware to parse incoming requests with JSON payloads
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Connect to to the database
const db = mongoose.connection;

// Open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/* ROUTES START */

// Routes to register/login/logout
app.post('/users/register', auth.register);
app.post('/users/login', auth.login);

// Route to get all usernames and _ids
app.get('/users/all', auth.getAllUsers);

// Route to get user details (protected route - must be auth'd)
app.get('/users/user-info', authMiddleware, auth.userDetail);

// Routes to update and delete user (protected routes - must be auth'd)
app.put('/users/update', authMiddleware, auth.updateUser);
app.delete('/users/delete', authMiddleware, auth.deleteUser);

/* ROUTES END */

// Listen on the PORT
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));