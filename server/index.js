const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Import CORS middleware
const app = express();
const port = 9000;

app.use(express.json());
app.use(cors()); // Add CORS middleware

const pool = new Pool({
    user: 'postgres.aricpnxiparpyvpmkowk',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    database: 'postgres',
    password: '8128460866M',
    port: 5432,
});

async function createReviewsTable() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS review (
                id SERIAL PRIMARY KEY,
                reviewer_name VARCHAR(255),
                "time" VARCHAR(50),
                address VARCHAR(255),
                star_review INT,
                body TEXT,
                likes INT,
                dislikes INT,
                comments INT,
                reviewer_image_url VARCHAR(255),
                amenity JSON,
                anonymous BOOLEAN
            );
        `;
        await pool.query(query);
        console.log('Review table created');
    } catch (err) {
        console.error('Review table creation failed:', err);
    }
}

async function resetSequence() {
    try {
        await pool.query("ALTER SEQUENCE review_id_seq RESTART WITH 1;");
        console.log('Review sequence reset');
    } catch (err) {
        console.error('Failed to reset review sequence:', err);
    }
}

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

createReviewsTable()
    .then(() => resetSequence())
    .catch(err => console.error('Initialization error:', err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/reviews', async (req, res) => {
    const { reviewer_name, time, address, star_review, body, likes, dislikes, comments, reviewer_image_url, amenity, anonymous } = req.body;

    try {
        const query = `
            INSERT INTO review (reviewer_name, time, address, star_review, body, likes, dislikes, comments, reviewer_image_url, amenity, anonymous)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING id;
        `;

        const values = [reviewer_name, time, address, star_review, body, likes, dislikes, comments, reviewer_image_url, amenity, anonymous];

        const result = await pool.query(query, values);
        res.status(201).json({ message: 'Review submitted', reviewId: result.rows[0].id });
    } catch (err) {
        console.error('Error inserting review:', err);
        res.status(500).send('Some error occurred');
    }
});

app.get('/reviews', getReviews); // New route to fetch reviews

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
