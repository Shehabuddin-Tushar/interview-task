const express = require("express");
const router = express.Router();
const placescontroller = require("../controllers/placescontroller")



router.get("/allplaces", placescontroller.allplaces)
router.get("/searchplaces", placescontroller.searchplace)
router.get("/search/:id", placescontroller.placebyid)
router.get("/search/:id/photos",placescontroller.placesphotosbyid)
router.get("/search/:id/reviews", placescontroller.placesreviewsbyid)







// Find the nearest place based on latitude and longitude
router.get('/nearest', async (req, res) => {
    const { latitude, longitude } = req.query;

    try {
        const places = await Place.find().lean();

        // Calculate the distance between the provided coordinates and each place
        places.forEach((place) => {
            const distance = calculateDistance(latitude, longitude, place.coordinates.latitude, place.coordinates.longitude);
            place.distance = distance;
        });

        // Sort the places by distance in ascending order
        places.sort((a, b) => a.distance - b.distance);

        res.json(places[0]);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Function to calculate the distance between two sets of coordinates using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}




module.exports = router