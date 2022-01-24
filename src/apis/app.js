const express = require('express')
const mongoose =require('mongoose')


const exApp = express()
// const Student = require('./models/student-schema')

const stdRoute=require('./routes/student')
const authRoute=require('./routes/auth')



// mongoose
// .connect(process.env.MONGO_URI, {
// useUnifiedTopology: true,
// useNewUrlParser: true,
// })
// .then(() => console.log('DB Connected!'))
// .catch(err => {
//   console.log("Connection failed");
// });


exApp.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin',"*")
  res.setHeader("Access-Control-Allow-Headers",
  "Origin , X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods",
  "GET,POST,PATCH,PUT,DELETE,OPTIONS"
  );

  next();
})


const url= "mongodb+srv://jenish1212:tyhv726N87x-XM4@mean-cluster.ilspd.mongodb.net/marwadi?retryWrites=true&w=majority"
//{ useNewUrlParser: true ,useUnifiedTopology: true,}

mongoose.connect(url)
.then(()=>{
  console.log("connected to database!");
})
.catch(()=>{
  console.log("Connection failed");
});


exApp.use('/api',stdRoute)
exApp.use('/auth',authRoute)
module.exports=exApp
