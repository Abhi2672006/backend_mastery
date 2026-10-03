const mongoose=require('mongoose')

const noteSchema=new mongoose.Schema({
    title:{type:String,required:[true,"Title is required"]},
    content:{type:String},
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true});

const notes=mongoose.model('notes',noteSchema);
module.exports=notes;