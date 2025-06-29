import React from 'react'

const CompleteRide = (props) => {
  const finishRide=async()=>{
    try{
          const response=await fetch(`${import.meta.env.VITE_BASE_URL}/ride/end-ride`,{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
              "Authorization":`Bearer ${localStorage.getItem("token")}`
            },
            body:JSON.stringify({ride_id:props.rideData?.response?._id})
          }) 
          if(response.status===200){
            
            
            props.setCaptainRidePanel(false)
            props.setConfirm(false)
            props.setComplete(false)
          }
    }catch(err){
      alert(err.message)
    }
  }
  return (
    <div>
        
        <div>
      
      <p className='text-2xl font-semibold text-center m-5'>Finish ride!!!</p>
      <div className='flex flex-col items-center w-full gap-4 mb-5'>
        <div className="w-[90%] flex items-center h-1/4 m-5">
        <div className="flex items-center w-[70%]">
            <img className="w-15 h-15" src="https://cdn-icons-png.flaticon.com/128/9408/9408175.png"/>
            <p className="mx-5 text-xl font-semibold">{props.rideData?.response?.user.fullname}</p>
        </div>
        <div className="w-[30%] text-end">
            <p className="text-2xl font-bold">
                {props.rideData?.response?.distance}
            </p>
            <p className="text-xl font-semibold">
                Km
            </p>
        </div>
      </div>
    
    <div className='flex w-[80%] border-1 border-gray-300 rounded-lg shadow-md p-4 '>
      <div className='w-[20%] flex items-center'>
    <img className=' w-8 h-8' src='https://cdn-icons-png.flaticon.com/128/447/447031.png'></img>
      </div>
      
      <div className='w-[80%]'>
        <p className='text-xl font-semibold'>To</p>
        <p>{props.rideData?.response?.destination}</p>
      </div>
    </div>
     <div className='flex w-[80%] border-1 border-gray-300 rounded-lg shadow-md p-4 '>
      <div className='w-[20%] flex items-center'>
    <img className=' w-8 h-8' src='https://cdn-icons-png.flaticon.com/128/447/447031.png'></img>
      </div>
      
      <div className='w-[80%]'>
        <p className='text-xl font-semibold'>From</p>
        <p>{props.rideData?.response?.pickup}</p>
      </div>
    </div>
    <div className='flex w-[80%] border-1 border-gray-300 rounded-lg shadow-md p-4 '>
      <div className='w-[20%] flex items-center'>
    <img className=' w-8 h-8' src='https://cdn-icons-png.flaticon.com/128/447/447031.png'></img>
      </div>
      
      <div>
        <p className='text-xl font-semibold'>Rs.{props.rideData?.response?.fair}</p>
        
      </div>
    </div>
    <button onClick={finishRide} className='bg-green-400 w-[80%] p-3 rounded-md text-xl font-semibold'>
        Complete Ride
      </button>
    <div className='w-[80%] flex items-center justify-center'>
      
      
    </div>
     <div className='w-[80%] flex items-center justify-center'>
      
    </div>
      </div>
    
    </div>
    </div>
  )
}

export default CompleteRide