const authorModel= require('../models/authorModel')
const blogModel = require('../models/blogModel')
const {isValid} = require('../validators/validation')

// Create a new author
const createAuthor = async (req, res) => {
    try {
    let { fname, lname, title, email, password } = req.body;
  
       title =  title.trim()
     const vab = ['Mr', 'Mrs', 'Miss']
    if(!vab.includes(title)) return res.status(400).send({status : false , message : "Please provide valid title from these :-'Mr', 'Mrs', 'Miss'"})
  
    email = email.toLowerCase()
       
  
  
    const author = new authorModel({
    fname,
    lname,
    title,
    email,
    password
    });
  
    const createdAuthor = await author.save();
    res.status(201).json({status : true, message : "author created" , data : createdAuthor});
    } catch (error) {
    res.status(500).json({ 
    status: false, message: error.message })
    }
  };
  
module.exports= {
    createAuthor 
    }