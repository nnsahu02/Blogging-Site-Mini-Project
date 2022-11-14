const blogModel = require('../models/blogsModel')
const authorModel = require('../models/authorModel')
const { isValidObjectId } = require('mongoose')
const { get } = require('lodash')


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
        const data = await blogModel.find({ isDeleted: false, isPublished: true })
        if (!data) {
            return res.status(404).send({ status: false, msg: "no data found!" })
        }
        const query = req.query
        let datas = await blogModel.find(query)
        if (!datas) {
            return res.status(404).send({ status: false, msg: "not found" })
        } res.status(200).send({ status: true, data: datas })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs