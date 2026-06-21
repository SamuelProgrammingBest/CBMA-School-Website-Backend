const mongoose = require("mongoose");

const admission = require("../models/admission.model");

const admissionApply = async (req, res) => {
  try {
    await admission.create({ ...req.body });

    const mailInfo = {
      from: '"Cornerstone Baptist Model Academy" adewalesamuel835@gmail.com',
      to: enquiryInfo.email,
      subject:"Admssion Confirmation",
      text: `Good day our esteemed potential parent. Your admission application for ${req.body.studentName} has been received.`,
      html: "<h1>Yeahhhhhhh😁😁😁</h1>",
    };

    const info = await transporter.sendMail(mailInfo);

    return res.status(200).send({
      message: "Admission Application Sent Successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: `Admission not created and error = ${error}` });
  }
};

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

module.exports = {admissionApply, getAdmissions}