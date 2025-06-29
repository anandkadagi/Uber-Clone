import React from 'react'

const VehiclePanel = (props) => {
  const startRide=async(vehicle)=>{
        try{
            const response=await fetch(`${import.meta.env.VITE_BASE_URL}/ride/create`,{
              method:"POST",
              headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`
              },
              body:JSON.stringify({
                pickup:props.pick,
                destination:props.drop,
                vehicleType:vehicle
              })
            })
            if(response){
                props.setConfirm(true);props.setVehicleType("car");
            }
        }catch(err){
          alert(err.message)
        }
    }
  return (
    <div>
        <h4 onClick={()=>{props.setVehiclePanel(false);
            
        }} className='w-10 h-10 absolute left-[43%] '>
          <img  src='https://cdn-icons-png.flaticon.com/128/2985/2985150.png'></img>
        </h4>
      <div className='bg-white flex flex-col items-center'>
        <h3 className='text-2xl font-semibold mx-3  py-5 my-3 px-3'>Choose Vehicle</h3>
        <div onClick={()=>{props.setVehicleType("auto");
          startRide("car");
          props.setVehiclePanel(false)
        }} className='flex  gap-3 w-95 border-1 rounded-2xl p-2 my-2'>
          <img className='w-20 h-20' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Zf5_MJBYbsWV5-3cOwpc2Pl9wy9jjkMZbA&s'></img>
          <div className='flex flex-col w-[50%]'>
            
              <h2 className='flex gap-2 text-xl font-semibold items-center'>UberGo 
            <span className='text-gray-500 flex gap-2 items-center'> <img className='w-5 h-5' src='https://cdn-icons-png.flaticon.com/128/456/456212.png'></img> 4</span>
            </h2>
           <h3>3 min away</h3>
            <h3>More comfortable</h3>
          </div>
          <div  className='flex items-center text-3xl font-semibold'>
            <h2>Rs.{props.fair.car}</h2>
          </div>
        </div>
        <div className='flex  gap-3 w-95 border-1 rounded-2xl p-2 my-2' onClick={()=>{props.setVehicleType("auto");
          startRide("auto");
          props.setVehiclePanel(false)
        }}>
          <img className='w-20 h-18' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7JKCwArg2KS9LbINwr9sHNXs0wbE8S6sATg&s'></img>
          <div className='flex flex-col w-[50%]'>
            
              <h2 className='flex gap-2 text-xl font-semibold items-center'>UberGo 
            <span className='text-gray-500 flex gap-2 items-center'> <img className='w-5 h-5' src='https://cdn-icons-png.flaticon.com/128/456/456212.png'></img> 3</span>
            </h2>
           <h3>3 min away</h3>
            <h3>More comfortable</h3>
          </div>
          <div  className='flex items-center text-3xl font-semibold'>
            <h2>Rs.{props.fair.auto}</h2>
          </div>
        </div>
         <div className='flex  gap-3 w-95 border-1 rounded-2xl p-2 my-2' onClick={()=>{props.setVehicleType("bike")
          startRide("bike");
          props.setVehiclePanel(false)
         }}>
          <img className='w-20 h-20' src='data:image/jpeg;base64,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'></img>
          <div className='flex flex-col w-[50%]'>
            
              <h2 className='flex gap-2 text-xl font-semibold items-center'>UberGo 
            <span className='text-gray-500 flex gap-2 items-center'> <img className='w-5 h-5' src='https://cdn-icons-png.flaticon.com/128/456/456212.png'></img> 1</span>
            </h2>
           <h3>3 min away</h3>
            <h3>More comfortable</h3>
          </div>
          <div  className='flex items-center text-3xl font-semibold'>
            <h2>Rs.{props.fair.bike}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehiclePanel