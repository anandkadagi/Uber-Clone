const e = require('cors');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        
        minlength:[6,'Name should be atleast 6 characters long'],
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[6,'Email should be atleast 6 characters long'],
    },
    password:{
        type:String,
        required:true,
        select:false,
          },
    socketId:{
        type:String
    }
})
userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}
const User=mongoose.model('User',userSchema);
module.exports=User;