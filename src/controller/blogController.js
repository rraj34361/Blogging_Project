const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");
const mongoose = require("mongoose");
const {isValid} = require('../validators/validation')

const createBlog = async (req, res) => {
    try {
    const data = req.body
      const {title , body , authorId , tags , category , subcategory,isPublished} = req.body
      
  
      if (!isValid(title)|| !isValid(body) || !isValid(category)){
        return res
          .status(400)
          .send({ status: false, message: "invalid mandatory fields" })};
  
          if(!mongoose.isValidObjectId(authorId)){
            return  res.status(400).send({ status: false, message: "invalid authorId" 
          })};
         
          const author = await authorModel.findById(authorId)
  
          if(!author){
            return res.status(400).send({status : false , message : "Author does not exist"})
          }
  
          
  
      data.authorId = req["x-api-key"].authorId;
      if(isPublished) {                     
        req.body.publishedAt = Date.now()
      }
  
      const createdBlog = await blogModel.create(data);
  
      res.status(201).json({
    status: true,message : "New Blog created", data: createdBlog });
    }catch (error) {
    res.status(500).json({ 
        status: false,
        message: error.message,
      });
    }
  };
  



  
module.exports = {
    createBlog,
  };