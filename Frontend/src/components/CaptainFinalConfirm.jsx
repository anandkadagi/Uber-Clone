import React, { useState } from 'react'

const CaptainFinalConfirm = (props) => {
  const [otp,setOtp]=useState("")
  const data={
    otp:otp,
    ride_id:props.rideData?.response?._id,
    captain_id:props.rideData?.response?.captain?._id
  }
  const submitHandler=async()=>{
    try{
      setOtp("")
    const response=await fetch(`${import.meta.env.VITE_BASE_URL}/ride/start-ride`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      },
      body:JSON.stringify(data)
    })
    if(response.status===200){
        props.setComplete(true)
        props.setConfirm(false)
    }
  }catch(err){
      alert(err.message)
  }
  }
  return (
    <div><div>
      
      <p className='text-2xl font-semibold text-center m-5'>Confirm ride!!!</p>
      <div className='flex flex-col items-center w-full gap-4 mb-5'>
        <div className="w-[90%] flex items-center h-1/4 m-5">
        <div className="flex items-center w-[70%]">
            <img className="w-15 h-15" src="https://cdn-icons-png.flaticon.com/128/9408/9408175.png"/>
            <p className="mx-5 text-xl font-semibold">{props.rideData?.response.user.fullname}</p>
        </div>
        <div className="w-[30%] text-end">
            <p className="text-2xl font-bold">
                {props.rideData?.response.distance}
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
      
      <div>
        <p className='text-xl font-semibold'>562/11-A</p>
        <p>{props.rideData?.response.pickup}</p>
      </div>
    </div>
     <div className='flex w-[80%] border-1 border-gray-300 rounded-lg shadow-md p-4 '>
      <div className='w-[20%] flex items-center'>
    <img className=' w-8 h-8' src='https://cdn-icons-png.flaticon.com/128/447/447031.png'></img>
      </div>
      
      <div>
        <p className='text-xl font-semibold'>562/11-A</p>
        <p>{props.rideData?.response.destination}</p>
      </div>
    </div>
    <div className='flex w-[80%] border-1 border-gray-300 rounded-lg shadow-md p-4 '>
      <div className='w-[20%] flex items-center'>
    <img className=' w-8 h-8' src='https://cdn-icons-png.flaticon.com/128/447/447031.png'></img>
      </div>
      
      <div>
        <p className='text-xl font-semibold'>Rs.{props.rideData?.response.fair}</p>
        
      </div>
    </div>
    <form  className='w-full flex flex-col items-center gap-4'>
        <input type='text' placeholder='Enter OTP' className='flex w-[80%] border-1  border-gray-300 rounded-lg shadow-md p-4' value={otp} onChange={(e)=>{
          setOtp(e.target.value)
        }}></input>
        
      </form>
      <button onClick={submitHandler} className='bg-green-400 w-[80%] p-3 rounded-md text-xl font-semibold'>
        Confirm
      </button>
    <div className='w-[80%] flex items-center justify-center'>
      
      
    </div>
     <div className='w-[80%] flex items-center justify-center'>
      
    </div>
      </div>
    
    </div></div>
  )
}

export default CaptainFinalConfirm