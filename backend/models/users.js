const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email_address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    required: true,
  },
  created_on: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", schema);
