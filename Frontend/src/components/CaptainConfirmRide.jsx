import React from 'react'
import { Link } from 'react-router-dom'
const CaptainConfirmRide = (props) => {
  
  return (
    <div>
      <p onClick={()=>{props.setConfirm(false)}} className='w-full h-10  flex items-center justify-center cursor-pointer  '>
          <img onClick={()=>{
                props.setCaptainRidePanel(false)
          }} className='w-[15%] h-[80%]' src='https://cdn-icons-png.flaticon.com/128/2985/2985150.png'></img>
        </p>
      <p className='text-2xl font-semibold text-center m-5'>Ride For You</p>
      <div className='flex flex-col items-center w-full gap-4 mb-5'>
        <div className="w-[90%] flex items-center h-1/4 m-5">
        <div className="flex items-center w-[70%]">
            <img className="w-15 h-15" src="https://cdn-icons-png.flaticon.com/128/9408/9408175.png"/>
            <p className="mx-5 text-xl font-semibold">{props.ride?.user.fullname}</p>
        </div>
        <div className="w-[30%] text-end">
            <p className="text-2xl font-bold">
                {props.ride?.distance}
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
        <p>{props.ride?.pickup}</p>
      </div>
    </div>
     <div className='flex w-[80%] border-1 border-gray-300 rounded-lg shadow-md p-4 '>
      <div className='w-[20%] flex items-center'>
    <img className=' w-8 h-8' src='https://cdn-icons-png.flaticon.com/128/447/447031.png'></img>
      </div>
      
      <div>
        <p className='text-xl font-semibold'>562/11-A</p>
        <p>{props.ride?.destination}</p>
      </div>
    </div>
    <div className='flex w-[80%] border-1 border-gray-300 rounded-lg shadow-md p-4 '>
      <div className='w-[20%] flex items-center'>
    <img className=' w-8 h-8' src='https://cdn-icons-png.flaticon.com/128/447/447031.png'></img>
      </div>
      
      <div>
        <p className='text-xl font-semibold'>Rs.{props.ride?.fair}</p>
        
      </div>
    </div>
    <div className='w-[80%] flex items-center justify-center'>
     
      <button onClick={()=>{
        props.setConfirm(true)
        props.setCaptainRidePanel(false)
        props.confirmRide()
      }} className='bg-green-400 w-full p-2 rounded-md text-xl font-semibold text-center '>
        Accept
      </button>
      
    </div>
     <div className='w-[80%] flex items-center justify-center'>
      <button onClick={()=>{
                props.setCaptainRidePanel(false)
          }} className='bg-gray-400 w-full p-2 rounded-md text-xl font-semibold'>
        Ignore
      </button>
    </div>
      </div>
    
    </div>
  )
}

export default CaptainConfirmRide