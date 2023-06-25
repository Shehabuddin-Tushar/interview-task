const express = require("express");
const router = express.Router();
const weatherscontroller = require("../controllers/weatherscontroller")





router.post("/getweather", weatherscontroller.getweatherforcast)

module.exports = router