const mongoose = require("mongoose")
const {token} = require("../../utils")
const settings = require("../../settings")
const {base_schema, base_pre_save} = require("../../base/schema_extends")


const otp_schema = new mongoose.Schema({
    ...base_schema,
    token: {type: String, maxlength: 64},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required:true}
})

otp_schema.query.get_active = async function(token){
    let _now = new Date()
    _now.setSeconds(_now.getSeconds() - settings.OTP_LIFE_TIME)
    otp_filter = {token: token, 'state.is_active': true, 'state.created_at': {$gt: _now}}
    const otp = await this.findOne(otp_filter)
    return otp
}

otp_schema.pre('save', function(next){
    if(!this.state.created_at){
        this.token = token()
    }
    base_pre_save(this)
    next()
})


module.exports = otp_schema