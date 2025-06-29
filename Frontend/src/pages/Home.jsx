import React from "react";
import { Link } from "react-router-dom";
const Home=()=>{
    return(
        <>
        <div className="bg-gray-200 h-screen flex flex-col justify-between bg-cover bg-center w-screen bg-[url(https://images.unsplash.com/photo-1624724126923-e2c021df1311?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D)]">
           <img className="w-20 m-5" src="https://pngimg.com/uploads/uber/uber_PNG24.png"/>
           <div className=" h-[15%] flex flex-col gap-1 justify-center items-center bg-white">
           <p className="text-center font-bold text-2xl pb-3">Lets start with Uber</p>
           <button className="bg-black w-screen text-white rounded  p-3 cursor-pointer"><Link to="/userlogin">User Login</Link></button>
           </div>
        </div>
        </>
    )
}
export default Home;