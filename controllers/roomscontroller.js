const Hotel = require('../models/hotelSchema');
const Room = require('../models/roomSchema');
const Booking=require("../models/bookingSchema")
const moment = require('moment');
const mongoose = require('mongoose');



exports.createRoom = async (req, res) => {
    const hotelId = req.params.hotelid;




    const { title, desc, price, maxPeople, roomNumbers } = req.body;

    const formattedRoomNumbers = roomNumbers.map(roomData => {
        const formattedDates = roomData.unavailableDates?.map(mydate => {
            const date = new Date(mydate);
            const formattedDate = moment(date).format('YYYY-MM-DD'); // Format the date using Moment.js
            return formattedDate;
        });
        console.log(formattedDates)

        return {
            number: roomData.number,
            photo: roomData.photo,
            unavailableDates: formattedDates,
        };
    });



    const room = new Room({
        title: title,
        desc: desc,
        price: price,
        maxPeople: maxPeople,
        roomNumbers: formattedRoomNumbers
    });


try {
        const savedRoom = await room.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id },
            });
        } catch (err) {
            res.json(err);
        }
        res.status(200).json(savedRoom);
    } catch (err) {
        res.json(err);
    }
};

exports.getroom = async(req,res) => {
    const { location, maxPeople, startDate, endDate } = req.query;
    console.log(location, maxPeople, startDate, endDate)
    const maxPeopleNum = parseInt(maxPeople);
    const startDateObj = moment(startDate).format('YYYY-MM-DD'); //new Date(startDate);
    const endDateObj = moment(endDate).format('YYYY-MM-DD');// new Date(endDate);
    console.log(startDateObj,endDateObj)
    try {
        const hotels = await Hotel.find({ city: location });
        const filteredRooms = hotels.map(hotel => hotel.rooms);
        const roomInfo = [];
        
         
        let myroom = await Room.find({
            _id: { $in: filteredRooms },
            maxPeople: { $gte: maxPeopleNum },
            'roomNumbers.unavailableDates': {
                $not: {
                    $elemMatch: {
                        $gte: startDateObj,
                        $lte: endDateObj,
                    },
                },
            },
            
            
        });

        res.send({"available room":myroom })
        
            

    } catch (err) {
        res.json(err)
    }

}

//booking

exports.booking = async(req,res) => {
    try {
        const {guestName, contact, email, hotelId, roomNumber, checkInDate, checkOutDate} = req.body;

        // Create a new booking
        const booking = new Booking({
            guestName,
            contact,
            email,
            hotel: hotelId,
            roomNumber,
            checkInDate,
            checkOutDate,
           
        });

        // Save the booking to the database
        await booking.save();

        res.status(200).json({ message: 'Booking successful!', booking });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while booking.', error });
    }
}


//exports.payment = 
