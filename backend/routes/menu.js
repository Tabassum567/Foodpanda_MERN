const express = require("express");
const router = express.Router();
const Products = require("../models/products");

router.get("/menu/:restaurant_id", async (req, res) => {
  var restaurant_id = req.params.restaurant_id;

  if (restaurant_id === undefined || restaurant_id === null) {
    res.status(404).send({ errorMessage: "Menu Not Found" });
  } else {
    var menu = await Products.find({
      restaurant_id: restaurant_id,
    });
    res.status(200).send(menu);
  }
});

module.exports = router;
