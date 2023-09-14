const express = require("express");
const mongoose = require('mongoose');
require("dotenv").config();
const route = require("./routes/client/index.route");
const routeAdmin = require('./routes/admin/index.route')
const database = require('./config/database');

const systemConfig = require('./config/system')


const app = express();

// views / view engine
app.set("views", "./views");
app.set("view engine", "pug");

// use static file
app.use(express.static("public"));

// Variable
app.locals.prefixAdmin = systemConfig.prefix_admin;
//End Variable

//route
route(app);
routeAdmin(app);

// connect database
database.connect();

// connection
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is listening at port " + port);
});
