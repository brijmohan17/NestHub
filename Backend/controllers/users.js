const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require('../models/user')

const JWT_SECRET=process.env.JWT_SECRET || '$N&B&LAV&jdhgj&vvcdsgv12'

module.exports.signup=async (req,res)=>{
    try{
        const {username,email,password}=req.body;

        if(!username||!email||!password){
            return res.status(400).json({message:"All fields are required"});
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(409).json({message:'Email already in use'});
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const user=new User({username,email,password:hashedPassword});
        await user.save();
        const token=jwt.sign({id:user._id,email:user.email,username:user.username},
        JWT_SECRET,{expiresIn:'5h'})

        return res.status(201).json({message:'Signup Successful',
            token,
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
            }
        });
    }catch(err){
        console.error('Signup error',err)
        return res.status(500).json({message:'Server error'})
    }
}

module.exports.login=async (req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email||!password){
            return res.status(400).json({message:"Email and password are required"})
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }

        const token=jwt.sign(
            {id:user._id,email:user.email,username:user.username},
            JWT_SECRET,
            {expiresIn:'5h'}
        );

        return res.status(200).json({
            message:'Login successful',
            token,
            user:{id:user._id,username:user.username,email:user.email}
        });
    }catch(err){
        console.error('Login error',err);
        return res.status(500).json({message:'Server error'})
    }
}

module.exports.logout=(req,res,next)=>{
 const expiredSoonToken = jwt.sign(
        { message: 'loggedOut' }, // Dummy payload
        process.env.JWT_SECRET,
        { expiresIn: '10s' }
    );

    res.status(200).json({
        message: 'Logout simulated. Temporary token issued that will expire in 10 seconds.',
        token: expiredSoonToken
    });   
}