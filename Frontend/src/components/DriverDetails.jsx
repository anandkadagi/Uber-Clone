import React from 'react'

const DriverDetails = (props) => {
  return (
        <div>
      <p onClick={()=>{props.setConfirmDriver(false)}} className='w-full h-10  flex items-center justify-center cursor-pointer  '>
          <img className='w-[15%] h-[80%]' src='https://cdn-icons-png.flaticon.com/128/2985/2985150.png'></img>
          
        </p>
      <p className='text-2xl font-semibold text-center m-5'>Ride Details</p>
      <div className='flex flex-col items-center w-full gap-4 mb-5'>
        <div className='flex items-center  w-full'>
      <img className='w-[30%] h-30' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Zf5_MJBYbsWV5-3cOwpc2Pl9wy9jjkMZbA&s'></img>
      <div className='w-[60%] text-end'>
      <p className='text-xl font-bold'>
        {props.rideData?.captain.fullname}
      </p>
      <p className='text-2xl font-semibold'>
        {props.rideData?.captain.vehicle.plate}
      </p>
      <p className='text-2xl font-semibold'>
        {props.rideData?.captain.vehicle.vehicleType}
      </p>
      <p className='text-2xl font-semibold'>
        {props.rideData?.otp}
      </p>
      </div>
        </div>
    
    <div className='flex w-[80%] border-1 border-gray-300 rounded-lg shadow-md p-4 '>
      <div className='w-[20%] flex items-center'>
    <img className=' w-8 h-8' src='https://cdn-icons-png.flaticon.com/128/447/447031.png'></img>
      </div>
      
      <div className='w-[80%]'>
        <p className='text-xl font-semibold'>562/11-A</p>
        <p>{props.rideData?.destination}</p>
      </div>
    </div>
     <div className='flex w-[80%] border-1 border-gray-300 rounded-lg shadow-md p-4 '>
      <div className='w-[20%] flex items-center'>
    <img className=' w-8 h-8' src='https://cdn-icons-png.flaticon.com/128/447/447031.png'></img>
      </div>
      
      <div className='w-[80%]'>
        <p className='text-xl font-semibold'>562/11-A</p>
        <p>{props.rideData?.pickup}</p>
      </div>
    </div>
    <div className='w-[80%] flex items-center justify-center'>
     
    </div>
      </div>
    
    </div>
  )
}

export default DriverDetails