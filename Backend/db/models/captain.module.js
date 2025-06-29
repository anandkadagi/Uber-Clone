const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const captainmoduleschema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        min:[3,'Name should be atleast 3 characters long']
    },
    email:{
type:String,
required:true,
min:[5,'Email should be atleast 5 characters long']
    },
    password:{
        type:String,
        required:true,
        min:[5,'Password should be atleast 5 characters long']
    },
    socketId:{
        type:String
        
    },
    status:{
        type:String,
        enum:['online','offline'],
        default:'offline'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            min:[3,'Color should be atleast 3 characters long']
        },
        plate:{
            type:String,
            required:true,
            min:[3,'Plate should be atleast 3 characters long']
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'Capacity should be atleast 1']
        },
        vehicleType:{
            type:String,
            enum:['car','bike','auto'],
            required:true
        }
    },
    location:{
        type: {
    type: String,
    enum: ['Point'],
    default: 'Point',
    
  },
  coordinates: {
    type: [Number], 
    
  }
    },
    onlineTime:{
        type:Number,
        default:0
    },
    date:{
        type:Date
    }
 })
 captainmoduleschema.index({ location: '2dsphere' });
 captainmoduleschema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
 }
 captainmoduleschema.methods.comparePassword=async function(password){
   
    return await bcrypt.compare(password,this.password);
 }

 captainmoduleschema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
 }
 const captainmodel=mongoose.model('Captain',captainmoduleschema);
 module.exports=captainmodel;