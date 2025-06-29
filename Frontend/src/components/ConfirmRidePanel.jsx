import React from 'react'

const ConfirmRidePanel = (props) => {
  const createRide=async()=>{
      try{
        const response=await fetch(`${import.meta.env.VITE_BASE_URL}/ride/create`,{
          method:"POST",
          headers:{
            "Content-Type":"application.json"
          },
          body:JSON.stringify({pickup:props.pick,
    destination:props.drop,
    vehicleType:props.vehicleType})
        })
        const data=await response.json();
        if(response.status===200){
          props.setRide(data.response)
        }
        else{
          alert("Error Occured")
        }
      }catch(error){
        alert("Error occured")
      }
  }
  return (
    <div>
      <p onClick={()=>{props.setConfirm(false)}} className='w-full h-10  flex items-center justify-center cursor-pointer  '>
          <img className='w-[15%] h-[80%]' src='https://cdn-icons-png.flaticon.com/128/2985/2985150.png'></img>
        </p>
      <p className='text-2xl font-semibold text-center m-5'>Looking for a driver</p>
      <div className='flex flex-col items-center w-full gap-4 mb-5'>
    <img className='w-30 h-30' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Zf5_MJBYbsWV5-3cOwpc2Pl9wy9jjkMZbA&s'></img>
    <div className='flex w-[80%] border-1 border-gray-300 rounded-lg shadow-md p-4 '>
      <div className='w-[20%] flex items-center'>
    <img className=' w-8 h-8' src='https://cdn-icons-png.flaticon.com/128/447/447031.png'></img>
      </div>
      
      <div>
        <p className='text-xl font-semibold'>562/11-A</p>
        <p>{props.pick}</p>
      </div>
    </div>
     <div className='flex w-[80%] border-1 border-gray-300 rounded-lg shadow-md p-4 '>
      <div className='w-[20%] flex items-center'>
    <img className=' w-8 h-8' src='https://cdn-icons-png.flaticon.com/128/447/447031.png'></img>
      </div>
      
      <div>
        <p className='text-xl font-semibold'>562/11-A</p>
        <p>{props.drop}</p>
      </div>
    </div>
    
      </div>
    
    </div>
  )
}

export default ConfirmRidePanel