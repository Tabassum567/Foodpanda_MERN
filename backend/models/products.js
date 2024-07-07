const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_id: {
    type: String,
    required: true,
  },
  restaurant_id: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  is_active: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("products", schema);
