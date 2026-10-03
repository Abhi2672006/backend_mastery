require('dotenv').config()
const user=require('../userModel/userModel')
const NotFoundError=require('../errors/NotFoundError')
const ValidationError=require('../errors/ValidationError')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

async function register(req,res,next){
    try{
         console.log('1. Incoming Payload:', req.body);

        const email=req.body?.email;
        const password=req.body?.password;
        if(!email) throw new ValidationError("Email is required")
        if(!password) throw new ValidationError("Password is required");
        const users=await user.createUser(email,password);
        res.status(201).json(users);
    }catch(err){
        next(err);
    }
};
async function login(req,res,next){
    try{
        const email=req.body?.email;
        const password=req.body?.password;
        if(!email) throw new ValidationError("Email is required")
        if(!password) throw new ValidationError("Password is required");
        const userdoc=await user.login(email,password);
        const token=jwt.sign({ userId: userdoc._id },process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(200).json({ message: "Login successful",Token:token});
    }catch(err){
        next(err);
    }
}
module.exports={register,login};