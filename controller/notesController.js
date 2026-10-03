const ValidationError=require('../errors/ValidationError')
const notes=require('../userModel/notesModel')

async function createNotes(req,res,next){
    try{
        const title=req.body.title
        if(!title) throw new ValidationError("title is required");
        const content=req.body.content
       // if(!content) throw new ValidationError("Content is required");
        const note=await notes.createNotes(title,content,req.user.userId)
        res.status(201).json(note)
    }catch(err){
        next(err);
    }
}
async function getAllNotes(req,res,next){
    try{
        const id=req.user.userId
        const page=Number(req.query.page) || 1;
        const limit=Number(req.query.limit) || 10
        const search=req.query.search
        const sort=req.query.sort ||'createdAt';
        const note=await notes.getAllNotes(id,page,limit,search,sort);
        res.json(note);
    }
    catch(err){
        next(err);
    }
}
module.exports={createNotes,getAllNotes};