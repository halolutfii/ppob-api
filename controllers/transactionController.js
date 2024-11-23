import { v4 as uuidv4 } from 'uuid';
import { pool } from "../app.js";

export const balance = async (req, res) => {
    const { email } = req.user;

    const result = await pool.query('SELECT balance FROM users WHERE email = $1', [email]);
    const balance = result.rows[0].balance;

    return res.status(200).json({
        message: 'Get Balance Berhasil',
        data: {balance}
    })
} 

export const topup = async (req, res) => {
    const { email } = req.user;
    const { total_amount } = req.body;

    if (!total_amount || total_amount == 0) {
        return res.status(400).json({
            message: 'Parameter amount hanya boleh angka dan tidak boleh kosong atau 0'
        });
    }

    const userQuery = await pool.query('SELECT balance FROM users WHERE email = $1', [email]);

    const getBalanceUser = parseFloat(userQuery.rows[0].balance);
    const updateBalanceUser = getBalanceUser + parseFloat(total_amount);

    const invoice_number = uuidv4();
    const transaction_type = 'TOP UP';
    const description = 'Top Up balance';

    await pool.query('UPDATE users SET balance = $1 WHERE email = $2 RETURNING balance', [updateBalanceUser, email]);
    await pool.query('INSERT INTO transactions (email, invoice_number, transaction_type, description, total_amount) VALUES ($1, $2, $3, $4, $5)', [email, invoice_number, transaction_type, description, total_amount]);

    return res.status(200).json({
        message: 'Top Up Balance Berhasil',
        data: {total_amount}
    });
};

export const transaction = async (req, res) => {
    const { email } = req.user;
    const { service_code } = req.body;

    if (!service_code) {
        return res.status(400).json({
            message: 'Service ataus Layanan tidak ditemukan'
        });
    }

    const userQuery = await pool.query('SELECT balance FROM users WHERE email = $1', [email]);

    const getBalanceUser = parseFloat(userQuery.rows[0].balance);
    const serviceQuery = await pool.query('SELECT service_tarif, service_name, created_at FROM services WHERE service_code = $1', [service_code]);

    const { service_tarif: total_amount, service_name, created_at } = serviceQuery.rows[0];

    if (getBalanceUser < total_amount) {
        return res.status(400).json({
            message: 'Saldo anda tidak cukup, silahkan TOP UP'
        });
    }

    const updateBalanceUser = getBalanceUser - total_amount;

    await pool.query('UPDATE users SET balance = $1 WHERE email = $2', [updateBalanceUser, email]);

    const invoice_number = uuidv4();
    const transaction_type = 'PAYMENT';
    const description = `${service_code}`;

    await pool.query(
        'INSERT INTO transactions (email, invoice_number, service_code, transaction_type, description, total_amount) VALUES ($1, $2, $3, $4, $5, $6)',
        [email, invoice_number, service_code, transaction_type, description, total_amount]
    );

    return res.status(200).json({
        message: 'Transaksi berhasil',
        data: {
            invoice_number,
            service_code,
            service_name,
            transaction_type,
            total_amount,
            created_at
        }
    });
}

export const transactionHistory = async (req, res) => {
    const { email } = req.user;

    const userHistory = await pool.query('SELECT invoice_number, transaction_type, description, total_amount, created_at FROM transactions WHERE email = $1', [email]);

    return res.status(200).json({
        message: 'Get History Berhasil',
        data : userHistory.rows
    })
} 