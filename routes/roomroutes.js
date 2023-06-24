const express = require("express");
const router = express.Router();
const roomscontroller = require("../controllers/roomscontroller")



router.post("/addroom/:hotelid", roomscontroller.createRoom)
router.get("/availableroom", roomscontroller.getroom)





module.exports = router