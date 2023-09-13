const express = require("express");
const mongoose = require('mongoose');
require("dotenv").config();
const route = require("./routes/client/index.route");
const database = require('./config/database')


const app = express();

// views / view engine
app.set("views", "./views");
app.set("view engine", "pug");

// use static file
app.use(express.static("public"));

//route
route(app);

// connect database
database.connect();

// connection
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is listening at port " + port);
});
