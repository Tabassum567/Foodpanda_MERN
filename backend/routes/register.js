const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Customer = require("../models/customers");

router.post("/register", async (req, res) => {
  var { first_name, last_name, email_address, gender, password } = req.body;

  console.log(first_name, last_name, email_address, gender);
  Customer.exists({ email_address: email_address }, async function (err, doc) {
    if (err) {
      res.status(500).send({ errorMessage: "Database Error Occured " });
    } else if (doc) {
      res.status(200).send({ message: "User exists" });
    } else if (!doc) {
      var customer = new Customer({
        first_name: first_name,
        last_name: last_name,
        email_address: email_address,
        gender: gender,
      });
      await customer.save();

      var user = new User({
        email_address: email_address,
        password: password,
        is_active: true,
        created_on:
          new Date().getDate() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getFullYear(),
      });
      await user.save();
      res.status(200).send({ message: "Succesfully Registered" });
    }
  });
});

module.exports = router;
