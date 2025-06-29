const mongoose=require('mongoose');
function connectDB(){
    // Database connection 🥳
    mongoose.connect('mongodb://0.0.0.0:27017/UberClone')
.then(() => console.log('Database connected successfully'))
.catch((err) => console.error('Database connection error:', err));

    
    
}
module.exports=connectDB;