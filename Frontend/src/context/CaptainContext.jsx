import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
export const captainContextData=React.createContext();
const CaptainContext = ({children}) => {
    const[captainData,setCaptainData]=useState("")
    const[errors,setErrors]=useState("")
    const[loading,setLoading]=useState(false)
    const captainUpdate=(data)=>{
        setCaptainData(data);
    }
    
  return (
    <captainContextData.Provider value={{captainData,setCaptainData}}>
        {children}
    </captainContextData.Provider>
  )
}

export default CaptainContext