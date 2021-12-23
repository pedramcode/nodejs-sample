const blog_schema = require("./schemas/blog_schema")
const mongoose = require("mongoose")


const Blog = mongoose.model("Blog", blog_schema)

module.exports = {
    Blog,
}
