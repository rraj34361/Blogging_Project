const express=require("express");
const router=express.Router();
const blogController = require("../controller/blogController");
const authorController=require('../controller/authorController');

const validation = require('../validators/validation')




router.post('/authors',validation.authorValidation, authorController.createAuthor)




module.exports=router;