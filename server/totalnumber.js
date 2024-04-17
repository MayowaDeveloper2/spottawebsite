const express = require('express');
const { Pool } = require('pg');
const router = express.Router();
const cors = require('cors');

const pool = new Pool({
    user: 'postgres.aricpnxiparpyvpmkowk',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    database: 'postgres',
    password: '8128460866M',
    port: 5432,
}); 

router.use(cors({
    origin: "https://spottawebsite-frontend.vercel.app",
    methods: ["POST", "GET"],
    credentials: true
}));

async function getTotalRows(req, res) {
    try {
        const query = 'SELECT COUNT(*) FROM review;';
        const result = await pool.query(query);
        const totalCount = parseInt(result.rows[0].count);
        res.status(200).json({ totalRows: totalCount });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch total rows');
    }
}

router.get('/totalrows', getTotalRows);
module.exports = router;
