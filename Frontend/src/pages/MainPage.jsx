import React, { useContext } from 'react'
import {useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import { useRef } from 'react'
import { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom' 
import 'remixicon/fonts/remixicon.css'
import arrowimage from '../assets/arrow-down-s-line.svg'
import LocationSearch from '../components/LocationSearch'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRidePanel from '../components/ConfirmRidePanel'
import DriverDetails from '../components/DriverDetails'
import {data} from '../context/UserContext'
import {socketContext} from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'
// import {getFair} from '../../../Backend/services/ride.service'
const MainPage = () => {
  const token=localStorage.getItem("token")
const panelRef=useRef(null);
const arrow=useRef(null);
const location=useRef(null);
const locationPanel=useRef(null);
const confirmRide=useRef(null);
const LookingDriver=useRef(null); 
const displayPick=useRef(null)
const displayDrop=useRef(null)
const userLogoRef=useRef(null)

 const [vehiclePanel,setVehiclePanel]=useState(false);
 const [pick,setPick]=useState("");
 const [drop,setDrop]=useState("");
 const [panel,setPanel]=useState(false);
 const [confirm,setConfirm]=useState(false);
 const [confirmDriver,setConfirmDriver]=useState(false);
 const [picksuggestion,setPicksuggestion]=useState([])
 const[dropsuggestion,setDropsuggestion]=useState([])
 const [fair,setFair]=useState("")
 const[vehicleType,setVehicleType]=useState("")
 const[ride,setRide]=useState("")
const [rideData,setRideData]=useState(null)
const[endRide,setEndRide]=useState(null)

 const {user}=useContext(data)
 const {socket}=useContext(socketContext)

 useEffect(()=>{
    socket.emit('join',{userId:user._id,userType:'user'})
    const interval=setInterval(()=>{
      socket.on('send_confirm_ride',(data)=>{
       
        setRideData(data)
        setConfirmDriver(true)
    })
    }
        ,1000)
    socket.on('end_ride',(data)=>{
       setEndRide(data)
       setVehiclePanel(false) 
       setPanel(false)
       setConfirm(false)
       setConfirmDriver(false)
       setPick("")
       setDrop("")
    })

    return ()=> clearInterval(interval)
   
 },[])
  useGSAP(()=>{
    
    if(panel){
      gsap.to(panelRef.current,{
        height:'100vh',
        ease: 'power2.out'
      })
      gsap.to(arrow.current,{
        opacity:"1"
      })
      gsap.to(location.current,{
        opacity:"1"
      })
    }if(!panel){
      gsap.to(panelRef.current,{
        height:'20vh',
        ease: 'power2.in'
      })
      gsap.to(arrow.current,{
        opacity:"0"
      })
      gsap.to(location.current,{
        opacity:"0"
      })
    }
  },[panel])
  useGSAP(()=>{
    if(vehiclePanel){
      gsap.to(locationPanel.current,{
        transform:'translateY(0)',
      })
      gsap.to(confirmRide.current,{
        display:'none'
      })
    }else{
      gsap.to(locationPanel.current,{
        transform:'translateY(100%)',
      })
      gsap.to(confirmRide.current,{
        display:'block'
      })
    }
  },[vehiclePanel])
  useGSAP(()=>{
    if(confirm){
      gsap.to(confirmRide.current,{
        transform:'translateY(0)'
      })
    }else{
      gsap.to(confirmRide.current,{
        transform:'translateY(100%)',
      })
    }
  },[confirm])
  useGSAP(()=>{
    if(confirmDriver){
      gsap.to(LookingDriver.current,{
        transform:'translateY(0)'
      })
    }else{
      gsap.to(LookingDriver.current,{
        transform:'translateY(100%)',
      })
    }
  },[confirmDriver])
  const getPickLocations=async()=>{
    try{
      
       if(pick!==""){
       
      let result=await fetch(`${import.meta.env.VITE_BASE_URL}/maps/getSuggestions?input=${encodeURIComponent(pick)}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
      })
      const data=await result.json();
      
      if(result.status===200){
        
        setPicksuggestion(data.response)
      }
       }
      
    }catch(error){
      alert("Error occured")
    }
  }
  const getDropLocation=async()=>{
    try{
      
       if(drop!==""){
       
      let result=await fetch(`${import.meta.env.VITE_BASE_URL}/maps/getSuggestions?input=${encodeURIComponent(drop)}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
      })
      const data=await result.json();
      
      if(result.status===200){
        
        setDropsuggestion(data.response)
      }
       }
      
    }catch(error){
      alert("Error occured")
    }
  }
  const getFair=async(pick,drop)=>{
    try{
      const response=await fetch(`${import.meta.env.VITE_BASE_URL}/ride/fair`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({pick:pick,drop:drop})
      })
      const data=await response.json();
      
      if(response.status===200){
        
        setFair(data.response)
      }
       
    }catch(error){
      alert("Error Occured")
    }
  }
  
  return (
    <div className='relative'>
      
      <img ref={userLogoRef} className=" absolute top-1 w-20 m-5 z-10" src="https://pngimg.com/uploads/uber/uber_PNG24.png"/>
      <div className='h-screen w-screen object-cover overflow-hidden' >
        <LiveTracking></LiveTracking>
       
      </div>
      <div ref={panelRef} className='absolute bottom-0  bg-white w-full  flex flex-col items-center justify-end h-[20vh]'>
        <div >
          <form className='h-[25vh]'>
            <h5 ref={arrow} onClick={()=>{setPanel(false);userLogoRef.current.style.display='block';}} className='h-8 w-8 absolute left-90'>
              <img  src={arrowimage}/>
            </h5>
          <h4 className='text-2xl font-semibold mx-1 my-1'>Find your ride</h4>
        <input className='w-full bg-gray-200 rounded my-3 py-2 px-1' type="text" placeholder='Enter pick-up location' value={pick} onClick={()=>{setPanel(true);displayDrop.current.style.display='none';
          displayPick.current.style.display='block';
          confirmRide.current.style.display='none';
          userLogoRef.current.style.display='none';
        } } onChange={(e)=>{setPick(e.target.value); getPickLocations()}}/>
        <input className='w-full bg-gray-200 rounded my-3
        py-2 px-1' type="text" placeholder='Enter drop location' value={drop} onClick={()=>{setPanel(true);displayPick.current.style.display='none'
          displayDrop.current.style.display='block'
        }} onChange={(e)=>{setDrop(e.target.value); getDropLocation()}}/>
        </form>
        </div>
        <div ref={location} className=' flex-grow opacity-0 overflow-auto transition-opacity duration-300 px-4'>
          <div>
    <LocationSearch  displayDrop={displayDrop} displayPick={displayPick} picksuggestion={picksuggestion} dropsuggestion={dropsuggestion} setPick={setPick} setDrop={setDrop} vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} setPanel={setPanel}></LocationSearch>
          </div>
    
        </div>
        <div className='w-full h-15 flex items-center justify-center'>
          <button className='w-[90%] h-[5vh] relative bottom-[3vh] rounded-xl bg-black text-white font-semibold' onClick={()=>{
                    setVehiclePanel(true)
                    setPanel(false)
                    getFair(pick,drop)
                    
                    confirmRide.current.style.display='block'
                }}>
            click
          </button>
        </div>
      </div>
      <div ref={locationPanel} className='fixed bottom-0 z-10 w-full translate-y-full bg-white '>
        <VehiclePanel  setVehicleType={setVehicleType} pick={pick} drop={drop} setConfirm={setConfirm} fair={fair} setVehiclePanel={setVehiclePanel}></VehiclePanel>
      </div>

      <div ref={confirmRide} className='fixed bottom-0 z-10 w-full translate-y-full bg-white '>
        <ConfirmRidePanel setRide={setRide} vehicleType={vehicleType} pick={pick} drop={drop} setConfirm={setConfirm} setConfirmDriver={setConfirmDriver} ></ConfirmRidePanel>
      </div>
      <div ref={LookingDriver} className='fixed bottom-0 z-10 w-full translate-y-full bg-white '>
      <DriverDetails rideData={rideData} setConfirm={setConfirm} setConfirmDriver={setConfirmDriver}></DriverDetails>
      </div>
    </div>
  )
}

export default MainPage