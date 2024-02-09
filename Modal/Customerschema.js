const mongoose = require("mongoose");

const customerschema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    address: {
      type: String,
    },
    businessAddress: {
      type: String,
    },
  },
  { timestamps: true }
);

const customertable = mongoose.model("customer", customerschema);
module.exports = { customertable };
