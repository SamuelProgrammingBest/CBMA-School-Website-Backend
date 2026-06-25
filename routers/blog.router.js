const express = require("express")
const { createBlog, getBlogs, updateBlog, deleteBlog, getBlog } = require("../controllers/blog.controller.")
const { verifyFunc } = require("../protected/verify")
const upload = require("../middleware/upload")

const router = express.Router()

router.post("/create-blog", verifyFunc, upload.single("coverImage"), createBlog)
router.get("/get-blogs", verifyFunc, getBlogs)
router.get("/get-blog/:slug", verifyFunc, getBlog)
router.get("/get-blog-admin/:id", verifyFunc, getBlogbyId) 
router.get("/get-blogs-client", getBlogs)
router.get("/get-blog-client/:slug", getBlog)
router.patch("/update-blog/:id", verifyFunc, upload.single("coverImage"), updateBlog)
router.delete("/delete-blog/:id", verifyFunc, deleteBlog)

module.exports = router