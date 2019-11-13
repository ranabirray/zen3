//middlewares
const express = require("express");
var bodyParser = require("body-parser");

//specify port for node server to listen
const PORT = 7000;

//load common routes
const router = require("./routes");
const app = express();

//use middlewares
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

//define the routes
app.use("/", router);

app.listen(PORT, () => console.log("Listening on Port:", PORT));
