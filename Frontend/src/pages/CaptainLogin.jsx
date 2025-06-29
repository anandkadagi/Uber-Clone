import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { captainContextData } from "../context/CaptainContext";
const CaptainLogin=()=>{
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        
        const navigate=useNavigate();
        const {setCaptainData}=useContext(captainContextData)
        const submitHandler=async(e)=>{
            e.preventDefault();
            const captain={
                email:email,
                password:password
            }
            try{
            let responce=await fetch(`${import.meta.env.VITE_BASE_URL}/captains/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"},
                 body:JSON.stringify(captain)   
            })
            
            const data=await responce.json();
            if(responce.status===400){
                   
                   alert(data.errors?.[0]?.msg || "Invalid input.");
                   return;

                }
        if(responce.status===401){
                   
                   alert(data.message || "Unauthorized access.");
                   return;
                }
            if(responce.status===200){
               
               setCaptainData(data.captain)
                
               localStorage.setItem("token",data.token)
               localStorage.setItem("status","offline")
               
                
                navigate("/captain-main")
                
                return;
            }
            
            setEmail("");
            setPassword("");
        }catch(err){
            alert("An error occured",err)
        }
        }
    return(
        <>
        <div className="h-screen flex flex-col items-center
        justify-between bg-gray-100 p-10 pt-5">
            <form className="flex flex-col">
                <img className="w-20 mb-5" src="https://pngimg.com/uploads/uber/uber_PNG24.png"/>
                <h3 className="mb-3">Whats your email</h3>
                <input type="email" placeholder="email@example.com" className="border-2 border-gray-300 rounded-md p-2 mb-4 w-100" value={email}
                onChange={(e)=>setEmail(e.target.value)} required/>
                <h3 className="mb-3">Enter Password</h3>
                <input type="password" className="border-2 border-gray-300 rounded-md p-2 mb-4 w-100" required placeholder="Password" value={password}
                onChange={(e)=>setPassword(e.target.value)} />
                
                <button onClick={(e)=>submitHandler(e)} className="bg-black text-white w-100 rounded p-1 mt-5 ">Login</button>
                <p className="text-center m-2 mt-5">Want To Join Us?<Link to='/captainsignup' className="text-blue-600 ">Create Account</Link></p>
            </form>
            <div>
                <button className="bg-green-500 text-white w-100 rounded p-1"><Link to='/userlogin'>Login as User</Link></button>
            </div>
        </div>
        </>
    )
}
export default CaptainLogin;