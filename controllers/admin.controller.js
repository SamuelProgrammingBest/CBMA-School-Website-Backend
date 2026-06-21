const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const admin = require("../models/admin.model");

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await admin.findOne({ email });

    if (existingAdmin) {
      return res.status(404).send({
        message: "Admin Already Exists",
        data: existingAdmin,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await admin.create({
      name,
      email,
      password: hashedPassword,
    });

    const jwtToken = jwt.sign({ id: newAdmin.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10h",
    });

    if (!jwtToken) {
      return res.status(404).send({
        message: "Admin not Created Successfully beacuse of token",
      });
    }

    return res.status(200).send({
      message: "Admin Created Successfully",
      data: jwtToken
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: `Admin not created and error = ${error}` });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminDetails = await admin.findOne({ email });

    if (!adminDetails) {
      return res.status(200).send({
        message: "Email entered is wrong",
      });
    }

    const compare = bcrypt.compare(password, adminDetails.password);

    if (!compare) {
      return res.status(200).send({
        message: "Password entered is wrong",
      });
    }

    const jwtToken = jwt.sign({ id: adminDetails.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10h",
    });

    if (!jwtToken) {
      return res.status(404).send({
        message: "Admin not logged in successfully beacuse of token",
      });
    }

    return res.status(200).send({
      message: "Admin Logged In Successfully",
      data: jwtToken
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: `Admin not logged in and error = ${error}` });
  }
};


module.exports = {createAdmin, login}