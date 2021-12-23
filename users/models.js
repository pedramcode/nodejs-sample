const user_schema = require("./schemas/user_schema")
const otp_schema = require("./schemas/otp_schema")
const mongoose = require("mongoose")


const User = mongoose.model("User", user_schema)
const Otp = mongoose.model("Otp", otp_schema)

module.exports = {
    User,
    Otp,
}
