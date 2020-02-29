const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");

const orders = require("./controllers/orders.js");
const newOrders = require("./controllers/newOrders.js");
const orderItems = require("./controllers/orderItems");
const addNewOrder = require("./controllers/addNewOrder");


const fbdb = knex({
  client: "mysql",
  connection: {
    host: "10.105.10.5",
    port: "3305",
    user: "gone",
    password: "fishing",
    database: "beahm_fishbowl"
  }
});

const shopdb = knex({
  client: "mysql",
  connection: {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "pass",
    database: "shoptracker"
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.listen(3000, () => {
  console.log("app is running on port 3000");
});
