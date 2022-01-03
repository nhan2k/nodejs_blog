const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;

const route = require("./routes");

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
// XMLHttpRequest, getch, axios

// HTTP logger
app.use(morgan("combined"));

// Template engine
var hbs = handlebars.create({
  helpers: {
    sayHello: function () {
      alert("Hello World");
    },
    getStringifiedJson: function (value) {
      return JSON.stringify(value);
    },
  },
  defaultLayout: "main",
  partialsDir: ["views/partials/"],
});
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources/views"));

// Route
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
