const express = require("express");
const router = express.Router();

const roomscontroller = require("../controllers/roomscontroller")
const stripe = require('stripe')(process.env.YOUR_STRIPE_SECRET_KEY);
const path = require("path")
const Booking = require("../models/bookingSchema")





router.post("/addroom/:hotelid", roomscontroller.createRoom)
router.get("/availableroom", roomscontroller.getroom)


//booking routes
router.post("/book", roomscontroller.booking)

router.get("/paymentscreen", (req,res) => {
    res.render("Home", {
        key: process.env.YOUR_PUBLISHABLE_KEY
    })
})

router.post("/payment",roomscontroller.payment)




module.exports = (app) => {
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "../views"));

    // ... other router code

    return router;
};

