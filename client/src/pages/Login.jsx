import React, { useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useAuth } from '../context/Auth'
import { useLocation, useNavigate } from 'react-router-dom'


const Login = () => {

    const [details,setDetails] = useState({
        email:"",
        password:""
    })

    const {auth,setAuth} = useAuth()

    const nav = useNavigate();
    const loc = useLocation();

    console.log(auth);

    const loginHandler = async() =>{
        try {
            const response = await axios.post('/api/v1/auth/login',details)
            console.log(response)
            setAuth({
                ...auth,
                user:response.data.userDetails,
                token:response.data.token
            })
            localStorage.setItem('auth',JSON.stringify(response.data))
            alert(response.data.message)
            nav(loc.state || '/')
        } catch (error) {
            console.log(error); 
        }
    }
  return (
    <Layout>
     <div>
        <h1 className='text-center mt-5 text-2xl font-bold'>User Login</h1>
        <p className='text-center font-medium text-sm mt-2'>Login to access this website and purchase products</p>
    </div>

    <div className='flex flex-col gap-3 justify-center items-center mt-5'>
    <input onChange={e => setDetails({...details,email:e.target.value})} type="text" name="" id="email" placeholder='Enter your Email' className='w-[15.625rem] h-12 border rounded-lg border-gray-500 p-3' />
    <input onChange={e => setDetails({...details,password:e.target.value})} type="password" name="" id="password" placeholder='Enter your Password' className='w-[15.625rem] h-12 border rounded-lg border-gray-500 p-3' />
    <button onClick={()=>loginHandler()} className='bg-gray-900 text-white p-3 w-[15.625rem] rounded-lg font-bold'>Login</button>
    <p className=' font-semibold hover:underline cursor-pointer'onClick={()=>nav('/forgot-password')} >Forgot Password?</p>
    </div>
    
    </Layout>
  )
}

export default Login