const express = require('express')
const router = express.Router()
const authorController = require("../controllers/authorController")
const mailValidation = require("../middleware/mailValidation")
const blogController = require('../controllers/blogController')


router.post("/authors", mailValidation.validateEmail, authorController.createAuthor)
router.post('/blogs' , blogController.createBlog)


module.exports = router


