const express = require("express");
const router = express.Router();
const Orders = require("../models/orders");

router.get("/getOrders/:email_address", async (req, res) => {
  var email_address = req.params.email_address;

  var orders = await Orders.find({
    email_address: email_address,
  });

  if (orders && orders.length > 0) {
    res.status(200).send({ orders: orders });
  } else {
    res.status(404).send({ errorMessage: "No orders found" });
  }
});

router.post("/changeOrders", async (req, res) => {
  var { order_no, order } = req.body;

  const ord = Orders.findOne(
    {
      order_no: order_no,
    },
    async (err, orders) => {
      if (orders) {
        orders.overwrite({
          product_id: order.product_id,
          product_name: order.product_name,
          order_no: order.order_no,
          address: order.address,
          credit_card: order.credit_card,
          email_address: order.email_address,
          amount: order.amount,
          order_date: order.order_date,
          order_status: "Completed",
          order_completion_date: order.order_completion_date,
        });
        await orders.save();
      }
    }
  );
});

module.exports = router;
