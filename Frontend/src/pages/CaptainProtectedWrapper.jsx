import React from
 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect,useContext,useState } from 'react';
import { captainContextData } from '../context/CaptainContext';
const CaptainProtectedWrapper = ({children}) => {
    const navigate=useNavigate();
    
    const{captainData,setCaptainData}=useContext(captainContextData);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
      const token=localStorage.getItem("token");
        const verify=async()=>{
        if(!token){
            navigate('/captainlogin');
            return;
        }
    
    
    try{
      let responce=await fetch(`${import.meta.env.VITE_BASE_URL}/captains/captainProfile`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${token}`
        }
      })
      const data=await responce.json();
      if(responce.status===200){
        setCaptainData(data.captain)
        setLoading(false);
      }
      else{
        localStorage.removeItem("token");
      navigate('/captainlogin');
      }
    }catch(err){
      localStorage.removeItem("token");
      navigate('/captainlogin');
    }
}
    verify();
    },[]);
    if(loading){
      return(
        <h2>Loading....</h2>
      )
    }
  return (
    <div>
        {children}
    </div>
  )
}

export default CaptainProtectedWrapper