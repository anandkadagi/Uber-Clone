import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { captainContextData } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
const CaptainSignup=()=>{
            const [name, setName] = useState("");
            const [email, setEmail] = useState("");
            const [password, setPassword] = useState("");
            const [userData, setUserData] = useState({});
            const [color,setcolor]=useState("");
            const [number,setnumber]=useState("");
            const [capacity,setcapacity]=useState("");
            const [vehicle,setvehicle]=useState("");
            const {captainData,setCaptainData}=useContext(captainContextData);
            const navigate=useNavigate();
            const submitHandler=async(e)=>{
                console.log(":Hlo")
                e.preventDefault();
                const captainData={
                    fullname:name,
                    email:email,
                    password:password,
                    vehicle:{
                        color:color,
                        plate:number,
                        capacity:capacity,
                        vehicleType:vehicle
                    }
                }
                try{
                let responce=await fetch(`${import.meta.env.VITE_BASE_URL}/captains/register`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(captainData)
                })
                const data=await responce.json();
                if(responce.status===201){
                    
                    setCaptainData(data.captain);
                    localStorage.setItem("token",data.token);
                    navigate('/captain-main');
                    return
                }
                if(responce.status===400){
                   
                   alert(data.errors?.[0]?.msg || "Invalid input.");
                   return;

                }
                if(responce.status===409){
                   
                   alert(data.message || "Unauthorized access.");
                   return;
                }
                
                setName("");
                setEmail("");
                setPassword("");
            }catch(err){
                alert("An error occurred")
            }
            }
    return(
        
       <>
        <div className="h-screen flex flex-col items-center
        justify-between bg-gray-100 p-10 pt-5 w-full">
            <form className="flex flex-col">
                <img className="w-20 mb-5" src="https://pngimg.com/uploads/uber/uber_PNG24.png"/>
                <h3 className="mb-3">Enter Your Name</h3>
                <input type="email" placeholder="Enter Full Name" className="border-2 border-gray-300 rounded-md p-2 mb-4 w-100" value={name}
                onChange={(e)=>setName(e.target.value)} required/>
                <h3 className="mb-3">Whats your email</h3>
                <input type="email" placeholder="email@example.com" className="border-2 border-gray-300 rounded-md p-2 mb-4 w-100" value={email}
                onChange={(e)=>setEmail(e.target.value)} required/>
                <h3 className="mb-3">Enter Password</h3>
                <input type="password" className="border-2 border-gray-300 rounded-md p-2 mb-4 w-100" required placeholder="Password" value={password}
                onChange={(e)=>setPassword(e.target.value)} />
                <h3>Vehicle Information</h3>
                <div flex flex-wrap items-center>
                    
                    <input type="text" placeholder="Vehicle Colour" className="border-2 border-gray-300 rounded-md p-2 m-4 mb-1 w-40" required value={color} onChange={(e)=>setcolor(e.target.value)}/>
                    <input type="text" placeholder="Vehicle Number" className="border-2 border-gray-300 rounded-md p-2 m-4 mb-1 w-40" required value={number} onChange={(e)=>setnumber(e.target.value)}/>
                    <input type="text" placeholder="Vehicle Capacity" className="border-2 border-gray-300 rounded-md p-2 m-4 mb-1 w-40" required value={capacity} onChange={(e)=>setcapacity(e.target.value)}/>
                    <select className="border-2 border-gray-300 rounded-md p-2 m-4 mb-1 w-40" value={vehicle} onChange={(e)=>setvehicle(e.target.value)} required>
                        <option value="car">Car</option>
                        <option value="bike">Bike</option>
                        <option value="auto">Auto</option>
                    </select>
                </div>
                <button onClick={(e)=>submitHandler(e)} className="bg-black text-white w-100 rounded p-1 mt-5 "><Link>Register</Link></button>
                <p className="text-center m-2 mt-5">Already have account?<Link to='/captainlogin' className="text-blue-600 ">Log in</Link></p>
            </form>
            <div>
                
            </div>
        </div>
        </>
    )
}
export default CaptainSignup;