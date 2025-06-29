const rideModel=require('../db/models/ride.module')
const mapServices=require('../services/maps.service')
const captainModel=require('../db/models/captain.module')
const crypto=require('crypto')
const{ DateTime }=require('luxon'); 
function getOtp(num){
    const otp=crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
    return otp;
}
async function getDistance(pickup,destination){
    if(!pickup || !destination){
        
        throw new Error("All feilds required")
    }
    try{
        const response=await mapServices.getDistanceBetweenLocations(pickup,destination)
        
        const distance = parseFloat(((response.distance).split(" ")[0]).replace(/,/g, ''));
        return distance;
    }catch(err){
      throw new Error(err.message)
    }
}
async function Calcfair(pickup,destination){
    if(!pickup || !destination){
        
        throw new Error("All feilds required")
    }
    try{
       
        const response=await mapServices.getDistanceBetweenLocations(pickup,destination)
       
        const distance = parseFloat(((response.distance).split(" ")[0]).replace(/,/g, ''));
        
const duration = response.duration;

let totalMinutes = 0;

if (typeof duration === 'string') {
  let match;

   match = duration.match(/(?:(\d+)\s*days?)?\s*(?:(\d+)\s*hours?)?\s*(?:(\d+)\s*mins?)?/i);

  if (!match) throw new Error("Invalid duration format");

  const days = parseInt(match[1] || '0', 10);
  const hours = parseInt(match[2] || '0', 10);
  const minutes = parseInt(match[3] || '0', 10);

  totalMinutes = days * 24 * 60 + hours * 60 + minutes;
  
} else {
  throw new Error("Duration is not a string");
}
  

       
        const basePrice={
            bike:20,
            auto:35,
            car:45
        }
        const rateperkm={
            bike:10,
            auto:15,
            car:20
        }
        const rateperminute={
            bike:2,
            auto:3,
            car:5
        }
       
        const fair={
            bike:Math.round(basePrice.bike+(distance*rateperkm.bike)+(totalMinutes*rateperminute.bike)),
            auto:Math.round(basePrice.auto+(distance*rateperkm.auto)+(totalMinutes*rateperminute.auto)),
            car:Math.round(basePrice.car+(distance*rateperkm.car)+(totalMinutes*rateperminute.car))
        }
        
        return fair;
         
    }catch(error){
        throw new Error("Error occured")
    }
}
module.exports.getFair=async(pickup,destination)=>{
    
    if(!pickup || !destination){
        
        throw new Error("All feilds required")
    }
    try{
       
         return await Calcfair(pickup,destination)
    }catch(error){
        throw new Error("Error occured")
    }
}
module.exports.createRide=async({userId,pickup,destination,vehicleType})=>{
    try{
       
    if(!userId || !pickup || !destination || !vehicleType){
        
        throw new Error("All feilds are required")
    }
    const fair=await Calcfair(pickup, destination);
    const distance=await getDistance(pickup, destination)
    const otp=getOtp(6)
    
    const result=await rideModel.create({user:userId,pickup,destination,fair:fair[vehicleType],distance,otp})
    
    return result;
}catch(error){
    throw new Error("Server Error")
}
}
module.exports.getCaptainInRadius=async(longitude, latitude,radius)=>{
    
    const captains=await captainModel.find({
      status:"online",
      location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude] 
        },
        $maxDistance: radius * 1000 
      }
    }
  })
   
    return captains;
}
module.exports.confirmRide=async(rideId,captain_id)=>{
  try{
    await rideModel.findByIdAndUpdate({_id:rideId},{
      ride_status:'accepted',
      captain:captain_id
    })
    const ride=await rideModel.findOne({_id:rideId}).populate('user').populate('captain').select('+otp')
    if(!ride){
      throw new Error("Error Occured")
    }
    return ride
  }catch(error){
    throw new Error("Error occured")
  }
}
module.exports.startRide=async(ride_id,otp,captain_id)=>{
  try{
       const ride= await rideModel.findOne({_id:ride_id}).populate('user').populate('captain').select('+otp')
       if(!ride){
      throw new Error("Error Occured")
    }
      if(ride.ride_status!=="accepted"){
        throw new Error("Ride Status Error")
      }
      if(ride.otp!==otp){
        throw new Error("Invalid OTP")
      }
      await rideModel.findByIdAndUpdate({
      _id:ride_id
      },{ride_status:"ongoing",captain:captain_id})
      return ride;
  }catch(err){
    throw new Error(err)
  }
}
module.exports.endRide=async(ride_id,captain_id)=>{
    try{
        if(!ride_id || !captain_id){
          throw new Error("Provide All Fields")
        }
        const ride= await rideModel.findOne({_id:ride_id,captain:captain_id}).populate('user').populate('captain').select('+otp')
        
       if(!ride){
      throw new Error("Error Occured")
    }
      if(ride.ride_status!=="ongoing"){
        throw new Error("Ride Status Error")
      }
      const payment=Math.round(ride.distance * 10)
        await rideModel.findByIdAndUpdate({
          _id:ride_id
        },{
          ride_status:"completed",
          captain_payment:payment,
          date:Date.now()
        })
        return ride;
    }catch(err){
      throw new Error(err)
    }
}
module.exports.getEarning=async()=>{
  try{
  const todayIST = new Date()
  .toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }); 

const [result] = await rideModel.aggregate([
  {
    $match: {
      $expr: {
        $eq: [
          {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$date",
              timezone: "Asia/Kolkata"
            }
          },
          todayIST
        ]
      }
    }
  },
  {
    $group: {
      _id: null,
      totalPayment: { $sum: "$captain_payment" },
      count: {$sum:1}
    }
  }
]);

return ({ total: result });
  }catch(err){
    throw new Error(err)
  }
}
module.exports.setStatus=async(captain_id,status)=>{
  try{
    
      const response=await captainModel.findByIdAndUpdate({
        _id:captain_id
      },{
        status:status==='offline'?'offline':'online'
      })
      return response;
  }catch(err){
    throw new Error(err)
  }
}