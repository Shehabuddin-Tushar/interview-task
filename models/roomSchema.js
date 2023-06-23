const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    maxPeople: { type: Number, required: true },
    desc: { type: String, required: true },
    roomNumbers: [{
        Number: Number,
        unavailableDates: {
            type:[Date]
        },
        photo:String
    }]
});

const Room = mongoose.model('Room', roomSchema);