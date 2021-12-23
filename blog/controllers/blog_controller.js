const {Blog} = require("../models")
const {$response} = require("../../utils")

const blog_controller = {
    create: async (req, res) => {
        const data = req.body
        const cond = "title" in data && "content" in data
        if(!cond){
            return $response(res, 400, {
                success: false,
                err: "Pass all of the required parameters",
            })
        }
        const blog = new Blog({user: req.user._id, title: data["title"], content: data["content"]})
        await blog.save()

        return $response(res, 200, {
            success: true,
            msg: "Blog posted",
        })
    },

    my_blogs: async (req, res) => {
        blogs = await Blog.find({user: req.user._id, "state.is_active": true})
        return $response(res, 200, {
            success: true,
            msg: blogs,
        })
    },

    all_blogs: async (req, res) => {
        blogs = await Blog.find({"state.is_active": true})
        return $response(res, 200, {
            success: true,
            msg: blogs,
        })
    }
}


module.exports = blog_controller