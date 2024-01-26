import jwt from 'jsonwebtoken';
import User from '../models/user_model.mjs';

// Authorization middleware to return data specifc to authenticated user
export const authMiddleware = async (req, res, next) => {
    try {
        // Get auth token and find user
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.userId });
        // No user found
        if (!user) {
            throw new Error();
        }
        // User found
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};