const authorModel = require('../models/authorModel')
const jwt = require('jsonwebtoken')


const isValid = function(value){
    if(typeof value == 'undefined' || value == 'null') 
    return false
    if(typeof value == 'string' && value.trim().length == 1 ) 
    return true
}

//Create Author
const createAuthor = async function (req, res) {
    const { fname, lname, title, email, password } = req.body
    try {
        if (!fname || !lname || !title || !email || !password) {
            return res.status(400).send({ status: false, msg: "all field is required" })
        }
        // making mail unique
        const CheckMail = await authorModel.findOne({email : email})
        if(CheckMail){
            return res.status(400).send({status : false, msg : "mail is already exist."})
        }
        // enum validating
        const enumTitle = ["Mr", "Mrs", "Miss"]
        if(!enumTitle.includes(title)){
            return res.status(400).send({status : false, msg : "Please yr esa mat karo  'Mr','Mrs','Miss' he do ! ",})
        }
        //
        if(!isValid(fname)){
            return res.status(400).send({status : false, msg : "Ye v koi Nam hota hai !"})
        }
        else {
            const data = await authorModel.create({ fname, lname, title, email, password })
            return res.status(201).send({ status: true, data: "data created succesfully", data })
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

// login author
const loginAuthor = async function (req, res) {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).send({ status: false, msg: "mail id or password is required" })
        }
        const authorData = await authorModel.findOne({ email: email, password: password })
        if (!authorData) {
            return res.status(404).send({ status: false, msg: "data not found" })
        }
        const token = jwt.sign({ authorId: authorData._id.toString()}, "projectsecretcode")
        return res.status(200).send({ status: true, msg: "succesfull logged in", token })
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.createAuthor = createAuthor
module.exports.loginAuthor = loginAuthor