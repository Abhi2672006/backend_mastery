const jwt=require('jsonwebtoken')
require('dotenv').config();
const UnauthorizedError=require('../errors/UnauthorizedError')
function auth(req,res,next){
    try{
        const authorization=req.headers.authorization;
        const token=authorization?.split(' ')[1];
        if (!token) throw new UnauthorizedError("No token provided");
        const result=jwt.verify(token,process.env.JWT_SECRET);
        req.user=result;
        next();
    }
    catch(err){
        next(err);
    }

}


module.exports={auth};