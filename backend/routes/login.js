const express = require("express");
const router = express.Router();
const User = require("../models/users");

router.post("/login", async (req, res) => {
  var { email_address, password } = req.body;

  User.findOne(
    {
      email_address: email_address,
      password: password,
    },
    (err, user) => {
      if (user) {
        res.status(200).send({ message: "Login Succesfull", users: user });
      } else {
        res.status(404).send({ errorMessage: "Invalid Credentials" });
      }
    }
  );
});

module.exports = router;
