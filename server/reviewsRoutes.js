const express = require('express');
const router = express.Router();
const cors = require('cors');
const Review = require('./models/Review');

router.use(cors({
    origin: "https://spottawebsite-api.vercel.app",
    methods: ["POST", "GET"],
    credentials: true
}));

async function getReviews(req, res) {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch reviews');
    }
}

router.get('/', getReviews);

module.exports = router;
