const request = require('postman-request');

const forecast = (lat, long, callback) => {
    
    const forecastDetails = {
        url: 'http://api.weatherstack.com/current?access_key=1439290ca45760a11678f2f86bc835d7&query= ' + lat + ' , ' + long,
        json: true
    }
    
    //const url = 'http://api.weatherstack.com/current?access_key=1439290ca45760a11678f2f86bc835d7&query= ' + lat + ' , ' + long;

    //request(forecastDetails, (error, response) => { //normal version
    request(forecastDetails, (error, {body}) => { //destructed version

    const noCityFound = body.error;

        if(error){
            callback('sorry you cannot connect to weather services', undefined);
        } else if(noCityFound){
            callback('sorry your city was not found on our database', undefined);
        } else{
            callback(undefined, 'It is currently ' + body.current.temperature + ' degrees out there. There is ' + body.current.precip + ' % chance of rain with a humidity of ' +  body.current.humidity + ' %');
        }

    })
}


module.exports = forecast;