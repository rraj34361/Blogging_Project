
const authorModel= require('../models/authorModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const  {Sceret_key} = process.env

    const authMiddleware =  (req, res, next) => {
  try {
  const token = req.headers["x-api-key"];
  if (!token) {
  return res.status(401).json({status : false, message: "Access denied. Token missing." });
  }

  
  jwt.verify(token, Sceret_key, async function(err, decoded){
    if (err) {
            return res.status(403).send({ status: false, message: "Invalid Token" });
        }
        else {       
  const authorId = await authorModel.findById(decoded.authorId)
  if(!authorId) return res.status(401)
  .json({status: false, message: "author not login"})

  req["x-api-key"] = decoded
  next();

  }});

  } catch (error) {
  res.status(500).json({status : false, error: error.message });
  }
};


module.exports = {authMiddleware}
