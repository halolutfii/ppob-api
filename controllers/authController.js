import { pool } from "../app.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signToken = (email) => {
    return jwt.sign(
        { email }, 
        process.env.JWT_SECRET || "secret-jwt",
        { expiresIn: "12h" }
    );
};

export const createSendResToken = (user, statusCode, res) => {
    const token = signToken(user.email);

    res.status(statusCode).json({
        message: "Login berhasil",
        token
    });
};

export const createUser = async (req, res) => {
    const { email, password, first_name, last_name } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: "Parameter email tidak sesuai format" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await pool.query('INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *', [email, hashedPassword, first_name, last_name]);

    return res.status(200).json({
        message: 'Registrasi berhasil silahkan login',
        data: null
    })
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: "Parameter email tidak sesuai format" });
    }

    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(userQuery, [email]);

    const user = rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
        createSendResToken(user, 200, res);
    } else {
        return res.status(401).json({ message: "Username atau password salah" });
    }
}

export const getProfile = async (req, res) => {
    const { email, first_name, last_name, profile_image } = req.user;

    return res.status(200).json({
        message: 'Profile berhasil tampil',
        data: { email, first_name, last_name, profile_image }
    });
}

export const updateProfile = async (req, res) => {
    const { email } = req.user; 
    const { first_name, last_name } = req.body;

    const userQuery = 'UPDATE users SET first_name = $1, last_name = $2 WHERE email = $3 RETURNING email, first_name, last_name, profile_image';
    const { rows } = await pool.query(userQuery, [first_name, last_name, email]);

    const getUser = rows[0]; 

    return res.status(200).json({
        message: 'Update profile berhasil',
        data: getUser 
    });
};

export const updateImage = async (req, res) => {
    const { email } = req.user;

    if (!req.file) {
        return res.status(400).json({ message: 'File gambar tidak ditemukan' });
    }

    const profile_image = `uploads/images/${req.file.filename}`;

    const userQuery = 'UPDATE users SET profile_image = $1 WHERE email = $2 RETURNING email, first_name, last_name, profile_image';
    const { rows } = await pool.query(userQuery, [profile_image, email]);

    const getUser = rows[0]; 

    return res.status(200).json({
        message: 'Update profile berhasil',
        data: getUser
    });
}

