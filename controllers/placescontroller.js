const Place = require('../models/placeSchema');

exports.allplaces = async (req, res) => {
    try {
        const places = await Place.find();
        res.json(places);
    } catch (error) {
        res.status(500).json({ message: "don't find any places here" });
    }
}

exports.searchplace = async (req,res) => {
  
        const { location, category, keywords } = req.query;
        const searchQuery = {};

        if (location) {
            searchQuery.location = location;
        }

        if (category) {
            searchQuery.category = category;
        }

        if (keywords) {
            searchQuery.$or = [
                { name: { $regex: keywords, $options: 'i' } },
                { description: { $regex: keywords, $options: 'i' } },
            ];
        }

        try {
            const places = await Place.find(searchQuery);
            res.json(places);
        } catch (error) {
            res.status(500).json({ message: '!Error' });
        }
    

}


exports.placebyid = async (req,res) => {
    const { id } = req.params;
    console.log(id)

    try {
        const place = await Place.findById(id);
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }
        res.json(place);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving place' });
    }
}

exports.placesphotosbyid = async (req,res) => {
    const { id } = req.params;

    try {
        const place = await Place.findById(id);
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }
        res.json(place.photos);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving photos' });
    }
}

exports.placesreviewsbyid = async (req,res) => {
    const { id } = req.params;

    try {
        const place = await Place.findById(id);
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }
        res.json(place.reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reviews' });
    }
}


exports.nearestplaces = async (req, res) => {
   
    const { latitude, longitude } = req.query;


    try {
        const places = await Place.find().lean();

        // Calculate distances for all places
        const placesWithDistance = places.map((place) => {
            const distance = calculateDistance(latitude, longitude, place.coordinates.latitude, place.coordinates.longitude);
            return { ...place, distance };
        });

        // Sort places based on distance in ascending order
        placesWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(placesWithDistance);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
   

}

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

