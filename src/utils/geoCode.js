const request = require("request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZmFraGFyNTE0IiwiYSI6ImNrNmFoYWE5MDBvbXkzanFqdWVrcDFtNDQifQ._MURLbygAIT6L1af3UR_3w`;

  request({ url: url, json: true }, (error, response) => {
    const { body } = response;
    if (error) {
      callback("Unable to Connect to Location Service", undefined);
    } else if (body.features.length === 0) {
      callback("No Such place Found. Try Different Name", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geoCode;
