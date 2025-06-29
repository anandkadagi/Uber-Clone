import { useState,useEffect,createContext } from "react"
import React from 'react'
import {io} from 'socket.io-client'
export const socketContext=createContext()
const socket=io(`${import.meta.env.VITE_BASE_URL}`)
const SocketContext=({children})=>{
    useEffect(()=>{
        socket.on('connect',()=>{
            console.log("Connected")
        })
        socket.on('disconnect',()=>{
            console.log("Disconnected")
        })
        
    },[])
    
    return(
        <socketContext.Provider value={{socket}}>
            {children}
        </socketContext.Provider>
    )
}
export default SocketContext