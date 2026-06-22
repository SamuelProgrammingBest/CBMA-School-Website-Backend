const express = require("express")
const { admissionApply, getAdmissions } = require("../controllers/admission.controller")
const { verifyFunc } = require("../protected/verify")

const router = express.Router()

router.post("/apply", admissionApply)
router.get("/get-applications", verifyFunc, getAdmissions)


module.exports = router