const mongoose = require("mongoose");

const gallery = require("../models/gallery.model");
const cloudinary = require("../config/cloudinary");

const createGalleryImage = async (req, res) => {
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

    const newImage = await gallery.create({
      ...req.body,
      image: result.secure_url,
      publicId: result.public_id,
    });

    return res.status(201).send({
      message: "Gallery Image Created Successfully",
      data: newImage,
    });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ message: `Gallery image not created and error = ${error}` });
  }
};

const getGalleryImages = async (req, res) => {
  try {
    const galleryImgs = await gallery.find();

    return res.status(200).send({
      message: "Blog Posts Gotten Successfully",
      data: galleryImgs,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: `Gallery image not created and error = ${error}` });
  }
};

const getGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    const galleryImg = await gallery.findById(id);

    return res.status(200).send({
      message: "Gallery Image Gotten Successfully",
      data: galleryImg,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: `Gallery image not created and error = ${error}` });
  }
};

const updateGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    const existingImage = await gallery.findById(id);
    if (!existingImage) {
      return res.status(404).send({ message: "Blog not found" });
    }

    let updateData = { ...req.body };

    if (req.file) {
      const file = req.file;
      const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

      const result = await cloudinary.uploader.upload(base64, {
        folder: "cbma",
      });

      if (existingImage.publicId) {
        try {
          await cloudinary.uploader.destroy(existingImage.publicId);
        } catch (err) {
          console.log("Old image deletion failed:", err);
          // don't block the update just because cleanup failed
        }
      }

      // 4. Merge new image info into what we're updating
      updateData.coverImage = result.secure_url;
      updateData.publicId = result.public_id;
    }

    const updatedImage = await gallery.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    return res.status(200).send({
      message: "Gallery Image Updated Successfully",
      data: updatedImage,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: `Gallery image not created and error = ${error}
    `,
    });

  }
};

const deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    const existingImage = await gallery.findById(id);
    if (!existingImage) {
      return res.status(404).send({ message: "Image not found" });
    }

    if (existingImage.publicId) {
      try {
        await cloudinary.uploader.destroy(existingImage.publicId);
      } catch (err) {
        console.log("Image deletion failed:", err);
        // continue anyway — don't let a Cloudinary hiccup block the delete
      }
    }

    await gallery.findByIdAndDelete(id);

    return res.status(200).send({
      message: "Gallery Image Deleted Successfully",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: `Gallery image not created and error = ${error}` });
  }
};

module.exports = {
  createGalleryImage,
  getGalleryImages,
  getGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
};
