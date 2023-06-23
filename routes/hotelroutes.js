const express = require("express");
const router = express.Router();
const hotelscontroller = require("../controllers/hotelscontroller")



router.post("/addhotel", hotelscontroller.addhotel)
router.get("/gethotels", hotelscontroller.getHotels)





module.exports = router