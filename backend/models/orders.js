const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  product_id: {
    type: [String],
    required: true,
  },
  product_name: {
    type: [String],
    required: true,
  },
  order_no: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  credit_card: {
    type: String,
    required: true,
  },
  email_address: {
    type: String,
    required: true,
  },
  amount: {
    type: [Number],
    required: true,
  },
  // quantity: {
  //   type: Number,
  //   required: true,
  // },
  order_date: {
    type: Date,
    required: true,
  },
  order_status: {
    type: String,
    required: true,
    default: "Pending",
  },
  order_completion_date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("orders", schema);
