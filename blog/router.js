const BlogController = require("./controllers/blog_controller")
const express = require("express")
const {AuthAdmin, AuthGeneral} = require("../middlewares")

const router = express.Router()

router.post("/api/blog", AuthGeneral, BlogController.create)
router.get("/api/blog", BlogController.all_blogs)
router.get("/api/blog/me", AuthGeneral, BlogController.my_blogs)

module.exports = router