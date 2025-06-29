import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const UserLogout = () => {
    const navigate=useNavigate();
    useEffect(()=>{
      const logout=async()=>{
        const token=localStorage.getItem("token");
    let responce=await fetch(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    if(responce.status===200){
        localStorage.removeItem("token");
        navigate('/userlogin');
    }
      }
      logout();
    },[])
    
  return (
    <div></div>
  )
}

export default UserLogout