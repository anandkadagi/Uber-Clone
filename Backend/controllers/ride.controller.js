const rideservice=require('../services/ride.service')
const { validationResult } = require('express-validator');
const mapsService=require('../services/maps.service')
const rideModel=require('../db/models/ride.module')
const socket=require('../socket')
module.exports.createRide=async(req,res)=>{
    const error=validationResult(req)
    console.log("hii")
    if(!error.isEmpty()){
        
        return res.status(500).json({error:error.array()})
    }
    try{
    const {pickup,destination,vehicleType}=req.body;
    
    if( !pickup || !destination || !vehicleType){
        
        return res.status(400).json({message:"All fields required"})
    }
    
    const response=await rideservice.createRide({userId:req.user._id,pickup,destination,vehicleType})
    
    if(response){
        
         response.otp="";
        const userLocation=await mapsService.getLatLongFromAddress(pickup);
       
        const captains=await rideservice.getCaptainInRadius(userLocation.longitude,userLocation.latitude,5)
        
        const ride=await rideModel.findOne({_id:response._id}).populate('user')
        
        captains.map(captain=>{
            socket.sendMessage(captain.socketId,{
                event:'start-ride',
                data:ride
            })
        })
        return res.status(200).json({response:response})
    }else{
        return res.status(400).json({message:"Data not inserted"})
    }
    
}catch(error){
    return res.status(500).json({error:error.message})
}
}
module.exports.getFair=async(req,res)=>{
    const error=validationResult(req)
    if(!error.isEmpty()){
        
        return res.status(500).json({error:error.array()})
    }
    try{
        
        const {pick,drop}=req.body
        
        if(!pick || !drop){
            return res.status(400).json({message:"All fields required"})
        }
        
        const response=await rideservice.getFair(pick,drop)
        
    if(response){
        return res.status(200).json({response})
    }else{
        return res.status(400).json({message:"Error occured"})
    }
    }catch(error){
            return res.status(500).json({error:error.message})
    }
}
module.exports.comfirmRide=async(req,res)=>{
    try{
    const {ride,captain_id}=req.body;
    const response=await rideservice.confirmRide(ride._id,captain_id)
    if(response){
        socket.sendMessage(response.user.socketId,{
            event:'send_confirm_ride',
            data:response
        })
        return res.status(200).json({response})
    }
    }catch(error){
        return res.status(500).json({error:error.message})
    }
}
module.exports.startRide=async(req,res)=>{
    try{
        const error=validationResult(req)
        if(!error.isEmpty()){
           return res.status(400).json({error:error.array()})
        }
        const{ride_id,otp,captain_id}=req.body;
        if(!ride_id || !otp || !captain_id){
            return res.status(400).json({error:"Provide All Details"})
        }
        const response=await rideservice.startRide(ride_id,otp,captain_id)
        if(response){
            socket.sendMessage(response.user.socketId,{
            event:'start_ride',
            data:response
        })
            return res.status(200).json({response})
        }
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}
module.exports.endRide=async(req,res)=>{
    try{
        
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    const {ride_id}=req.body;
    
    const response=await rideservice.endRide(ride_id,req.captain._id)
    
    if(response){
        socket.sendMessage(response.user.socketId,{
            event:'end_ride',
            data:response
        })
        return res.status(200).json({response})
    }
}catch(err){
    return res.status(400).json({error:err.message})
}
}
module.exports.getEarning=async(req,res)=>{
    try{
    const response=await rideservice.getEarning();
   
        return res.status(200).json({response})
    
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}
module.exports.setStatus=async(req,res)=>{
    try{
        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }
        const {captain_id,status}=req.body;
        const response=await rideservice.setStatus(captain_id,status)
        if(response){
            return res.status(200).json({response})
        }
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}