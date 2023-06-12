const authorModel= require('../models/authorModel')
const blogModel = require('../models/blogModel')
const {isValid} = require('../validators/validation')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const  {Sceret_key} = process.env


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
  
// ******************************************************************************* //

const loginAuthor= async (req, res) => {
  try{
  let data = req.body
  if(!data.email ||!data.password) 
  return res.status(400).send({
  status :false, message : "email & password must be needed"})

  let authorEmail= data.email
  let password= data.password
  
    if(!isValid(password)){
      return  res.status(400).send({status:false , message : "Password should be valid"})
    }

  // Email validation
if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(authorEmail)){
  return  res.status(400).send({status:false , message : "Email should be valid email address"})
}
 
  let author= await authorModel.findOne({
  email: authorEmail, password: password
  })
 
  if(author==null) return res.status(401).json({
  status: false, message: "author doesn't exists"
  })
 
  //login successful than generating token
  let token= jwt.sign(
  {
  authorId: author._id.toString(),

  },
  Sceret_key
  )
 
  res.setHeader("x-api-key", token)
  res.status(200).json({status: true, data: {token : token}})
 }catch (err) {
res.status(500).send({
status : false, message : err.message})
}
 }

  
module.exports= {
    createAuthor ,
    loginAuthor
    }