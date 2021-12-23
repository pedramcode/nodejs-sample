const {User, Otp} = require("../models")
const {$response} = require("../../utils")
const settings = require("../../settings")
const jwt = require('jsonwebtoken')

const user_controller = {
    register: async (req, res) => {
        await User.deleteMany()
        await Otp.deleteMany()
        const data = req.body
        const cond = "email" in data && "password" in data && "username" in data
        if(!cond){
            return $response(res, 400, {
                success: false,
                err: "Pass all of the required parameters",
            })
        }

        if((await User.find({username: data["username"]})).length != 0){
            return $response(res, 400, {
                success: false,
                err: {
                    "username": "This username already exists"
                },
            })
        }

        let user = new User(data)
        await user.save()

        let otp = new Otp({user: user._id})
        await otp.save()

        if(settings.DEBUG){
            console.log(`OTP token for ${user.username}: ${otp.token}`)
        }

        return $response(res, 200, {
            success: true,
            msg: "OTP has been sent to your email inbox",
        })
    },

    register_verify: async (req, res) => {
        const data = req.query
        const cond = "token" in data
        if(!cond){
            return $response(res, 400, {
                success: false,
                err: "Pass all of the required parameters",
            })
        }
        const token = data["token"]
        const otp = await Otp.find().populate('user').get_active(token)
        if(!otp){
            return $response(res, 400, {
                success: false,
                err: "Invalid token",
            })
        }
        otp.state.is_active = false
        otp.user.is_validated = true
        await otp.user.save()
        await otp.save()

        return $response(res, 200, {
            success: true,
            msg: "User is actived",
        })
    },

    login: async (req, res) => {
        const data = req.body
        const cond = "username" in data && "password" in data
        if(!cond){
            return $response(res, 400, {
                success: false,
                err: "Pass all of the required parameters",
            })
        }

        const user = await User.authenticate(data["username"], data["password"])
        if(!user){
            return $response(res, 403, {
                success: false,
                err: "Wrong login information",
            })
        }

        const _now = new Date()
        const token = jwt.sign({
            id: user._id,
            is_admin: user.is_admin,
            created: _now.getTime(),
        }, settings.SECRET_KEY)

        return $response(res, 200, {
            success: true,
            msg: {
                token: token,
            },
        })
    },

}


module.exports = user_controller