import React, { useContext,useState } from 'react'
export const data = React.createContext();

const UserContext = ({children}) => {
    
    const[user,setUser]=useState({
        email:"",
        fullname:"",
    });
  return (
    <data.Provider value={{user,setUser}}>
         {children} 
    </data.Provider>        
  )
}

export default UserContext