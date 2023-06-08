const authorModel = require('../models/authorModel')

const isValid = function(value){
  if(typeof value === "undefined"|| value === null) return false
  if(typeof value === "string" && value.trim().length === 0) return false
  return true
}   

    
const authorValidation = async (req, res, next) => {
    let { fname, lname, title, email, password } = req.body;
  
    if(!isValid(fname) ||!isValid(lname) ||!isValid(title) ||!isValid(email) ||!isValid(password)){
     return  res.status(400).send({status:false , message : "all fields are required"})
    }
  
  if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)){
    return  res.status(400).send({status:false , message : "Email should be valid email address"})
  }
  
  const author = await authorModel.findOne({email : email});
  console.log(author)
  if(author) {
    return  res.status(400).send({status:false , message : "Email already registered"})
  }
    
    if (password.length < 6 || password.length > 15) {
      return res.status(400).json({   status: false, message: "Please provide strong password" });
    }
  
    
      // All validation checks passed
  next();
  };




  module.exports = { authorValidation  ,isValid};



