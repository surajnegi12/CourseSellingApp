const jwt=require("jsonwebtoken");
const { jwtSceretUser} = require("../config");
function authMiddleware(req,res,next){
    const token=req.headers.token;
    const decodedInfo=jwt.verify(token,jwtSceretUser);
    if(decodedInfo){
        req.userId=decodedInfo.id;
        req.role=decodedInfo.role;
        next();
    }else{
        res.status(403).json({
            message:"you are not signed in......... "
           })
    }
    }
    
    module.exports={
        authMiddleware}