const mongoose = require('mongoose');

/*Document structure for storing the data in the DataBase*/ 

const authorSchema = new mongoose.Schema({
  fname: { 
    type: String,
     required: true,

    },
  lname: { 
    type: String,
     required: true,

    },
  title: { 
    type: String,
    enum: ['Mr', 'Mrs', 'Miss'],
    required: [true, "title should be given"]},
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    },

},{timestamps:true});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
