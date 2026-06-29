const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinary")

const admission = require("../models/admission.model");

const admissionApply = async (req, res) => {
  try {
    const files = req.files

    if (!files?.childPhoto || !files?.parentPhoto) {
      return res.status(400).send({ message: "All two photos are required" })
    }

    const uploadToCloudinary = async (file) => {
      const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
      return cloudinary.uploader.upload(base64, { folder: "cbma/admissions" })
    }

    const [childResult, parentResult, assigneeResult] = await Promise.all([
      uploadToCloudinary(files.childPhoto[0]),
      uploadToCloudinary(files.parentPhoto[0]),
      uploadToCloudinary(files.assigneePhoto[0]),
    ])

    const newApplication = await admission.create({
      ...req.body,
      childPhoto: childResult.secure_url,
      childPhotoPublicId: childResult.public_id,
      parentPhoto: parentResult.secure_url,
      parentPhotoPublicId: parentResult.public_id,
      assigneePhoto: assigneeResult.secure_url,
      assigneePhotoPublicId: assigneeResult.public_id,
    })

    return res.status(200).send({
      message: "Application Submitted Successfully",
      data: newApplication,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: `Application not submitted and error = ${error}` })
  }
}

const getAdmissions = async (req, res) => {
  try {
    const admissionCol = await admission.find();

    return res.status(200).send({
      message: "Applications Gotten Successfully",
      data: admissionCol,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: `Blog not gotten and error = ${error}` });
  }
};

module.exports = { admissionApply, getAdmissions };
