const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 9000;
const cors = require('cors');
const reviewsRoutes = require('./reviewsRoutes');

app.use(cors({
    origin: "https://spottawebsite-api.vercel.app",
    methods: ["POST", "GET"],
    credentials: true,
}));

mongoose.connect('mongodb+srv://akintoyemayowa1:50IjQHSr3lGjca3A@cluster0.0yex2gh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const reviewSchema = new mongoose.Schema({
    reviewer_name: String,
    time: String,
    address: String,
    star_review: Number,
    body: String,
    likes: Number,
    dislikes: Number,
    comments: Number,
    reviewer_image_url: String,
    amenity: Object,
    anonymous: Boolean
});

const Review = mongoose.model('Review', reviewSchema);

app.use(express.json());

app.post('/reviews', async (req, res) => {
    const { reviewer_name, time, address, star_review, body, likes, dislikes, comments, reviewer_image_url, amenity, anonymous } = req.body;

    try {
        const review = new Review({
            reviewer_name,
            time,
            address,
            star_review,
            body,
            likes,
            dislikes,
            comments,
            reviewer_image_url,
            amenity,
            anonymous
        });

        const savedReview = await review.save();
        res.status(201).json({ message: 'Review submitted', reviewId: savedReview._id });
    } catch (err) {
        console.error('Error inserting review:', err);
        res.status(500).send('Some error occurred');
    }
});

app.get("/", (req, res) => {
    res.json("Hello Viewers");
})

app.use('/reviews', reviewsRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
