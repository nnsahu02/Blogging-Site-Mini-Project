const blogModel = require('../models/blogsModel')
const authorModel = require('../models/authorModel')
const {isValidObjectId} = require('mongoose')

const createBlog = async function(req ,res) {
    const {title , body , authorId ,tag , category ,subcategory  } = req.body
    try{
    if(!title || !body ||!authorId ||!category) {
        res.status(400).send({msg : "all fields are required", error})
    }
    if(!isValidObjectId(authorId)) {
        res.status(400).send({msg : "invalid authorid in validation"})
    }
    const authorDetail = await authorModel.findById(authorId)
    if(authorDetail != authorId) {
        res.status(400).send({msg : "invalid authorid"})
    }
    const data = await blogModel.create({title ,body , authorId , tag , category , subcategory })
    res.status(201).send({msg : "succesfully created data" , data})
}
catch(error) {
    res.status(500).send({msg : "internal server error" , error})
}
}

module.exports.createBlog = createBlog