var bodyParser=require('body-parser')

const express = require('express')
const authRoute=express.Router()
const User=require('../models/user-schema')
const bycrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
var jsonParser=bodyParser.json()





authRoute.post('/signup',jsonParser,(req,res)=>{
  console.log('  SignUp :'+JSON.stringify(req.body));

 bycrypt.hash(req.body.password,10).then(hash=>{
  const user = new User({
    email:req.body.email,
    password:hash
 })
 console.log("hase"+hash);

user.save().then(createdUser=> {
  res.status(201).json({
    message:"user created",
    user:createdUser
  })
 }).catch(err=>{
   res.status(500).json({
     error: err
   })
 })

 })




  })




  authRoute.post('/login',jsonParser,(req,res)=>{
    console.log(' login :'+JSON.stringify(req.body));
    User.findOne({email:req.body.email}).then(user=>{
      console.log("User Found"+JSON.stringify(user))
      if(!user){
        res.status(404).json({
          message:"User Deoe not exist"
       })
      }
      return user
    }).then(fetcheduser=>{
      console.log("User Found"+JSON.stringify(fetcheduser))
      bycrypt.compare(req.body.password,fetcheduser.password).then(passMatch =>{
        if(passMatch){
          let token=jwt.sign({email:req.body.email, userId:fetcheduser._id},'mu_secret',{expiresIn:'1h'})
          res.status(200).json({
            message:"login succesfully",
            token:token,
            expiresIn:3600,
            userId:fetcheduser._id
         })

        }
        res.status(403).json({
          message:"Invalid username/password"
       })
      })

    })


  })







module.exports=authRoute
