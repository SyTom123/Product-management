const express = require("express");
const mongoose = require('mongoose');
require("dotenv").config();
const route = require("./routes/client/index.route");
const routeAdmin = require('./routes/admin/index.route');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const database = require('./config/database');
const methodOverride = require("method-override");


const systemConfig = require('./config/system')


const app = express();

// views / view engine
app.set("views", "./views");
app.set("view engine", "pug");

// Flash
app.use(cookieParser("Nguyentiensy"));
app.use(session({cookie:{maxAge: 60000}}));
app.use(flash());
// End Flash

// use static file
app.use(express.static("public"));

//  override with POST having ? method= PATCH
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


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
