const socketIo=require('socket.io')
const userModel=require('./db/models/user_module')
const captainModel=require('./db/models/captain.module')
let io;
function initialize(server){
    io=socketIo(server,{
        cors:{
            origin:"*",
            methods:["POST","GET"]
        }
    });
    io.on('connection',(socket)=>{
        console.log(`Client Connection ${socket.id}`);
        socket.on('join',async(data)=>{
            const {userId,userType}=data;
            
            if(userType==='user'){
               await  userModel.findByIdAndUpdate(userId,{socketId:socket.id})
            }else if(userType==='captain'){
                await captainModel.findByIdAndUpdate(userId,{socketId:socket.id})
            }
        })
        socket.on('update-location-captain',async(data)=>{
            const {userId,location}=data;
            
            if(!location || !location.lng || !location.lat){
                socket.emit('error',{message:"Error"})
            }
            await captainModel.findByIdAndUpdate(userId,{
      location
    },
    { new: true })
        })
        socket.on('disconnect',()=>{
            console.log(`Client disconnected ${socket.id}`)
        });
    });
}
function sendMessage(socketId,message){
    if(io){
        io.to(socketId).emit(message.event,message.data)
        
    }else{
        console.log('socketId not found')
    }
}
module.exports={initialize,sendMessage}