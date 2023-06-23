const mongoose = require('mongoose');


const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    amenities: [String],

    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    rooms: {
        type: [String],
    },

    reviews: [{
        username: String,
        rating: Number,
        comment: String
    }],

   
});

const Hotel=mongoose.model('Hotel', hotelSchema);

module.exports=Hotel




