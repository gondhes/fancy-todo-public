const axios = require('axios')

class weatherController {

    static getWeather(req, res){
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=${process.env.WEATHER_API}&units=metric`)
        .then(weather => {
            const {data} = weather
            const city = data.name
            const temp = data.main.temp
            const status = data.weather[0].main
            const icon = data.weather[0].icon
            res.status(200).json({city, temp, status, icon})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = weatherController