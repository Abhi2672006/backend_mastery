
const bcrypt=require('bcrypt')

async function test(){
    const hash=await bcrypt.hash('secret123',10);
    console.log("hash:",hash)

    const result1=await bcrypt.compare("secret123",hash)
    const result2=await bcrypt.compare("wrongpassword",hash)
    console.log("correct password check:",result1);
    console.log("Wrong password check:",result2);

    
}
test();