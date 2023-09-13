const express = require ('express');
require('dotenv').config();
const route = require('./routes/client/index.route')
const app = express();

// views / view engine
app.set("views", "./views");
app.set("view engine", "pug");



//route
route(app);



// connection
const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server is listening at port "+ port)
})