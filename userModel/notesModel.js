const notes=require('./notesSchema')

async function createNotes(title,content,userId){
    return await notes.create({title,content,author:userId});
}
async function getAllNotes(userId,page,limit,search,sort){
    const skip=(page-1)*limit;
    const filter={author:userId};
    if(search){
        filter.title={$regex:search,$options:'i'};

    }
    return await notes.find(filter).sort(sort).skip(skip).limit(limit);
}
module.exports={createNotes,getAllNotes};