const express=require("express");
const router=express.Router();
const blogController = require("../controller/blogController");
const authorController=require('../controller/authorController');
const middleware= require('../middleware/auth')
const validation = require('../validators/validation')




router.post('/authors',validation.authorValidation, authorController.createAuthor)
router.post('/login', authorController.loginAuthor)

router.post("/blogs", middleware.authMiddleware, blogController.createBlog)
router.get("/blogs", middleware.authMiddleware, blogController.getAllBlogs)  

router.put("/blogs/:blogId", middleware.authMiddleware, blogController.updateBlog)
router.delete("/blogs/:blogId", middleware.authMiddleware, blogController.deleteBlog)
router.delete("/blogs", middleware.authMiddleware, blogController.deleteBlogsByQuery)


module.exports=router;