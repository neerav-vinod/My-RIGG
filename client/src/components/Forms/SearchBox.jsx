import React from 'react'
import { useSearch } from '../../context/Search'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const SearchBox = () => {

    const {value,setValue} = useSearch()
    const nav = useNavigate()

    const handleSubmit = async () =>{
        try{
            const {data} = await axios.get(`/api/v1/product/search-product/${value.keyword}`)
            setValue({...value,results: data})
            nav('/search')
        }catch(error){
            console.log(error);
        }
    }
  return (
    <div>
        <input type="text" className='border-2 border-gray-800 h-8 w-64 ' onChange={e=>setValue({...value,keyword: e.target.value})} />
        <button onClick={handleSubmit} className=' bg-blue-500 p-[5px] text-gray-200 font-bold tracking-widest ms-2 rounded-lg'>Search</button>   
    </div>
  )
}

export default SearchBox
