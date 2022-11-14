const blogModel = require('../models/blogsModel')
const authorModel = require('../models/authorModel')
const { isValidObjectId } = require('mongoose')
const { get } = require('lodash')


//create Blog
const createBlog = async function (req, res) {
    const { title, body, authorId, tag, category, subcategory } = req.body
    try {
        if (!title || !body || !authorId || !category) {
            res.status(400).send({ msg: "all fields are required" })
        }
        if (!isValidObjectId(authorId)) {
            res.status(400).send({ msg: "invalid authorid in validation" })
        }
        const authorDetail = await authorModel.findById(authorId)
        if (authorDetail._id != authorId) {
            res.status(400).send({ msg: "invalid authorid" })
        }
        const data = await blogModel.create({ title, body, authorId, tag, category, subcategory })
        res.status(201).send({ msg: "succesfully created data", data })
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}


// get Blog
const getBlogs = async function (req, res) {
    try {
        const data = await blogModel.find({ isDeleted: false, isPublished: true })
        if (!data) {
            res.status(404).send({ msg: "no data found!" })
        }
        const query = req.query
        let datas = await blogModel.find(query)
        if (!datas) {
            res.status(404).send("not found")
        } res.status(200).send({ msg: datas })
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}



module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs