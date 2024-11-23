import jwt from 'jsonwebtoken';
import { pool } from '../app.js';

export const protectedMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (token && token.startsWith('Bearer ')) {
        const bearerToken = token.split(' ')[1];
        try {
            const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET || "secret-jwt");
            const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [decoded.email]);
            const user = rows[0];

            req.user = user;
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Token tidak valid atau kadaluwarsa' });
        }
    } else {
        return res.status(401).json({ message: 'Token tidak valid atau kadaluwarsa' });
    }
};
