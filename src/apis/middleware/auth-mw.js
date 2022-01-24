const jwt=require('jsonwebtoken')
module.exports=(req,res,next)=>{
  try{
    let token=req.headers.authorization.split(" ")[1]
    const decodeToken=jwt.verify(token,'mu_secret')

    console.log("decodetoken:"+JSON.stringify(decodeToken));
     req.userData=decodeToken;
      next();
  }
  catch(error){
      res.status(401).json({
        message:"invalid token"
      })
  }
}
