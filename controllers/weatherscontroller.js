const axios = require('axios');

exports.getweatherforcast = async (req, res) => {
    
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${process.env.API_KEY}`);

    let data = response.data;

    let temp = Math.round(data.main.temp - 273.15);
    let humidity = data.main.humidity;
    let windspeed = data.wind.speed;
 

    res.send({ "tempareture": temp + "celcius", "humidity": humidity, "windspeed": windspeed });

} 