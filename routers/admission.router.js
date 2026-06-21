const express = require("express")
const { admissionApply, getAdmissions } = require("../controllers/admission.controller")

const router = express.Router()

router.post("/apply", admissionApply)
router.get("/get-applications", getAdmissions)


module.exports = router