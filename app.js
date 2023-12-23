require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const app = express();

const PORT = 5000 || process.env.PORT;

// setting public folder
app.use(express.static('public'))

// Templating engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.get("/",  require('./server/routes/main'));

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});