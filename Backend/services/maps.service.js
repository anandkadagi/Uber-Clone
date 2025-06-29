const axios = require('axios');

module.exports.getLatLongFromAddress = async (address) => {
    try {
        if (!address) {
            throw new Error('Address is required');
        }
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
            throw new Error('Google Maps API key is not set');
        }
        const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${address}&key=${apiKey}`;
        
        const response=await axios.get(url)
        if (
            response.data &&
            response.data.status === 'OK'
        ) {
            const location = response.data.results[0].geometry.location;
            
            return {
                latitude: location.lat,
                longitude: location.lng
            };
        } else {
            throw new Error('Location not found');
        }
    } catch (error) {
        throw new Error(`Geocoding failed: ${error.message}`);
    }
};
module.exports.getDistanceBetweenLocations = async (origin, destination) => {
    if(!origin || !destination){
        throw new Error('Both origin and destination are required');
    }
    try{
        const apiKey=process.env.GOOGLE_MAPS_API_KEY;
        const url=`https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${destination}&origins=${origin}&key=${apiKey}`;
        const response=await axios.get(url);
        
        if(response.data.status=='OK'){
            if(response.data.rows[0].elements[0].status==='ZERO_RESULTS'){
                
                throw new Error('Distance not found');
            }
            
            return {
                
                distance: response.data.rows[0].elements[0].distance.text,
                duration: response.data.rows[0].elements[0].duration.text,
            };
        }
        else{
            throw new Error('Distance calculation failed');
        }
    }catch(error){
        throw new Error(`Distance calculation failed: ${error.message}`);
    }
}
module.exports.getSuggestions=async(input)=>{
    try{
        if(!input){
            throw new Error("input is required");
        }
        const apikey=process.env.GOOGLE_MAPS_API_KEY;
        const url=`https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${input}&key=${apikey}`;
        const response=await axios.get(url);
        if(response.data.status==='OK'){
            return response.data.predictions;
        }else{
            throw new Error('Suggestions retrieval failed');
        }
    }
    catch(error){
        throw new Error(`Suggestions retrieval failed: ${error.message}`);
    }
}
