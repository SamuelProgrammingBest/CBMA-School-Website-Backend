const mongoose = require("mongoose");

const blog = require("../models/blog.model");
const cloudinary = require("../config/cloudinary")

const createBlog = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({
        message: "Please upload an image",
      });
    }

    const file = req.file;

    const base64 = `data:${
      file.mimetype
    };base64,${file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "cbma",
    });

    await blog.create({
      ...req.body,
      coverImage: result.secure_url,
      publicId: result.public_id,
    });

    return res.status(200).send({
      message: "Blog Post Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: `Blog not created and error = ${error}` });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await blog.find();

    return res.status(200).send({
      message: "Blog Posts Gotten Successfully",
      data: blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: `Blog not gotten and error = ${error}` });
  }
};

const getBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const blogs = await blog.find({ slug, isPublished:true });

    return res.status(200).send({
      message: "Blog Post Gotten Successfully",
      data: blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: `Blog not gotten and error = ${error}` });
  }
};

const getBlogbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await blog.findById(id);

    return res.status(200).send({
      message: "Blog Post Gotten Successfully",
      data: blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: `Blog not gotten and error = ${error}` });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const existingBlog = await blog.findById(id);
    if (!existingBlog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    let updateData = { ...req.body };

    if (req.file) {
      const file = req.file;
      const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

      const result = await cloudinary.uploader.upload(base64, {
        folder: "cbma",
      });

      if (existingBlog.publicId) {
        try {
          await cloudinary.uploader.destroy(existingBlog.publicId);
        } catch (err) {
          console.log("Old image deletion failed:", err);
          // don't block the update just because cleanup failed
        }
      }

      // 4. Merge new image info into what we're updating
      updateData.coverImage = result.secure_url;
      updateData.publicId = result.public_id;
    }

    const updatedBlogs = await blog.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    return res.status(200).send({
      message: "Blog Post Updated Successfully",
      data: updatedBlogs,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: `Blog not updated and error = ${error}` });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const existingBlog = await blog.findById(id);
    if (!existingBlog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    if (existingBlog.publicId) {
      try {
        await cloudinary.uploader.destroy(existingBlog.publicId);
      } catch (err) {
        console.log("Image deletion failed:", err);
        // continue anyway — don't let a Cloudinary hiccup block the delete
      }
    }

    await blog.findByIdAndDelete(id);

    return res.status(200).send({
      message: "Blog Post Deleted Successfully",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: `Blog not deleted and error = ${error}` });
  }
};

module.exports = { createBlog, getBlogs, updateBlog, deleteBlog, getBlog, getBlogbyId };
