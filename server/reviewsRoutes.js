const express = require('express');
const { Pool } = require('pg');
const router = express.Router();
const cors = require('cors');

const pool = new Pool({
    user: 'postgres',
    host: 'https://spottawebsite-api.vercel.app',
    database: 'postgres',
    password: '08128460866',
    port: 5432,
});

router.use(cors(
    {
        origin: "https://spottawebsite-api.vercel.app",
        methods: ["POST", "GET"],
        credentials: true
    }
));

async function getReviews(req, res) {
    try {
        const query = 'SELECT * FROM review;';
        const { rows } = await pool.query(query);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch reviews');
    }
}

router.get('/', getReviews);

module.exports = router;
