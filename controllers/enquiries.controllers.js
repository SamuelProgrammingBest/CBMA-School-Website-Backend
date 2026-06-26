const mongoose = require("mongoose");

const enquiries = require("../models/enquiries.model");
const transporter = require("../transporter/transporter");

const createEnquiries = async (req, res) => {
  try {
    await enquiries.create({ ...req.body });

    return res.status(200).send({
      message: "Enquiry Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: `Enquiry not created and error = ${error}` });
  }
};

const getEnquiries = async (req, res) => {
  try {
    const enquiriesData = await enquiries.find();

    return res.status(200).send({
      message: "Enquiries Gotten Successfully",
      data: enquiriesData,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: `Enquiries not gotten and error = ${error}` });
  }
};

const getEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const enquiryData = await enquiries.findById(id);

    return res.status(200).send({
      message: "Enquiry Gotten Successfully",
      data: enquiryData,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: `Enquiry not gotten and error = ${error}` });
  }
};

const updateisRead = async (req, res) => {
  try {
    const { id } = req.params;
    const enquiryData = await enquiries.findByIdAndUpdate(
      id,
      { isRead: true },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    return res.status(200).send({
      message: "Enquiry Gotten Successfully",
      data: enquiryData,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: `Enquiry not gotten and error = ${error}` });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    await enquiries.findByIdAndDelete(id);

    return res.status(200).send({
      message: "Enquiry Deleted Successfully",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: `Enquiry not deleted and error = ${error}` });
  }
};

const replyEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const {reply} = req.body
    const enquiryInfo = await enquiries.findById(id);

    const mailInfo = {
      from:'"Cornerstone Baptist Model Academy" <adewalesamuel835@gmail.com>',
      to:enquiryInfo.email,
      text:reply,
    }

    const info = await transporter.sendMail(mailInfo)


    return res.status(200).send({
      message: "Reply Sent Successfully",
      data: {
        id,
        messageId: info.messageId
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: `Enquiry not replied and error = ${error}` });
  }
};



module.exports = { createEnquiries, getEnquiries, getEnquiry, updateisRead, deleteEnquiry, replyEnquiry };
