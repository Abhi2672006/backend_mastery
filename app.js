require('dotenv').config();
const express=require('express')

const app=express();

const user=require('./routes/userRoutes')
const connectDB=require('./config/db')
app.use(express.json());

connectDB();


app.use('/auth',user);
const noteRoutes = require('./routes/notesRoutes');

app.use('/notes', noteRoutes);


app.use((req,res,next)=>{
    res.status(404).json("Not Found");
})
app.use((err,req,res,next)=>{
    let status=err.statusCode || 500;
    if(err.name=="ValidationError"){
        status=400;
        if(err.errors){
            const message=Object.values(err.errors).map(e=>e.message);
            return res.status(status).json({error:message});
        }
    }
    
    if(err.name==="JsonWebTokenError" || err.name==="TokenExpiredError"){
        status=401;
    }
    res.status(status).json({error:err.message});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));