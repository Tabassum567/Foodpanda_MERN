const express = require("express");
const router = express.Router();
const Customers = require("../models/customers");

router.get("/customerData/:email_address", async (req, res) => {
  var email_address = req.params.email_address;

  Customers.findOne(
    {
      email_address: email_address,
    },
    (err, customer) => {
      if (customer) {
        res.status(200).send({ customer });
      } else {
        res
          .status(404)
          .send({ message: "No Customer found with provided email address" });
      }
    }
  );
});

module.exports = router;
