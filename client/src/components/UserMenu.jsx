import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserMenu = () => {
    const nav = useNavigate() 
  return (
    <>
    <div className=' flex-wrap w-72 h-[92.85vh] bg-gray-900 text-gray-200 flex flex-col'>
        <div className='mt-5'>
            <h1 className='text-center text-2xl font-bold tracking-wider'>Dashboard</h1>
        </div>

        <div className='mt-14 text-lg font-semibold text-center'>
            <ul className='flex flex-col' >
                <li className='hover:bg-gray-800 p-3 cursor-pointer hover:underline'onClick={()=>nav('profile')}>Profile</li> 
                <li className='hover:bg-gray-800 p-3 cursor-pointer hover:underline'onClick={()=>nav('orders')}>Orders</li> 
            </ul>
        </div>
    </div>
    </>
  )
}

export default UserMenu