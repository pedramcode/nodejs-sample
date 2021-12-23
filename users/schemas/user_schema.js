const mongoose = require("mongoose")
const {hasher} = require("../../utils")
const {base_schema, base_pre_save} = require("../../base/schema_extends")

const user_schema = new mongoose.Schema({
    ...base_schema,
    username: {type: String, maxlength: 32, minlength: 2, required: true},
    password: {type: String, maxlength: 64, minlength: 8, required: true, set: x => hasher(x)},
    is_validated: {type: Boolean, default: false},
    is_admin: {type: Boolean, default: false},
    email: {type: String, maxlength: 128, required: true},
    firstname: {type: String, maxlength: 32, required: false},
    lastname: {type: String, maxlength: 32, required: false},
    mobile: {type: String, maxlength: 32, required: false},
})

user_schema.statics.authenticate = function(username, password){
    const data = mongoose.model('User').findOne({
        username: username, 
        password: password,
        "is_validated": true, 
        "state.is_active": true,
    })
    return data
}

user_schema.pre('save', function(next){
    base_pre_save(this)
    next()
})

module.exports = user_schema