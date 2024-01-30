import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

const Spinners = () => {
    const [count,setCount] = useState(4);
    const nav = useNavigate();
    const loc = useLocation();

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount(prevValue => --prevValue)
        },1000);
        count === 0 && nav(`/login`)
        return () => clearInterval(interval);
    },[count, nav, loc])
  return (
    <div className='flex flex-col h-screen justify-center items-center'>
        <h1 className='text-xl font-bold mb-5'>You are not authorized to acess this redirecting in {count} seconds..</h1>
        <ClipLoader
        color={'#20262D'}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Spinners