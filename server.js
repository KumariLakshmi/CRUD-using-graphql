const express=require("express");
const graphqlHTTP=require("express-graphql").graphqlHTTP
const dotenv=require('dotenv')
const app=express();
dotenv.config();
const schema=require('./graphqlSchema/userSchema')
const db=require('./config/db')
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.get('/test',(req,res)=>{
    res.send("working!!!");
})

app.listen(process.env.PORT,()=>console.log(`port is running succesfully ${process.env.PORT}`))