import { pool } from "../app.js";

export const getBanners = async (req, res) => {
    const show = await pool.query('SELECT banner_name, banner_image, description FROM banners');

    return res.status(200).json({
        message: 'Sukses',
        data: show.rows
    })
}