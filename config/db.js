const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/CRUD', {useNewUrlParser: true, useUnifiedTopology: true },
(err,result)=>{
  if(err){
    console.log("db err",err);
  }
  else{
    console.log("db connection");
  }
})
