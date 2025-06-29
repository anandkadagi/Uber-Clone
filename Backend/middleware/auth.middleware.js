const usermodel = require('../db/models/user_module');
const jwt = require('jsonwebtoken');
const captainmodule = require('../db/models/captain.module');

const blacklisttokenmodule = require('../db/models/blacklisttoken');

module.exports.authUser = async (req, res, next) => {
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }
    const blacklisttoken=await blacklisttokenmodule.findOne({token});
    if(blacklisttoken){
        res.status(401).json({message:'Unauthorized'});
        return;
    }
    try{
        
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        
        const user=await usermodel.findById(decoded._id);
        req.user=user;
        return next();
    }catch(err){
        return res.status(401).json({message:'Unauthorized'});
    }
}
module.exports.authCaptain=async(req,res,next)=>{
const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
if(!token){
    res.status(401).json({message:'Unauthorized'});
}
const blacklisttoken=await blacklisttokenmodule.findOne({token});
if(blacklisttoken){
    res.status(401).json({message:'Unauthorized'});
}
try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const captain=await captainmodule.findById(decoded._id)
    req.captain=captain;
    return next();
}
catch(err){
    res.status(401).json({message:'Unauthorized'});
}
}