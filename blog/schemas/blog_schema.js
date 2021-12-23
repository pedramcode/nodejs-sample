const mongoose = require("mongoose")
const {base_schema, base_pre_save} = require("../../base/schema_extends")

const blog_schema = new mongoose.Schema({
    ...base_schema,
    user: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    title: {type: String, maxlength: 64, required: true},
    content: {type: String, maxlength: 1024, required: true},
})

blog_schema.pre('save', function(next){
    base_pre_save(this)
    next()
})

module.exports = blog_schema