const mongoose=require('mongoose')
const scm=mongoose.Schema({
    name:String,
    email:String,
    password:String,
})
const md=mongoose.model("student",scm)
module.exports=md;
