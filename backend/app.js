const express = require("express");

const app = express();
const path = require("path");
const cors = require("cors");

const mongoose = require("mongoose");

// Routes
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const restrauntRouter = require("./routes/restraunts");
const menuRouter = require("./routes/menu");
const placeOrderRouter = require("./routes/placeOrder");
const getOrderRouter = require("./routes/getOrders");
const updatePasswordRouter = require("./routes/updatePassword");
const customersDataRouter = require("./routes/customerData");
mongoose.set("strictQuery", true);

const connectionString =
  // "mongodb+srv://aadi01:15243@cluster0.hbkwt.mongodb.net/academicDB?retryWrites=true&w=majority";
  "mongodb://localhost:27017/foodpanda?readPreference=primary&ssl=false";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(loginRouter);
app.use(registerRouter);
app.use(restrauntRouter);
app.use(menuRouter);
app.use(placeOrderRouter);
app.use(getOrderRouter);
app.use(updatePasswordRouter);
app.use(customersDataRouter);

mongoose.connect(connectionString, (err) => {
  if (err) {
    console.log("Connection Failed ", err);
  } else {
    console.log("Connection Successful");
  }
});

app.listen(3001, () => {
  console.log("Server running");
});
