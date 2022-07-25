const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

// set path for express configurations
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// static rendering
app.use(express.static(publicDirectoryPath));

//Setup handlebars engine and views locations
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//setting up paths
app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Sreehari A" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Me", name: "Sreehari A" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Sreehari A",
    helpText:
      "This is your help page. There are two pages. About Page provides you the creator information. Default page contains the weather app",
  });
});

app.get("/weather", (req, res) => {
  const {query: {address} = {}} = req;
  if (!address) {
    return res.send({
      error: "You need to provide an address to get the data",
    });
  }
  geocode(address, (error, { latitude, longtitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    } else if (latitude && longtitude) {
      forecast(latitude, longtitude, (error, data) => {
        if (data) {
          res.send({
            address,
            location,
            data,
          })
        }
      });
    }
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help",
    name: "Sreehari A",
    notFoundText: "Help Article Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Help",
    name: "Sreehari A",
    notFoundText: "Page Not Found",
  });
});

// set the port and start the server
app.listen(3000, () => {
  console.log("Server is up and running");
});
