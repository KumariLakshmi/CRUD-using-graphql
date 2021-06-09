const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    userName:{type:String, required:true},
    emailId:{type:String, required:true},
    mobile:{type:Number, required:true},
    age:{type:Number, required:true}
})

module.exports=mongoose.model('user',userSchema)