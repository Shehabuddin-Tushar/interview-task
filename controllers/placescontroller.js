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


