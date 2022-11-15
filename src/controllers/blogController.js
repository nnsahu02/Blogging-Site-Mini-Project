const blogModel = require('../models/blogsModel')
const authorModel = require('../models/authorModel')
const { isValidObjectId } = require('mongoose')
const { findByIdAndUpdate } = require('../models/blogsModel')


//create Blog
const createBlog = async function (req, res) {
    const { title, body, authorId, tag, category, subcategory, isPublished, isDeleted } = req.body
    try {
        if (!title || !body || !authorId || !category) {
            return res.status(400).send({ status: false, msg: "all fields are required" })
        }
        if (!isValidObjectId(authorId)) {
            return res.status(400).send({ status: false, msg: "invalid authorid in validation" })
        }
        const authorDetail = await authorModel.findById(authorId)
        if (!authorDetail) {
            return res.status(400).send({ status: false, msg: "invalid authorid" })
        }
        const data = await blogModel.create({ title, body, authorId, tag, category, subcategory, isPublished, isDeleted })
        return res.status(201).send({ status: true, data: "succesfully created data", data })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


// get Blog
const getBlogs = async function (req, res) {
    try {
        const data = await blogModel.find({ $and: [{ isDeleted: false }, { isPublished: true }] })
        if (!data) {
            return res.status(404).send({ status: false, msg: "no data found!" })
        }
        else if (data) {
            const query = req.query
            let datas = await blogModel.find(query)
            if (!datas) {
                return res.status(404).send({ status: false, msg: "not found" })
            }
            return res.status(200).send({ status: true, data: datas })
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

// update blog
const updateBlogs = async function (req, res) {
    try {
        const blogId = req.params.blogId
        const blogDetails = await blogModel.findById(blogId)
        if (blogDetails._id != blogId) {
            return res.status(404).send({ status: false, msg: "blogDetails not found" })
        }
        if (blogDetails.isDeleted == true) {
            return res.status(404).send({ status: false, msg: "blog details is deleted" })
        }
        const updateData = await blogModel.findByIdAndUpdate(
            { _id: blogId },
            {
                $set: {
                    title: req.body.title,
                    body: req.body.body,
                    isPublished: req.body.isPublished,

                },
                $push: {
                    tag: req.body.tag,
                    subcategory: req.body.subcategory,
                },

            },
            { new: true, upsert: true }
        )
        if (updateData.isPublished == true) {
            updateData.publishedAt = new Date();
        }
        if (updateData.isPublished == false) {
            updateData.publishedAt = null;
        }
        return res.status(200).send({ status: true, msg: "data succesfully created", data: updateData })
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: "internal server error", error })
    }
}

//delete blogs
const deleteBlogs = async function (req, res) {
    try {
        const blogId = req.params.blogId
        const blogDetails = await blogModel.find()
        if (blogDetails._id != blogId) {
            return res.status(404).send({ status: false, msg: "blogDetail is not present" })
        }
        if (blogDetails.isDeleted == true) {
            return res.status(404).send({ status: false, msg: "blogDetails is already deleted" })
        }
        const deleteData = await blogModel.updateOne({ _id: blogId }, { $set: { isDeleted: true } }, { new: true })
        return res.status(200).send({ status: true, msg: "data deleted succesfully", data: deleteData })
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: "internal server error", })
    }
}




module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.updateBlogs = updateBlogs
module.exports.deleteBlogs = deleteBlogs