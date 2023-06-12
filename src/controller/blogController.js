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
            return res.status(404).send({status : false , message : "Author does not exist"})
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
  
// ******************************************************************************* //

const getAllBlogs = async (req, res) => {
  try {
    const { authorId, category, tags, subcategory } = req.query;
    const filters = { isDeleted: false, isPublished: true };

  if (authorId) {
  const isValidId = mongoose.isValidObjectId(authorId);
  if (!isValidId) {
  return res.status(400).json({ 
  status: false, message: "Invalid authorId"});
  }
  
  filters.authorId = authorId;
  }

    if (category) {
      filters.category = category;
    }

    if (tags) {
  filters.tags =  {$in:  tags.split(",") };
  }
   
  if (subcategory) {
  filters.subcategory = { $in: subcategory.split(",") };
  }

  const blogs = await blogModel.find(filters);
  // if with that filter we didn't get any 
  //doucment in find query we get an empty array
  if (blogs.length === 0) {
  return res.status(404).json({ 
  status: false, message: "No blogs found" });
  }

    res.status(200).json({
  status: true, message: "Blogs list", data: blogs });
  } catch (error) {
    res.status(500).json({
  status: false, message: error.message });
  }
};


// ******************************************************************************* //

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
console.log(req.body)
    if(Object.keys(req.body).length == 0){
    return   res.status(400).send({status : false, message : "plz give data for updation"})
    }

    // Check if the blogId is valid
    const isValidId = mongoose.isValidObjectId(blogId);
    if (!isValidId) {
      return res.status(400).json({
  status: false, message: "Invalid blogId" });
  }

    // Check if the blog exists and is not deleted
    const blog = await blogModel.findOne({ _id: blogId, isDeleted: false , deletedAt : null });

    if (!blog) {
      return res.status(404).json({
        status: false,
        message: "Blog not found",
      });
    }

    // checking the decoded token's authorId and blog's authorId is same or not
    //:- checking authorization
    if (req["x-api-key"].authorId != blog.authorId.toString())
      return res.status(401).send({
        status: false,
        message: "unauthorized",
      });

    let { title, body, tags, subcategory } = req.body;

    //updating all fields based on conditions
    blog.title = title || blog.title;
    blog.body = body || blog.body;
    
    if(typeof blog.title !=="string" || typeof blog.body !=="string"){
      return res.status(400).send({status : false , message : "mention correct format of the field"})
    }
    
    if (!tags) {
      tags = [];
    }

    if (typeof tags !== "object") {
      tags = [tags];
    }

    if (tags && tags.length > 0) {
      tags.forEach((tag) => {
        if (!blog.tags.includes(tag)) {
          blog.tags.push(tag);
        }
      });
    }
    if (!subcategory) {
      subcategory = [];
    }

    if (typeof subcategory !== "object") {
      subcategory = [subcategory];
    }

    if (subcategory && subcategory.length > 0) {
      subcategory.forEach((subcategories) => {
        if (!blog.subcategory.includes(subcategories)) {
          blog.subcategory.push(subcategories);
        }
      });
    }

    blog.isPublished = true;
    blog.publishedAt = new Date();

    const updatedBlog = await blog.save();
    res.status(200).json({
      status: true,
      message: "Blog updated",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ******************************************************************************* //

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;

    // Check if the blogId is valid
    const isValidId = mongoose.isValidObjectId(blogId);
    if (!isValidId) {
      return res.status(400).json({
        status: false,
        message: "Invalid blogId",
      });
    }
    const loginAuthor = req["x-api-key"].authorId;

    // Check if the blogId exists and is not deleted
    const blog = await blogModel.findOne({ _id: blogId, isDeleted: false , deletedAt : null });

    if (!blog) {
      return res.status(404).json({
        status: false,
        message: "Blog not found",
      });
    }

    // checking rights of author  for deletion
    if (blog.authorId.toString() != req["x-api-key"].authorId)
      return res.status(401).send({
        status: false,
        message: "unauthorized",
      });

    blog.isDeleted = true;
    blog.deletedAt = new Date();

    const deleted = await blog.save();
    res.status(200).json({
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


// ******************************************************************************* //

const deleteBlogsByQuery = async (req, res) => {
  try {
    const { authorId, category, tags, subcategory, isPublished } = req.query;

    // Check if no any query parameters are provided
    if (Object.keys(req.query).length === 0) {
      return res.status(400).json({
        status: false,
        message: "No search parameters provided",
      });
    }

    const filters = { isDeleted: false , deletedAt : null };

    // Apply filters based on the query parameters
    if (category) {
      filters.category = category;
    }

    if (authorId) {
      const isValidId = mongoose.isValidObjectId(authorId);
      if (!isValidId) {
        return res.status(400).json({
          status: false,
          message: "Invalid authorId",
        });
      }

      if (authorId != req["x-api-key"].authorId)
        return res.status(401).send({
          status: false,
          message: "unauthorized",
        });

      filters.authorId = authorId;
    }

    if (!authorId) {
      filters.authorId = req["x-api-key"].authorId;
    }

    if (tags) {
      filters.tags = { $in: tags.split(",") };
    }

    if (subcategory) {
      filters.subcategory = { $in: subcategory.split(",") };
    }

    if (isPublished) {
      filters.isPublished = isPublished;
    }

    const blogDeleted = await blogModel.updateMany(filters, {
      $set: { isDeleted: true, deletedAt: new Date() },
    });
    if (blogDeleted.modifiedCount === 0) {
      return res
        .status(404)
        .send({ status: false, message: "no such blog exists" });
    }
    console.log(blogDeleted);
    res.status(200).json({
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
  
module.exports = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  deleteBlogsByQuery,
};
