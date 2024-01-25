import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { register, login, logout } from './controllers/auth_controller.mjs';

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
app.post('/register', register);
app.post('/login', login);
app.post('/logout', logout);

/* ROUTES END */

// Listen on the PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));