const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["Academics", "Events", "Sports", "Admissions", "Achievements"],
      default: "Academics",
    },

    publicId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, strict: true },
);

const gallery = mongoose.model("gallery", gallerySchema);

module.exports = gallery;
