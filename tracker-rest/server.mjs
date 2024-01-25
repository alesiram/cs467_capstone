import express from 'express';
import mongoose from 'mongoose';
import { register, login, logout } from './controllers/auth_controller.mjs';

// Express middleware to parse incoming requests with JSON payloads
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Routes to register/login/logout
app.post('/register', register);
app.post('/login', login);
app.post('/logout', logout);

// Listen on the PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));