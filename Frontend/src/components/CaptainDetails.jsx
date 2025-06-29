import React, { useEffect, useState } from "react";
import {captainContextData} from '../context/CaptainContext'
import { useContext,useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CaptainDetails = (props) => {
  const [earnings,setEarnings]=useState({})
  const [online,setOnline]=useState(localStorage.getItem("status"))

 
  const {captainData}=useContext(captainContextData)
 
 
  const intervalRef=useRef(null)
 
  useEffect(()=>{
    
    const getTimings=async()=>{
      try{
    
        const response=await fetch(`${import.meta.env.VITE_BASE_URL}/captains/setTimings`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          },
          body:JSON.stringify({captain_id:captainData._id})
        })
        
        if(response.status===200){
          
          const data=await response.json();
          localStorage.setItem("timing",data.response.onlineTime)
          
         
        }
      }catch(err){
        toast.error(err)
      }
    }
    if(localStorage.getItem("status")==='online'){
     
         intervalRef.current = setInterval(getTimings, 360000); 
    }
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
    getEarning();
   

    return () => clearInterval(intervalRef.current);
  },[])
  
  const setStatus=async()=>{
    try{
      
      const response=await fetch(`${import.meta.env.VITE_BASE_URL}/ride/set_status`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem('token')}`
        },
        body:JSON.stringify({captain_id:captainData._id,status:localStorage.getItem("status")})
      })
      if(response.status===200){
        const data=await response.json();
      
        if(data.response.status==='offline'){
         toast.success("You are now online");
        }else if(data.response.status==='online'){
          toast.success("You are now offline");
        }
      }
    }catch(err){
      toast.error(err);
      alert(err)
    }
  }
  return (
    <div className="flex flex-col items-center h-full">
      <div className="w-[90%] flex items-center h-1/4 m-1">
        <div className="flex items-center w-[70%]">
            <img className="w-15 h-15" src="https://cdn-icons-png.flaticon.com/128/9408/9408175.png"/>
            <p className="mx-5 text-xl font-semibold">{captainData.fullname}</p>
        </div>
        <div className="w-[30%] text-end">
            <p className="text-2xl font-bold">
                Rs.{earnings?.response?.total?.totalPayment>0?earnings?.response?.total?.totalPayment:0}
            </p>
            <p className="text-xl font-semibold">
                Earned
            </p>
        </div>
      </div>
      <div className="flex items-center w-full justify-center m-1 ">
        <div className="w-[90%] flex bg-gray-200 p-5 justify-around rounded-lg shadow-md">
            <div className="w-1/3 flex flex-col items-center justify-center">
                <img className="w-10 h-10" src="https://cdn-icons-png.flaticon.com/128/2838/2838794.png">
                </img>
              <p className="text-xl font-semibold">{localStorage.getItem("timing")>0?localStorage.getItem("timing"):0}</p>
              <p className=" font-semibold">Hours Online</p>  
            </div>
            <div className="w-1/3 flex flex-col items-center justify-center">
                <img className="w-10 h-10" src="https://cdn-icons-png.flaticon.com/128/2838/2838794.png">
                </img>
              <p className="text-xl font-semibold">{earnings?.response?.total?.count>0?earnings?.response?.total?.count:0}</p>
              <p className=" font-semibold">Total trips</p>
            </div>
            
        </div>
      </div>
      <button
        style={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
         
          padding: '12px 32px',
          background: online==='offline' ? '#4caf50' : '#f44336',
          color: '#fff',
          border: 'none',
          borderRadius: '24px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}
        onClick={() => {
          if(localStorage.getItem("status")==='offline'){
              localStorage.setItem("status","online")
              setOnline(localStorage.getItem("status"))
          }
          else{
              localStorage.setItem("status","offline")
              setOnline(localStorage.getItem("status"))
          }
          setStatus()
        }}
      >
        {online==='online' ? 'Go Offline' : 'Go Online'}
      </button>
    </div>
  );
};

export default CaptainDetails;
