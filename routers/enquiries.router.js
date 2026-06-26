const express = require("express")
const { createEnquiries, getEnquiries, getEnquiry, updateisRead, deleteEnquiry, replyEnquiry } = require("../controllers/enquiries.controllers")
const { verifyFunc } = require("../protected/verify")

const router = express.Router()

router.post("/create-enquiry", createEnquiries)
router.get("/get-enquiries", verifyFunc, getEnquiries)
router.get("/get-enquiry/:id", verifyFunc, getEnquiry)
router.patch("/isRead/:id", verifyFunc, updateisRead)
router.delete("/delete-enquiry/:id", verifyFunc, deleteEnquiry)
router.post("/reply-enquiry/:id", verifyFunc, replyEnquiry)
module.exports = router