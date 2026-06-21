const mongoose = require("mongoose");

const enquiriesSchema = new mongoose.Schema(
  {
    parentName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    replied: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict:true
  }
);

const enquiries = mongoose.model("enquiries", enquiriesSchema)

module.exports = enquiries;