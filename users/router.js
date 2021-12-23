const UserController = require("./controllers/user_controller")
const express = require("express")
const {AuthAdmin, AuthGeneral} = require("../middlewares")

const router = express.Router()

router.post("/api/user/register", UserController.register)
router.get("/api/user/verify", UserController.register_verify)
router.post("/api/user/login", UserController.login)

module.exports = router