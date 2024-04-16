const express = require('express');
const { Pool } = require('pg');
const router = express.Router();
const cors = require('cors');

const pool = new Pool({
    user: 'default',
    host: 'ep-patient-dream-a4ircu4i-pooler.us-east-1.aws.neon.tech',
    database: 'verceldb',
    password: 'Ur92WuQwMpZa',
    port: 5432,
});

router.use(cors());

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
