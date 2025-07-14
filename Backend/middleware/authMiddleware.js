const jwt =require('jsonwebtoken')
const User=require('../models/user.js')
const JWT_SECRET = process.env.JWT_SECRET 

const authenticateToken=async (req,res,next)=>{
    // console.log("header array",req.headers)
    const authHeader=req.headers['authorization'];
    // console.log("header",authHeader)
    const token =authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).json({message:'Access denied .No token provided'})
     
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        req.user=decoded;// optinally attach user info
        const userExit=await User.findOne({email:decoded.email});

        if(!userExit){
            return res.status(400).json({
                success:false,
                message:"User not exist"
            })
        }
        next();
    } 
    catch(err){
        return res.status(403).json({message:'Invalid or expired token.'});
    }  
}

module.exports=authenticateToken;