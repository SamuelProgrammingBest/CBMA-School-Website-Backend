const express = require("express")
const { createGalleryImage, getGalleryImages, updateGalleryImage, deleteGalleryImage } = require("../controllers/gallery.controller")
const { verifyFunc } = require("../protected/verify")
const upload = require("../middleware/upload")

const router = express.Router()

router.post("/create-image", verifyFunc, upload.single("image"), createGalleryImage)
router.get("/get-images", verifyFunc, getGalleryImages)
router.patch("/update-image/:id", verifyFunc, upload.single("image"), updateGalleryImage)
router.delete("/delete-image/:id", verifyFunc, deleteGalleryImage)

module.exports = router