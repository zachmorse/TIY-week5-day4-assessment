const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const session = require("express-session");
const sessionConfig = require("./sessionConfig");
const app = express();
const port = process.env.PORT || 8000;

var users = [];

// set view engine:

app.engine("mustache", mustacheExpress());
app.set("views", "./public");
app.set("view engine", "mustache");

// middleware

app.use("/", express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));
