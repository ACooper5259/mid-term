// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const multer = require('multer');
const forms = multer();

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(forms.array())
app.use(cookieSession({
  name: 'session',
  keys: ['secret']
}));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const websitesRoutes = require("./routes/websites");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/user", usersRoutes(db));
app.use("/websites", websitesRoutes(db));
//app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/new", async (req, res) => {
  const templateVars = {
    username: null,
    organization: null,
  };

  if (req.session.userID) {
    try {
      const userData = await db.query(`SELECT * FROM users WHERE id = $1;`, [req.session.userID])
      const user = userData.rows[0];
      const organizationData = await db.query(`SELECT name FROM organizations WHERE id = $1;`, [user.organization_id])
      const organizationName = organizationData.rows[0].name

      templateVars.username = user.username;
      templateVars.organization = organizationName;

      res.render("websites", templateVars);

    } catch (e) {
      return res
        .status(500)
        .json({ error: e.message });
    }
  } else {
    res.render("websites", templateVars);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
