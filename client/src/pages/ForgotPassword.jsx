import React, { useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [details, setDetails] = useState({
        email:" ",
        password:" ",
        answer:" ",
    })

    const nav = useNavigate();

    const resetPassword = async() =>{
        try {
            const response = await axios.post('api/v1/auth/forgot-password',details)
                alert(response.data.message)
                nav('/login')    
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Layout>
    <div className='flex flex-wrap flex-col justify-center items-center mt-5 gap-3 '>
       <h1 className='font-bold text-2xl' > Forgot Password</h1>
       <p className='text-medium leading-9 tracking-wide'>Forgot your password? Answer the security question and reset the password</p>

    <input onChange={e => setDetails({...details,email:e.target.value})} type="text" name="" id="email" placeholder='Enter your Email' className='w-[15.625rem] h-12 border rounded-lg border-gray-500 p-3' />
    <input onChange={e => setDetails({...details,password:e.target.value})} type="password" name="" id="password" placeholder='Enter your new Password' className='w-[15.625rem] h-12 border rounded-lg border-gray-500 p-3' />
    <input onChange={e => setDetails({...details,answer:e.target.value})} type="text" name="" id="password" placeholder='Favourite Web Browser' className='w-[15.625rem] h-12 border rounded-lg border-gray-500 p-3' />
    <button onClick={()=>resetPassword()} className='bg-gray-900 text-white p-3 w-[15.625rem] rounded-lg font-bold'>Reset Password</button>
    </div>
    </Layout>
  )
}

export default ForgotPassword