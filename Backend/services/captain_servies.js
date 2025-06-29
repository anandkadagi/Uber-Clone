const captainmodel=require('../db/models/captain.module');
module.exports.createcaptain=async(fullname,email,password,color,plate,capacity,vehicleType)=>{
   
   
if(!fullname || !email || !password || 
    !color || !plate || !capacity || !vehicleType){
    throw new Error('All fields are required');

}
const captain=await captainmodel.create({
    fullname,
    email,
    password,
    vehicle:{
color,
plate,
capacity,
vehicleType,

    }
})
return captain;
}
module.exports.setTimings=async(captain_id)=>{
    if(!captain_id){
        throw new Error("Invalid ID")
    }
    try{
        
     const result = await captainmodel.findByIdAndUpdate(
      captain_id,
      { $inc: { onlineTime: 1 } },
      { new: true } 
    );
    if(result){
        return result;
    }else{
        throw new Error("Error Occured")
    }
    }catch(err){
        throw new Error(err)
    }
}