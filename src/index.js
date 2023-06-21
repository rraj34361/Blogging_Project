const express = require('express')
const {default : mongoose} = require('mongoose')
const dotenv = require('dotenv')
const routes = require('./routes/route')
const app = express()

//  for accessing enviornment variables
dotenv.config()
const {string, PORT} = process.env

app.use(express.json())

/* This code is establishing a connection with a MongoDB database using Mongoose. */
mongoose.connect(string, {
    useNewUrlparser : true
})
.then(()=>{
    console.log("connected to mongodb")
})
.catch((err)=>{
console.log(err.message)
})




app.use('/', routes)


app.listen(PORT, () => console.log(`app listening on port ${PORT}!`))


PORT = 3000
string = "mongodb+srv://rraj34361:bXgwmkpBz9CHdAfr@cluster0.brjrlou.mongodb.net/Blogging-project"
Sceret_key = "yek_terect_ivar" 