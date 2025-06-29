import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { data } from "../context/UserContext";
const UserSignup=()=>{
        const [fullname, setFullname] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [userData, setUserData] = useState({});
        
        const navigate=useNavigate();
        const{user,setUser}=useContext(data);
        const submitHandler=async(e)=>{
            e.preventDefault();
            const newUser=({
                fullname:fullname,
                email:email,
                password:password
            })
            try{
            let responce=await fetch(`${import.meta.env.VITE_BASE_URL}/users/register`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newUser)
            })
            
            const data=await responce.json();
            if(responce.status===201){
            
           
            setUser(data.user);
            localStorage.setItem("token",data.token);
            navigate('/mainpage');
            return;
        }
            if(responce.status===400){
                   
                   alert(data.errors?.[0]?.msg || "Invalid input.");
                   return;

                }
        if(responce.status===409){
                   
                   alert(data.message || "Unauthorized access.");
                   return;
                }
                
            setFullname("");
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
                <h3 className="mb-3">Enter Your Name</h3>
                <input type="email" placeholder="Enter Full Name" className="border-2 border-gray-300 rounded-md p-2 mb-4 w-100" value={fullname}
                onChange={(e)=>setFullname(e.target.value)} required/>
                <h3 className="mb-3">Whats your email</h3>
                <input type="email" placeholder="email@example.com" className="border-2 border-gray-300 rounded-md p-2 mb-4 w-100" value={email}
                onChange={(e)=>setEmail(e.target.value)} required/>
                <h3 className="mb-3">Enter Password</h3>
                <input type="password" className="border-2 border-gray-300 rounded-md p-2 mb-4 w-100" required placeholder="Password" value={password}
                onChange={(e)=>setPassword(e.target.value)} />
                
                <button onClick={(e)=>submitHandler(e)} className="bg-black text-white w-100 rounded p-1 mt-5 "><Link>Register</Link></button>
                <p className="text-center m-2 mt-5">Already have account?<Link to='/userlogin' className="text-blue-600 ">Log in</Link></p>
            </form>
            <div>
                
            </div>
        </div>
        </>
    )
}
export default UserSignup;