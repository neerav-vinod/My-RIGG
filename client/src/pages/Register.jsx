import React, { useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const Register = () => {
    const [details, setDetails ] = useState(
        {
            name: '',
            email:'',
            address:'',
            phone:'',
            password:'',
            answer:''
        }  
    )

    const nav = useNavigate()
    const loc  = useLocation();

    const [retype,setRetype] = useState('')  

    const registerHandler = async( ) =>{
        if(details.password !== retype){
            alert("please type the same password in the re type column")
        }else{
           try{
               const response = await axios.post(`http://localhost:8080/api/v1/auth/register`, details) 
                alert(response.data.message)
                nav(loc.state || '/login')

           }catch(error){
                console.log(error);
           } 
        }
    }
  return (
    <Layout>
    <div>
        <h1 className='text-center mt-5 text-2xl font-bold'>User Registration</h1>
        <p className='text-center font-medium text-sm mt-2'>Register to access this website and purchase products</p>
    </div>
    <div className='flex flex-col gap-3 justify-center items-center mt-10'>
        <div className='flex gap-4'>
        <input onChange={e => setDetails({...details,name:e.target.value})} type="text" name="" id="" placeholder='Enter your Name' className='w-[15.625rem] h-12 border rounded-lg border-gray-500 p-3' />
        <input onChange={e => setDetails({...details,phone:e.target.value})} type="text" name="" id="" placeholder='Phone No' className='w-[15.625rem] h-12 border rounded-lg border-gray-500 p-3' />
        </div>
        
        <input onChange={e => setDetails({...details,email:e.target.value})} type="text" name="" id="" placeholder='Enter your E-mail' className='w-[32.25rem] h-12 border rounded-lg border-gray-500 p-3' />
        <input onChange={e => setDetails({...details,address:e.target.value})} type="text" name="" id="" placeholder='Enter your adress' className='w-[32.25rem] h-12 border rounded-lg border-gray-500 p-3' />
        <input onChange={e => setDetails({...details,answer:e.target.value})} type="text" name="" id="" placeholder='Enter your Your Favourite Web Browser' className='w-[32.25rem] h-12 border rounded-lg border-gray-500 p-3' />

        <div className='flex gap-4'>
        <input onChange={e => setDetails({...details,password:e.target.value})} type="password" name="" id="" placeholder='Password' className='w-[15.625rem] h-12 border rounded-lg border-gray-500 p-3' />
        <input onChange={e=> setRetype(e.target.value)} type="password" name="" id="" placeholder='Re-type' className='w-[15.625rem] h-12 border rounded-lg border-gray-500 p-3' />  
        </div>

        <button onClick={()=>registerHandler()} className='bg-gray-900 text-white p-5 w-[32.25rem] rounded-lg font-bold'>Register</button>
    </div>
    </Layout>
  )
}

export default Register