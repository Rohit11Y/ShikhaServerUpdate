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
    totalamount: {
      type: Number,
      default:0,
    },
    history: [
      {
        remarkId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "remark",
        },
        credit_amount_given_To_user: {
          type: Number,
          default: 0,
        },
        credit_amount_given_By_user: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

const customertable = mongoose.model("customer", customerschema);
module.exports = { customertable };
