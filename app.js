import express from "express";
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;
import helmet from 'helmet';

dotenv.config();

const app = express()
const port = 3000

import authRouter from './routes/AuthRouter.js';
import bannerRouter from './routes/bannerRouter.js';
import serviceRouter from './routes/serviceRouter.js';
import transactionRouter from './routes/transactionRouter.js';

// Middleware
app.use(express.json())
app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

// Parent router
app.use(authRouter);
app.use(bannerRouter);
app.use(serviceRouter);
app.use(transactionRouter);

// Server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// Connection DB
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

// Test DB Connection
pool.connect()
    .then(() => {
        console.log('Database connected!')
    }).catch((err) => {
        console.error('Database connection failed', err);
});

export { pool };