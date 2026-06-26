const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service:"gmail",
    family:4,
    auth:{
        user:process.env.EMAIL_ACC,
        pass:process.env.EMAIL_APP_PASS
    }
})


module.exports = transporter