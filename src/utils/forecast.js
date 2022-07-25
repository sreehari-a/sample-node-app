const request = require("postman-request");

const forecast = (latitude, longtitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=4b6aee5f3277b22c0d995592956cf305&query=${latitude},${longtitude}`;
  debugger;
  request({ url, json: true }, (error, response) => {
    if (error) {
      console.log("Unable To Connect To weather Service");
    } else if (response.body.error) {
      console.log(response.body.error);
    } else {
      const {
        current: {
          temperature,
          feelslike,
          weather_descriptions: [description] = [],
        } = {},
      } = response.body;
      callback(null, `${description}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`)
    }
  });
};

module.exports = forecast;
