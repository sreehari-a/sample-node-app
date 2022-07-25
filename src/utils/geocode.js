const request = require("postman-request");

const geocode = (address, callback) => {
    const url =
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3JlZWhhcmlhIiwiYSI6ImNsNXVubXVhMTAxazczam80YWE2YzVnNW8ifQ.jhdPfAERxH4g4Y4_W9r9Dg&limit=1`;
      request({url, json: true}, (error, response) => {
        if (error) {
            console.log("Unable To Connect To Location");
            callback("Unable To Connect To Location");
          } else if (response.body.features.length === 0 ) {
            callback("Unable to find that location");
          } else {
            const { features: [{ center: [longtitude, latitude ] = [] ,place_name :location} = []] = [] } =
              response.body;
            callback(null, {latitude, longtitude, location})
            // console.log(`Latitude: ${latitude}`, `Longtitude: ${longtitude}`);
          } 
      })
    
}

module.exports = geocode;