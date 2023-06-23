const express = require("express");
const router = express.Router();
const placescontroller = require("../controllers/placescontroller")



router.get("/allplaces", placescontroller.allplaces)
router.get("/searchplaces", placescontroller.searchplace)
router.get("/search/:id", placescontroller.placebyid)
router.get("/search/:id/photos",placescontroller.placesphotosbyid)
router.get("/search/:id/reviews", placescontroller.placesreviewsbyid)
router.get('/nearest',placescontroller.nearestplaces);
   



module.exports = router