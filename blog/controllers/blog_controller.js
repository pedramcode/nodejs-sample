const {Blog} = require("../models")
const {$response} = require("../../utils")
const mongoose  = require("mongoose")

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

    user_blogs: async (req, res) => {
        const data = req.query
        const cond = "userid" in data
        if(!cond){
            return $response(res, 400, {
                success: false,
                err: "Pass all of the required parameters",
            })
        }
        blogs = await Blog.find({user: data['userid'], "state.is_active": true})
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
    },

    update: async(req, res) => {
        const data = req.body
        const cond = "title" in data && "content" in data && "id" in data
        if(!cond){
            return $response(res, 400, {
                success: false,
                err: "Pass all of the required parameters",
            })
        }
        if(!mongoose.Types.ObjectId.isValid(data["id"])){
            return $response(res, 404, {
                success: false,
                err: "Blog not found",
            })
        }
        const blog = await Blog.findByIdAndUpdate(data["id"]).findOneAndUpdate(
            {user: req.user._id, "state.is_active": true}, 
            {title: data["title"], content: data["content"]}
        )
        if(!blog){
            return $response(res, 404, {
                success: false,
                err: "Blog not found",
            })
        }
        return $response(res, 200, {
            success: true,
            msg: "Blog updated",
        })
    },

    delete: async(req, res) => {
        const data = req.query
        const cond = "id" in data
        if(!cond){
            return $response(res, 400, {
                success: false,
                err: "Pass all of the required parameters",
            })
        }
        if(!mongoose.Types.ObjectId.isValid(data["id"])){
            return $response(res, 404, {
                success: false,
                err: "Blog not found",
            })
        }
        const blog = await Blog.findByIdAndUpdate(data["id"]).findOneAndUpdate(
            {user: req.user._id, "state.is_active": true}, 
            {"state.is_active": false}
        )
        if(!blog){
            return $response(res, 404, {
                success: false,
                err: "Blog not found",
            })
        }
        return $response(res, 200, {
            success: true,
            msg: "Blog removed",
        })
    },

}


module.exports = blog_controller