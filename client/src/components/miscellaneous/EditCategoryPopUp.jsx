import React, { useEffect, useState } from 'react'
import CategoryInput from '../CategoryInput'
import axios from 'axios';

const EditCategoryPopUp = ({setIsOpen,isOpen,selectedId,displayCategories}) => {
    const [name,setName] = useState();
    const [fetchedId,setFetchedId] = useState();

    useEffect(()=>{
        const displayOneCtaegory = async() =>{
            try{
                const response = await axios.get(`/api/v1/category/one-category/${selectedId}`)
                setName(response.data.fetchedCategory.name)
                setFetchedId(response.data.fetchedCategory._id)
            }catch(error){
                console.log(error);
            }
        }
        displayOneCtaegory()
    },[selectedId])

   const submitHandler = async () =>{
    try {
        const response = await axios.put(`/api/v1/category/update-category/${fetchedId}`,{name})
        alert(response.data.message)
        displayCategories();
        setIsOpen(!isOpen)
    } catch (error) {
       console.log(error); 
    }
   } 
    
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className='bg-gray-200 h-72 p-5 flex flex-col justify-center items-center' >
            <CategoryInput value={name} setValue={setName} handleSubmit={submitHandler}  />
            <div className='mt-5'>
                <button className='p-3 bg-red-500 font-semibold text-gray-200 rounded-md'onClick={()=>setIsOpen(!isOpen)} >close</button> 
            </div>
        </div>
    </div>
  )
}

export default EditCategoryPopUp