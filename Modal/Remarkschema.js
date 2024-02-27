const mongoose = require("mongoose");

const remarkschema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
    date: {
      type: Date,
    },
    remark: {
      type: String,
    },
    amount_given_To_user: {
      type: Boolean,
      default: false,
    },
    amount_given_By_user: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const customerremark = mongoose.model("remark", remarkschema);
module.exports = { customerremark };
