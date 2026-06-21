const mongoose = require("mongoose");


const admissionSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },

    parentName: {
      type: String,
      required: true,
      trim: true,
    },

    parentEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    parentPhone: {
      type: String,
      required: true,
      trim: true,
    },

    classApplyingFor: {
      type: String,
      required: true,
    },

    previousSchool: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    passportPhoto: {
      type: String,
    },

    // status: {
    //   type: String,
    //   enum: [
    //     "Pending",
    //     "Reviewed",
    //     "Accepted",
    //     "Rejected",
    //   ],
    //   default: "Pending",
    // },
  },
  {
    timestamps: true,
    strict:true
  }
);

const admission = mongoose.model("admission", admissionSchema)

module.exports = admission;