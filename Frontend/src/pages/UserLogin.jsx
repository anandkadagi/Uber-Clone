import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { data } from "../context/UserContext";
const UserLogin=()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState({});
    const {user,setUser}=useContext(data);
    const navigate=useNavigate();
    const submitHandler=async(e)=>{
        e.preventDefault();
        const UserData={
            email:email,
            password:password
        }
        try{
        let responce=await fetch(`${import.meta.env.VITE_BASE_URL}/users/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials: 'include',
            body:JSON.stringify(UserData)
        })
        
       const data=await responce.json();
        if(responce.status===200){
            
            
            setUser(data.user);
            localStorage.setItem("token",data.token);
            navigate('/mainpage');
        }
       if(responce.status===400){
                   
                   alert(data.errors?.[0]?.msg || "Invalid input.");
                   return;

                }
        if(responce.status===401){
                   
                   alert(data.message || "Unauthorized access.");
                   return;
                }
        setEmail("");
        setPassword("");
    }catch(err){
        alert("An Error occured")
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
                
                <button onClick={(e)=>submitHandler(e)} className="bg-black text-white w-100 rounded p-1 mt-5 "><Link>Login</Link></button>
                <p className="text-center m-2 mt-5">New Here?<Link to='/usersignup' className="text-blue-600 ">Create Account</Link></p>
            </form>
            <div>
                <button className="bg-green-500 text-white w-100 rounded p-1"><Link to='/captainlogin'>Login as Captain</Link></button>
            </div>
        </div>
        </>
    )
}
export default UserLogin;