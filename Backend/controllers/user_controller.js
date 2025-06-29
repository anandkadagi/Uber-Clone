const userModel=require('../db/models/user_module');
userServices=require('../services/user_services');
const {validationResult}=require('express-validator');

const BlacklistToken=require('../db/models/blacklisttoken');
module.exports.registerUser=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
        
    }
    
    const {fullname,email,password}=req.body;
    const hashPassword=await userModel.hashPassword(password);
    const useralreadyexist=await userModel.findOne({email});
    if(useralreadyexist){
        res.status(409).json({message:'User already exist'});
        return;
    }
    const user=await userServices.CreateUser(fullname,email,hashPassword);
    const token=user.generateAuthToken();
    res.status(201).json({token,user});
}
module.exports.loginUser=async(req,res,next)=>{ 
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body;
    const user=await userModel.findOne({email}).select('+password');
   if(!user){
    return res.status(401).json({message:'Invalid Email or Password'});
    
   }
   const match=await user.comparePassword(password);
   if(!match){
    return res.status(401).json({message:'Invalid Email or Password'});
   }
   const token=user.generateAuthToken();
   res.cookie('token',token,{ secure: false})
   
   return res.status(200).json({token,user});
}
module.exports.userProfile=async(req,res,next)=>{
    try{
    res.status(200).json({user:req.user});
    }catch(err){
        res.status(500).json({message:'Internal server error'});
    }
}
module.exports.logout=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization.split(' ')[1];
    res.clearCookie('token');
    
    await BlacklistToken.create({token});
    res.status(200).json({message:'Logged out successfully'});
}   
