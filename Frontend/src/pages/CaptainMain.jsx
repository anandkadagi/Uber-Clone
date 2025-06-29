import React, { useRef ,useState,useEffect,useContext} from 'react'
import CaptainDetails from '../components/CaptainDetails'
import CaptainConfirmRide from '../components/CaptainConfirmRide'
import {useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import CaptainFinalConfirm from '../components/CaptainFinalConfirm'
import CompleteRide from '../components/CompleteRide'
import {captainContextData} from '../context/CaptainContext'
import { socketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'
const CaptainMain = () => {
  const captainRide=useRef(null);
  const captainConfirm=useRef(null);
  const completeRide=useRef(null);
  const [captainRidePanel, setCaptainRidePanel] = useState(false);
  const [confirm, setConfirm] = useState(false);  
  const [Complete,setComplete] = useState(false);
  const [ride,setRide]=useState(null)
  const [rideData,setRidedata]=useState(null)
  const [earnings,setEarnings]=useState({})

  const {captainData}=useContext(captainContextData)
  const {socket}=useContext(socketContext)

  useEffect(()=>{
    
      socket.emit('join',{userId:captainData._id,userType:'captain'})
      
      const updateLocation=()=>{
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(position=>{
            
            socket.emit('update-location-captain',{
              userId:captainData._id,
              location: {
                type: 'Point',
                coordinates: [position.coords.longitude, position.coords.latitude] 
              }
            })
          })
        }
      }
      const locationInterval=setInterval(updateLocation,10000)
      //  socket.on('start-ride',(data)=>{
       
      // setRide(data)
       
      //  setCaptainRidePanel(true)
      // })
      const startRide=setInterval(()=>{
           socket.on('start-ride',(data)=>{
       
      setRide(data)
       
       setCaptainRidePanel(true)
      })
      },1000)
     
    
     
      return ()=>{clearInterval(locationInterval)
      clearInterval(startRide)
      }

  },[])
  const confirmRide=async()=>{
      const response=await fetch(`${import.meta.env.VITE_BASE_URL}/ride/confirm`,{
        method:'POST',
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem('token')}`
        },
        body:JSON.stringify({ride:ride,captain_id:captainData._id})
      })
      if(response){
        const data=await response.json();
        setRidedata(data)
       
      }
  }
  useGSAP(()=>{
    if(captainRidePanel){
      gsap.to(captainRide.current,{
        transform:'translateY(0)',
      })
    }else{
      gsap.to(captainRide.current,{
        transform:'translateY(100%)',
      })
    }
  },[captainRidePanel])
  useGSAP(()=>{
    if(confirm){
      gsap.to(captainConfirm.current,{
        transform:'translateY(0)',
      })
    }else{
      gsap.to(captainConfirm.current,{
        transform:'translateY(100%)',
      })
    }
  },[confirm])
  useGSAP(()=>{
    if(Complete){
      gsap.to(completeRide.current,{
        transform:'translateY(0)',
        display:'block'
      })
    }else{
      gsap.to(completeRide.current,{
        transform:'translateY(100%)',
        display:'none'
      })
    }
  },[Complete])
  const getEarning=async()=>{
        const response=await fetch(`${import.meta.env.VITE_BASE_URL}/ride/earnings`,{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.status===200){
            const data=await response.json(response)
            setEarnings(data)
          
            
        }
    }
  return (
    <div className='h-screen' style={{ position: 'relative' }}>
      <div className='h-2/3'>
       <LiveTracking className='h-[70vh]'></LiveTracking>
      </div>
      <div className='h-1/3 z-10'>
        <CaptainDetails earnings={earnings}></CaptainDetails>
      </div>
      <div ref={captainRide} className='fixed bottom-0 z-10 w-full  bg-white '>
        <CaptainConfirmRide  confirmRide={confirmRide} ride={ride} setCaptainRidePanel={setCaptainRidePanel} setConfirm={setConfirm}></CaptainConfirmRide>
      </div>
      <div ref={captainConfirm} className='fixed bottom-0 z-10 w-full  bg-white '>
       <CaptainFinalConfirm rideData={rideData} setComplete={setComplete}
       setConfirm={setConfirm}
       ></CaptainFinalConfirm> 
      </div>
      <div ref={completeRide}  className='fixed bottom-0 z-10 w-full  bg-white '>
       <CompleteRide setEarnings={setEarnings} getEarning={getEarning} rideData={rideData} setCaptainRidePanel={setCaptainRidePanel} setConfirm={setConfirm}
       setComplete={setComplete}></CompleteRide> 
      </div>
     
      
    </div>
  )
}

export default CaptainMain