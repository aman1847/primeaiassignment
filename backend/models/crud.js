const mongoose=require('mongoose')
const scm=mongoose.Schema({
    clientname:String,
    phonenumber:String,
    address:String,
})
const md=mongoose.model("data",scm)
module.exports=md;
