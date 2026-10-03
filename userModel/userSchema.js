const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    email:{type:String,required:[true,"email is required"]},
    password:{type:String,required:[true,"Password is required"]}
});
const user=mongoose.model('user',userSchema);

module.exports=user;