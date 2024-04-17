const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const router = express.Router(); // Create a router instance

const pool = new Pool({
    user: 'postgres.aricpnxiparpyvpmkowk',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    database: 'postgres',
    password: '8128460866M',
    port: 5432,
}); 

// Add CORS middleware
app.use(cors({
    origin: '*', // Change this to your actual origin
    methods: ['GET', 'POST'], // Add other allowed methods if needed
    allowedHeaders: ['Content-Type', 'Accept', 'Accept-Encoding', 'Accept-Language', 'Content-Length'], // Include other allowed headers
}));

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

// Define routes on the router
router.get('/', getReviews);

// Mount the router on the app
app.use('/reviews', router);

// Start the server
const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
