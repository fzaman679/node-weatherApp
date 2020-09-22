
const request = require('postman-request');


const geocode = (address, callback) => {

    //url and json combination
    const geoDetails = {
        url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZmFybzI3ODEiLCJhIjoiY2tkdHo2Y2xvMDEzajJ0b3N6ZzdodTFpeiJ9.6_M0ZOmUopaJJDSACGts4w&limit=1',
        json: true
    }


    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZmFybzI3ODEiLCJhIjoiY2tkdHo2Y2xvMDEzajJ0b3N6ZzdodTFpeiJ9.6_M0ZOmUopaJJDSACGts4w&limit=1';

    //request( geoDetails, (error, response) => { normal version 
    request( geoDetails, (error, {body}) => { //destructured version 

    //no results found result     
    const noResultsFound = body.features.length === 0; 

        if(error){
            callback('Unable to connect to location services', undefined);
        } else if(noResultsFound){
            callback('Sorry your city could not be found on our database', undefined)
        } else {
            callback(undefined, {

                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name

            })
        }
    
    
    })

}






module.exports = geocode;