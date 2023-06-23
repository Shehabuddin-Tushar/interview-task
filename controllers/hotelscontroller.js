const Hotel = require('../models/hotelSchema');
exports.addhotel = async (req, res) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.getHotels = async (req, res) => {
   
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (err) {
        res.json(err);
    }
};