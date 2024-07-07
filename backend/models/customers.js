const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email_address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("customers", schema);
