const express = require('express')
const router = express.Router()
const authorController = require("../controllers/authorController")
const mailValidation = require("../middleware/mailValidation")


router.post("/authors", mailValidation.validateEmail, authorController.createAuthor)


module.exports = router


