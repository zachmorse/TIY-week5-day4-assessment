const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const session = require("express-session");
const sessionConfig = require("./sessionConfig");
const app = express();
const port = process.env.PORT || 8080;

var users = [
  { username: "Zach", password: "elcamin0" },
  { username: "bill", password: "5678" }
];
var currentUser = [];

// set view engine:

app.engine("mustache", mustacheExpress());
app.set("views", "./public");
app.set("view engine", "mustache");

// middleware

app.use("/", express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));

function checkAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  } else {
    next();
  }
}

// ROUTES

app.get("/", checkAuth, function(req, res) {
  res.render("index", { userListing: currentUser });
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.post("/login", function(req, res) {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.redirect("/login");
  }

  var requestingUser = req.body;
  var userDetails;
  users.forEach(function(item) {
    if (item.username === requestingUser.username) {
      userDetails = item;
      currentUser = item.username;
    }
  });

  if (!userDetails) {
    return res.redirect("/login");
  }

  if (requestingUser.password === userDetails.password) {
    req.session.user = userDetails;

    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
});

// LISTENER

app.listen(port, function(req, res) {
  console.log("Server running on port", port);
});
