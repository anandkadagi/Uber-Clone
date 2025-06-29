const dotenv=require('dotenv')
dotenv.config()
const cors=require('cors')
const express=require ('express')
const cron = require('node-cron');
const axios = require('axios');
const app=express()
const user_router=require('./routers/user_router')
const captain_router=require('./routers/captain.routes')
const maps_router=require('./routers/maps.routes')
const ride_router=require('./routers/ride.routes')
const captainmodel=require('./db/models/captain.module')
const cookieParser=require('cookie-parser')
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true               
}))
const db_Connection=require('./db/db')
db_Connection()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send('Hello World')
})
app.use('/users',user_router)
app.use('/captains',captain_router)
app.use('/maps',maps_router)
app.use('/ride',ride_router)
cron.schedule('0 23 * * *', async () => {
  
  try {
    await captainmodel.updateMany({},
      {$set:{
        status:"offline",
        onlineTime:0
      }}
    )
  } catch (error) {
    console.error('Error calling scheduled API:', error.message);
  }
});
module.exports=app