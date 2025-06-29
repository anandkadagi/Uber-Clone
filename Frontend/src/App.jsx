import React from "react";
import { Route, Routes } from "react-router-dom";
import "tailwindcss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import MainPage from "./pages/MainPage";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainMain from "./pages/CaptainMain";
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper";
import CaptainFinalConfirm from "./components/CaptainFinalConfirm";
const App=()=>{
    return(
        <>
        <ToastContainer position="top-right" autoClose={3000} />
       <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="userlogin" element={<UserLogin/>}></Route>
        <Route path="/usersignup" element={<UserSignup/>}></Route>
        <Route path="/captainlogin" element={<CaptainLogin/>}></Route>
        <Route path="/captainsignup" element={<CaptainSignup/>}></Route>
        <Route path="/mainpage" element={<UserProtectedWrapper>
            <MainPage/>
            </UserProtectedWrapper>}></Route>
        <Route path="/user/logout" element={<UserProtectedWrapper>
            <UserLogout/>
        </UserProtectedWrapper>}></Route> 
        <Route path="captain-main" element={
            <CaptainProtectedWrapper>
                <CaptainMain/>
            </CaptainProtectedWrapper>
            
        }></Route> 
        {/* <Route path="/captain-confirm" element={<CaptainFinalConfirm></CaptainFinalConfirm>}></Route>   */}
       </Routes>
      
        </>
    )
}
export default App;