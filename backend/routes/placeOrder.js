const express = require("express");
const router = express.Router();
const Orders = require("../models/orders");

router.post("/placeOrder", async (req, res) => {
  var {
    order_no,
    product_id,
    product_name,
    address,
    credit_card,
    email_address,
    amount,
    order_date,
    order_status,
    order_completion_date,
  } = req.body;

  const order = new Orders({
    product_id: product_id,
    product_name: product_name,
    order_no: order_no,
    address: address,
    credit_card: credit_card,
    email_address: email_address,
    amount: amount,
    order_date: order_date,
    order_status: order_status,
    order_completion_date: order_completion_date,
  });
  await order.save((err) => {
    if (err) {
      res.status(400).send({ errorMessage: "Order Failed" });
    } else {
      res.status(200).send({ message: "Order placed Succesfully" });
    }
  });
});

module.exports = router;
