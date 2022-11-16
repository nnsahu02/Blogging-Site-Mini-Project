const jwt = require('jsonwebtoken')
const { isValidObjectId } = require('mongoose')
const blogsModel = require('../models/blogsModel')

const authenticateAuthor = async function (req, res, next) {
    const token = req.headers['x-api-key']
    try {
        if (!token) {
            return res.status(400).send({ status: false, msg: "token is required" })
        }
        const decodeToken = jwt.verify(token, 'projectsecretcode')
        if (!decodeToken) {
            return res.status(401).send({ status: false, msg: "token is not valid" })
        }
        else {
            req.token = decodeToken
            next()
        }
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}


// authorisation
const authoriseAuhtor = async function (req, res, next) {
    try {
        const blogId = req.params.blogId
        if (!isValidObjectId(blogId)) {
            return res.status(400).send({ status: false, msg: "invalid blogId" })
        }
        const blogData = await blogsModel.findById(blogId)
        if (!blogData) {
            return res.status(400).send({ status: false, msg: "Provide valid blogId" })
        }
        let authorId = blogData.authorId
        let authorIdFromDT = req.token.authorId
        if (authorId != authorIdFromDT) {
            return res.status(403).send({ status: false, msg: "access denied" })
        }
        next()
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}


const authoriseAuthorfrmQuery = async function(req,res,next){
    const queryData = req.query
    const queryDoc = await blogsModel.find(queryData)
    console.log(queryDoc)

    let authorId = queryDoc.authorId // why we not getting authorId

    if(authorId !== req.token.authorId){
        return res.status(400).send({status : false, msg : "access denied!!"})
    }else{
        next()
    }
}

module.exports.authenticateAuthor = authenticateAuthor
module.exports.authoriseAuhtor = authoriseAuhtor
module.exports.authoriseAuthorfrmQuery = authoriseAuthorfrmQuery