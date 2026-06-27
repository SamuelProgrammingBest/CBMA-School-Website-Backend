const mongoose = require("mongoose");

const admission = require("../models/admission.model");

const admissionApply = async (req, res) => {
  try {
    const admit = await admission.create({ ...req.body });

    const { data, error } = resend.emails.send({
      from: "Cornerstone Baptist Model Academy <onboarding@resend.dev>",
      to: admit.parentEmail,
      text: `
      You have successfully submitted your application for ${admit.studentName}
      `,
    });

    if (error) {
      return res.status(401).send({
        message: "Reply not sent successfully",
      });
    }

    return res.status(200).send({
      message: "Admission Application Sent Successfully",
      data:{
        messageId:data.id
      }
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

module.exports = { admissionApply, getAdmissions };
