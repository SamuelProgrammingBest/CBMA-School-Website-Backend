const express = require("express");
const {
  admissionApply,
  getAdmissions,
} = require("../controllers/admission.controller");
const { verifyFunc } = require("../protected/verify");
const upload = require("../middleware/upload");

const router = express.Router();

const fields = [
  { name: "childPhoto", maxCount: 1 },
  { name: "parentPhoto", maxCount: 1 },
  { name: "assigneePhoto", maxCount: 1 },
];

router.post(
  "/apply",
  upload.fields(fields),
  admissionApply,
);
router.get("/get-applications", verifyFunc, getAdmissions);
router.get("/get-application/:id", verifyFunc, getAdmission)
router.patch("/update-application-status/:id", verifyFunc, updateAdmissionStatus)

module.exports = router;
