const asyncHandler = require("express-async-handler")
const { io } = require("../socket/socket")
const Blog = require("../models/Blog")

exports.createBlog = asyncHandler(async (req, res) => {
    await Blog.create(req.body)
    const result = await Blog.find()
    io.emit("todo-create-response", result)
    res.json({ message: "create Blog Success" })
})
exports.readBlog = asyncHandler(async (req, res) => {
    const result = await Blog.find()
    res.json({ message: "read Blog Success", result })
})
exports.updateBlog = asyncHandler(async (req, res) => {
    const result = await Blog.findByIdAndUpdate(req.params.id, req.body)
    res.json({ message: "update Blog Success" })
})
exports.deleteBlog = asyncHandler(async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    const result = await Blog.find()
    io.emit("todo-create-response", result)
    res.json({ message: "delete Blog Success" })
})
