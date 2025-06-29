
const {validationResult, cookie} = require('express-validator');
const captainservices=require('../services/captain_servies');
const captainmodule=require('../db/models/captain.module');
const blacklisttoken=require('../db/models/blacklisttoken');

module.exports.registerCaptain = async (req, res, next) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
        return;
    }
    const{fullname,email,password,vehicle}=req.body;
    const{color,plate,capacity,vehicleType}=vehicle;
    
    const hashPassword=await captainmodule.hashPassword(password);
    const captainalreadyexist=await captainmodule.findOne({email});
    if(captainalreadyexist){
        res.status(409).json({message:'Captain already exist'});
        return;
    }
    
    const captain=await captainservices.createcaptain(
        fullname,
        email,
        hashPassword,
        color,
        plate,
        capacity,
        vehicleType
    
    )
    const token=captain.generateAuthToken();
    res.status(201).json({token,captain});
}
module.exports.logincaptain=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    const{email,password}=req.body;
    
const captain=await captainmodule.findOne({email}).select('+password');
if(!captain){
    res.status(401).json({message:'invalid email or password'})
    return;
}
  const today = new Date().toISOString().split('T')[0];

const match=await captain.comparePassword(password);
// if(!match){
    
//     res.status(401).json({message:'invalid password'})
//     return;
// }
await  captainmodule.updateOne(
    {
      email: email,
      $expr: {
        $ne: [
          {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$date",
              timezone: "Asia/Kolkata"
            }
          },
          today
        ]
      }
    },
    { $set: { onlineTime: 0 , date:Date.now()} }
  );
const token=captain.generateAuthToken();
res.cookie('token',token);
return res.status(200).json({token,captain});

}
module.exports.captainProfile=async(req,res,next)=>{
    try{
    res.status(200).json({captain:req.captain});
    }catch(err){
        res.status(500).json({message:'Internal server error'});
    }
}
module.exports.logout=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization.split(' ')[1];
    res.clearCookie('token');
    await blacklisttoken.create({token});
    res.status(200).json({message:'Logged out successfully'});
}
module.exports.setTimings=async(req,res)=>{
    const error=validationResult(req)
    if(!error.isEmpty()){
        
        return res.status(400).json({error:error.array()})
    }
    try{
        const {captain_id}=req.body
        
            const response=await captainservices.setTimings(captain_id)
            if(response){
                return res.status(200).json({response:response})
            }
    }catch(err){
        return res.status(500).json({err:err.message})
    }
}
