import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

const AuthProvider = ({children}) =>{
    const [auth,setAuth] = useState({
        user: null,
        token : ''
    })

    //default axios
    axios.defaults.headers.common['Authorization'] = 'Bearer ' +auth?.token
    axios.defaults.baseURL = 'http://localhost:8080'

    useEffect(()=>{
        const data = localStorage.getItem('auth')
        if (data){
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user:parseData.userDetails,
                token:parseData.token
            })
        }
    },[])
    
    return (
        <AuthContext.Provider value={{auth,setAuth}} >
            {children}
        </AuthContext.Provider>   
    )
}

const useAuth = () => useContext(AuthContext)

export {useAuth,AuthProvider}