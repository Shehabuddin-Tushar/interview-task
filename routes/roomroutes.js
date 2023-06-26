const express = require("express");
const router = express.Router();

const roomscontroller = require("../controllers/roomscontroller")
const stripe = require('stripe')(process.env.YOUR_STRIPE_SECRET_KEY);
const path = require("path")
const Booking = require("../models/bookingSchema")
const mongoose=require("mongoose")





router.post("/addroom/:hotelid", roomscontroller.createRoom)
router.get("/availableroom", roomscontroller.getroom)


//booking routes
router.post("/book", roomscontroller.booking)

router.get("/paymentscreen", (req,res) => {
    res.render("Home", {
        key: process.env.YOUR_PUBLISHABLE_KEY
    })
})

router.post("/payment", async (req, res) => {
    const userId = new mongoose.Types.ObjectId('6497ddc4a896d160b7b0b168'); // Replace with the actual ID of the user document

    const updateBooking = await Booking.findByIdAndUpdate(
        { _id: userId },
        { $set: { payment: 'confirmed' } },
        { new: true }

    );

    try {
        const customer = await stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken,
            name: "tushar khan interview task",
            address: {
                line1: "jatrabari",
                postal_code: "1362",
                city: "Dhaka",
                state: "Dhaka",
                country: "Bangladesh"
            }
        });

        const charge = await stripe.charges.create({
            amount: 7000,
            description: "interview task for backend developer",
            currency: "USD",
            customer: customer.id
        });
        console.log(charge);

        

        res.send("success");


    } catch (err) {
        res.send(err);
    }


})




module.exports = (app) => {
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "../views"));

    // ... other router code

    return router;
};

