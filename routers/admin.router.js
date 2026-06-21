const express = require("express")
const { createAdmin, login } = require("../controllers/admin.controller")

const router = express.Router()

router.post("/sign-up", createAdmin)
router.post("/sign-in", login)


module.exports = router