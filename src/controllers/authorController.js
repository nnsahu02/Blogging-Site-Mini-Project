const authorModel = require('../models/authorModel')

//Create Author
const createAuthor = async function (req, res) {
    const { fname, lname, title, email, password } = req.body
    try {
        if (!fname || !lname || !title || !email || !password) {
            return res.status(400).send({ status: false, msg: "all field is required" })
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

module.exports.createAuthor = createAuthor