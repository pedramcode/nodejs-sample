const BlogController = require("./controllers/blog_controller")
const express = require("express")
const {AuthAdmin, AuthGeneral} = require("../middlewares")

const router = express.Router()

router.post("/api/blog", AuthGeneral, BlogController.create)
router.get("/api/blog", BlogController.all_blogs)
router.get("/api/blog/user", AuthGeneral, BlogController.user_blogs)
router.put("/api/blog", AuthGeneral, BlogController.update)
router.delete("/api/blog", AuthGeneral, BlogController.delete)

module.exports = router