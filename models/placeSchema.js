const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        required: true,
    },
    photos: {
        type: [String],
        required: true,
    },
    reviews: {
        type: [String],
        required: true,
    },
    coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    }
});

module.exports = mongoose.model('Place', placeSchema);
