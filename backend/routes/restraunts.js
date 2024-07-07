const express = require("express");
const router = express.Router();
const Restraunt = require("../models/restaurants");

router.get("/restraunts", async (req, res) => {
  var restraunts = await Restraunt.find();

  if (restraunts && restraunts.length > 0) {
    res.status(200).send(restraunts);
  } else {
    res.status(404).send({ errorMessage: "Could not Find any restaurant" });
  }
});

module.exports = router;
