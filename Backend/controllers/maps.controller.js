const mapsService = require('../services/maps.service');
const { validationResult } = require('express-validator');
module.exports.getLocation=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;
    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    mapsService.getLatLongFromAddress(address)
        .then(location => {
           return res.status(200).json(location);
        })
        .catch(error => {
           return res.status(500).json({ error: error.message });
        });
} 
module.exports.getDistance=async(req,res,next)=>{
    const errors=validationResult(req);
    try{
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {origin,destination}=req.query;
    if(!origin || !destination){
        return res.status(400).json({ error: 'Both origin and destination are required' });
    }
    const response=await mapsService.getDistanceBetweenLocations(origin,destination);
    
    return res.status(200).json({response})
}catch(error){
    return res.status(500).json({error:error.message});
}
}
module.exports.getSuggestions=async(req,res,next)=>{
    const errors=validationResult(req);
    try{
    if(!errors.isEmpty()){
       return res.status(400).json({ errors: errors.array() }); 
    }
    const {input}=req.query;
    
    if(!input){
        return res.status.status(400).json({error:'Input is Required'});
    }
    const response=await mapsService.getSuggestions(input);
    return res.status(200).json({response});
}catch(error){
    return res.status(500).json({error:error.message});
}
}