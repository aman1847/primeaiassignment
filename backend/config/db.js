const mongoose=require("mongoose")


const connectdb=async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/primetrade');
        console.log("Mongodb connection Successfully")
    }
    catch(e){
        console.log(e.message)
    }
}
module.exports=connectdb