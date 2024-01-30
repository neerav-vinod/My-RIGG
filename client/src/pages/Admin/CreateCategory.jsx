import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout'
import axios from 'axios'
import CategoryInput from '../../components/CategoryInput'
import EditCategoryPopUp from '../../components/miscellaneous/EditCategoryPopUp'

const CreateCategory = () => {
  const [categories, setCategories] = useState()
  const [name,setName] = useState()
  const [isOpen,setIsOpem] = useState(false)
  const [selectedId,setSelectedId] = useState()

  const displayCategories = async () =>{
    try {
      const response = await axios.get('api/v1/category/all-categories')
      setCategories(response.data.getAllCategories);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async() =>{
 
    try {
      const response = await axios.post('api/v1/category/create-category',{name})
      alert(response.data.message);
      displayCategories();
    } catch (error) {
      console.log(error);
    }
  }

  const deleteCategory = async(categoryId) =>{
    try {
      const response = await axios.delete(`api/v1/category/delete-category/${categoryId}`)
      displayCategories()
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    displayCategories()
  },[])
  return (
  <Layout>
  <>
  <div className='flex gap-4'>
    <div>
      <AdminMenu/>
    </div>

    <div>
        {isOpen && <EditCategoryPopUp setIsOpen={setIsOpem} isOpen={isOpen} selectedId={selectedId} displayCategories={displayCategories}/>}
        <h1 className='text-3xl font-bold mt-3'>Create Category</h1>
        <div>
          <CategoryInput value={name} setValue={setName} handleSubmit={handleSubmit} />
        </div>
        <div className=''>
          <table className='mt-5 w-[70vw]'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='p-3 text-left'>id</th>
                <th className='p-3 text-left'>Category Name</th>
                <th className='p-3 text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
             { categories?.map((data,index)=>(
                  <tr>
                  <td className='p-3 bg-gray-500 text-white font-semibold'>{index}</td>
                  <td className='p-3 bg-gray-500 text-white font-semibold'>{data.name}</td>
                  <td className='p-3 bg-gray-500 text-white font-semibold'>
                    <button onClick={()=>{setIsOpem(!isOpen); setSelectedId(data.slug)} }>Edit</button>
                    <button className='ms-2'onClick={()=> deleteCategory(data._id)} >Delete</button>
                  </td>
                </tr>
             )) 
              }
            </tbody>
          </table>
        </div>
    </div>

  </div>
  </>
  </Layout>
  )
}

export default CreateCategory