import { pool } from "../app.js";

export const getServices = async (req, res) => {
    const show = await pool.query('SELECT service_code, service_name, service_icon, service_tarif FROM services');

    return res.status(200).json({
        message: 'Sukses',
        data: show.rows
    })
}