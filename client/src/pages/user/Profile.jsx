import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/UserMenu'

const Profile = () => {
  const [details, setDetails ] = useState(
    {
        name: '',
        email:'',
        address:'',
        phone:'',
        password:null 
    }  
)


    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem('auth'))
      
      setDetails({...details,
        name: user.userDetails.name,
        email: user.userDetails.email,
        address: user.userDetails.address,
        phone: user.userDetails.phone 
      })
    },[])

    const updateHandler = () =>{

    }
  return (
    <Layout>
      <div className='flex'>
        <div>
          <UserMenu/>
        </div>

        <div>
        <div className='flex flex-col gap-3 justify-center items-center mt-10 p-5'>
        <div className='flex gap-4'>
        <input onChange={e => setDetails({...details,name:e.target.value})} type="text" name="" id="" placeholder='Enter your Name' className='w-[15.625rem] h-12 border rounded-lg border-gray-500 p-3' value={details.name} />
        <input onChange={e => setDetails({...details,phone:e.target.value})} type="text" name="" id="" placeholder='Phone No' className='w-[15.625rem] h-12 border rounded-lg border-gray-500 p-3'  value={details.phone}/>
        </div>
        
        <input onChange={e => setDetails({...details,email:e.target.value})} type="text" name="" id="" placeholder='Enter your E-mail' className='w-[32.25rem] h-12 border rounded-lg border-gray-500 p-3'  value={details.email}/>
        <input onChange={e => setDetails({...details,address:e.target.value})} type="text" name="" id="" placeholder='Enter your adress' className='w-[32.25rem] h-12 border rounded-lg border-gray-500 p-3'  value={details.address}/>
       

        <div className='flex gap-4'>
        <input onChange={e => setDetails({...details,password:e.target.value})} type="password" name="" id="" placeholder='Password' className='w-[32.25rem] h-12 border rounded-lg border-gray-500 p-3'  />
        
        </div>

        <button onClick={()=>updateHandler()} className='bg-gray-900 text-white p-5 w-[32.25rem] rounded-lg font-bold'>Update</button>
    </div>
        </div>
      </div>
    </Layout>
    
  )
}

export default Profile