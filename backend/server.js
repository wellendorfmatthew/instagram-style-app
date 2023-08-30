require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const postRoutes = require('./routes/postRoutes');

const app = express(); // Create express app

app.use(cors());
app.use(express.json());
// TODO: Set up code for root route
app.use('/api/instagram', postRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`);
            console.log('Connected to MongoDB');
        })
    })
    .catch((error) => {
        console.log(error);
    });
