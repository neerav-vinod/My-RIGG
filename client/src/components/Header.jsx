import React, { useState } from 'react'
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useAuth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown } from "react-icons/fa";
import { Badge } from 'antd';
import { useCart } from '../context/Cart';

const Header = () => {
    const [isOpen,setIsOpen] = useState(false)

    const [dropDown, setDropDown] = useState(false);

    const nav = useNavigate();

    const {cart} = useCart()

    const openHandler = () =>{
        setIsOpen(!isOpen)
    }

    const {auth,setAuth} = useAuth()

    const logoutHandler = () =>{
        localStorage.clear()
        setAuth({
            ...auth,
            user: null,
            token: ''
        })
    }
  return (
    <>
    <div className='h-14 bg-gray-200 p-4 flex justify-between items-center'>
        <div className='text-2xl'>Shopeee</div>
        <div>
            <ul className='hidden md:flex gap-4 font-semibold leading-3 tracking-wider relative'>
                <li onClick={()=>nav('/')} >Home</li>
                {
                  auth.user ? 
                  (<>
                  <li onClick={()=>setDropDown(!dropDown)} className='flex gap-1'>{auth?.user?.name}{dropDown ? <FaChevronDown className=' transition rotate-180'/>:<FaChevronDown className='transition'/>}</li>
                  {dropDown && <div className='absolute bg-gray-200 top-8 p-5 left-14'>
                  <li onClick={()=>logoutHandler()} >Logout</li>
                  <li className='mt-4'onClick={()=>nav(`/dashboard/${auth?.user?.role === 1 ? "admin" : "user" }`)} >Dashboard</li>
                  </div>}
                  </>)
                   :
                  (<>
                  <li onClick={()=>nav('/login')}>Login</li>
                  <li onClick={()=>nav('/register')} >Register</li>
                  </>)
                }
                <li onClick={()=>nav('/products')} >Products</li>
                <li className=' font-bold' onClick={()=>nav('/cart')} >
                  <Badge count={cart?.length}>
                  Cart
                  </Badge>
                  </li>
            </ul>
            <div className=' md:hidden' onClick={()=>openHandler()}>
            { isOpen ? < IoMdClose className='h-10 transition'/> :<FaBars className='transition' />}
            </div>
            {isOpen && <div className='md:hidden h-[150px] absolute font-semibold leading-3 tracking-wider bg-slate-200 right-9 top-14 flex'>
                <ul className='flex flex-col gap-4 items-center justify-center p-5'>
                <li>Home</li>
                {
                  auth.user ? 

                  (<>
                  <li onClick={()=>logoutHandler()}>Logout</li>
                  <li onClick={()=>nav('/dashboard/user')} >Dashboard</li>
                  </>)
                   :
                  (<>
                  <li onClick={()=>nav('/login')} >Login</li>
                  <li onClick={()=>nav('/register')} >Register</li>
                  </>)
                }
                <li>Contact us</li>
                <li>About us</li> 
                </ul>
            </div>}
        </div>
    </div>
    </>
  )
}

export default Header