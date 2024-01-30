import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import axios from 'axios'
import { Select } from 'antd'
import { useParams } from 'react-router-dom'
const {Option} = Select


const UpdateProduct = () => {
    const [data, setData] = useState({
        name:'',
        description:'',
        price:'',
        category:'',
        quantity:'',
        photo:''
      })
    
      const [categories,setCategories] =useState();

      const params = useParams()
    
      console.log(data);

      const getSingleProduct = async() =>{
        try{
           const response = await axios.get(`api/v1/product/one-product/${params.id}`) 
           setData({name:response.data.fetchedProduct.name,
                    description:response.data.fetchedProduct.description,
                    price:response.data.fetchedProduct.price,
                    quantity:response.data.fetchedProduct.quantity,
                    category:response.data.fetchedProduct.category,
                    photo:response.data.fetchedProduct.photo
                     
        })
        }catch(e){

        }
      }
    
      const displayCategories = async () =>{
        try {
          const response = await axios.get('api/v1/category/all-categories')
          setCategories(response.data.getAllCategories);
        } catch (error) {
          console.log(error);
        }
      }
    
      useEffect(()=>{
        displayCategories();
        getSingleProduct()
      },[])

    
      const handleSubmit = async () =>{
        try {
         const productdata = new FormData() 
         productdata.append("name", data.name)
         productdata.append("description", data.description)
         productdata.append("price", data.price)
         productdata.append("quantity", data.quantity)
         data.photo && productdata.append("photo", data.photo)
         productdata.append("category", data.category)
         
         const response = await axios.put(`api/v1/product/update-product/${params.id}`, productdata) 
         if( response?.data?.status === true){
          alert(response?.data?.message)
         }else{
          alert(response.data.message)
         }
        } catch (error) {
          console.log(error);
        }
      }
  return (
    <Layout>
      <div className='flex'>

        <div>
          <AdminMenu/>
        </div>

        <div className=' overflow-scroll w-full p-5'>
          <h1 className='text-3xl font-bold'>Update Product</h1>
          <div className='mt-3 flex flex-col gap-4' >
            <Select bordered={false} placeholder="Select a category" size='large' className='w-[300px] border-2'
             onChange={(value)=>setData({...data,category:value})} value={data.category} >
              {
                categories?.map(c=>(
                 <Option key={c._id} value={c._id} >
                  {c.name}
                 </Option> 
                ))
              }
            </Select>
            <input type="file" name='photo' accept='image/*'onChange={(e)=>setData({...data,photo:e.target.files[0]})}  className='border-2 w-[300px] p-2'  disabled />
            <input value={data.name} type="text" className='border-2 p-2 w-[300px]' placeholder='Enter Name' onChange={(e)=>setData({...data,name:e.target.value})} />
            <input type="text" className='border-2 p-2 w-[300px]' placeholder='Enter Description' value={data.description} onChange={(e)=>setData({...data,description:e.target.value})} />
            <input type="text" className='border-2 p-2 w-[300px]' placeholder='Enter Price' value={data.price} onChange={(e)=>setData({...data,price:e.target.value})} />
            <input type='number' className='border-2 p-2 w-[300px]' placeholder='Enter Quantity' value={data.quantity} onChange={(e)=>setData({...data,quantity:e.target.value})} />
            <button className='bg-gray-900 w-[300px] text-gray-200 p-2 rounded-md font-bold' onClick={handleSubmit} >Add</button>
          </div>
        </div>

      </div>
    </Layout>
  )
}

export default UpdateProduct