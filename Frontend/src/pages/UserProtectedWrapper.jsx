import React from
 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect,useContext ,useState} from 'react';
import UserContext, { data } from '../context/UserContext';
const UserProtectedWrapper = ({children}) => {
    const navigate=useNavigate();
    const token=localStorage.getItem("token");
    const{user,setUser}=useContext(data);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
            const verify=async()=>{
            if(!token){
                navigate('/userlogin');
                return;
            }
        
        
        try{
          let responce=await fetch(`${import.meta.env.VITE_BASE_URL}/users/userProfile`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json",
              
              Authorization: `Bearer ${token}`
            },
            credentials: "include"
          })
          const data=await responce.json();
          
          if(responce.status===200){
            setUser(data.user)
            setLoading(false);
          }
          else{
            localStorage.removeItem("token");
          navigate('/userlogin');
          }
        }catch(err){
          localStorage.removeItem("token");
          navigate('/userlogin');
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

export default UserProtectedWrapper