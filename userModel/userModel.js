const user=require('./userSchema')
const bcrypt=require('bcrypt')
const NotFoundError=require('../errors/NotFoundError')
const UnauthorizedError=require('../errors/UnauthorizedError')
async function createUser(email,password){
    const hashed=await bcrypt.hash(password,10);
    return await user.create({email,password:hashed});
}
async function login(email,password){
        const userdoc=await user.findOne({email:email});
        if(!userdoc) throw new NotFoundError("User Not Found");
        const result=await bcrypt.compare(password,userdoc.password);
        if(!result) throw new UnauthorizedError("Password wrong");
        return userdoc;
        
}
module.exports={createUser,login};