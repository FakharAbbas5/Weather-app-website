const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/f390048b0bc11694efb8e72ff9eadadc/${latitude},${longitude}?units=si`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to Weather Service", undefined);
    } else if (response.body.error) {
      callback(response.body.error, undefined);
    } else {
      const { body } = response;
      callback(undefined, {
        summary: body.daily.data[0].summary,
        temperature: body.currently.temperature,
        rain: body.currently.precipProbability
      });
    }
  });
};

module.exports = forecast;
