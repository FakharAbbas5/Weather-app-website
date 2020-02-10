const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("../src/utils/geoCode");
const forecast = require("../src/utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
// setup path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templetes/views");
const partialsPath = path.join(__dirname, "../templetes/partials");

// setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Fakhar Abbas"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Fakhar Abbas"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "Do you Need Help",
    name: "Fakhar Abbas"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must Provide Address"
    });
  }

  geoCode(req.query.address, (error, response) => {
    if (error) {
      return res.send({ error });
    }
    const { latitude, longitude, location } = response;
    forecast(latitude, longitude, (error, response) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: response,
        location,
        address: req.query.address
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Fakhar Abbas",
    errorMsg: "Help Article Not Found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Fakhar Abbas",
    errorMsg: "Page Not Found"
  });
});

app.listen(port, () => {
  console.log("Listening up at port " + port);
});
