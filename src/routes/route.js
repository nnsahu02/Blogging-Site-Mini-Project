const express = require('express')
const router = express.Router()
const authorController = require("../controllers/authorController")
const mailValidation = require("../middleware/mailValidation")
const blogController = require('../controllers/blogController')

//creating Author
router.post("/authors", mailValidation.validateEmail, authorController.createAuthor)

//creating blogs
router.post('/blogs', blogController.createBlog)

//getting blogdata
router.get('/blogs', blogController.getBlogs)

//updating blogdata
router.put('/blogs/:blogId' , blogController.updateBlogs)

//deleting blogdata
router.delete('/blogs/:blogId' , blogController.deleteBlogs)

//deleting blogdata using query
router.delete('/blogs', blogController.deleteBlogsUsingQuery)


module.exports = router


