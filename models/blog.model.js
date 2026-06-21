const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim:true
    },

    slug: {
      type: String,
      trim:true,
      lowercase:true,
      unique:true
    },

    author: {
      type: String,
      required: true,
      trim:true
    },

    shortDesc: {
        type:String,
        required:true
    },

    content: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
      required: true,
    },

    isPublished: {
      type: Boolean,
      default:true
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

blogSchema.pre("save", function(){
  this.slug = this.title.split(" ").join("-")
})

const blog = mongoose.model("blog", blogSchema)

module.exports = blog