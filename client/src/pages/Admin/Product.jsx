import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/Cart'

const Product = () => {
    const [products,setProducts] = useState()
    const nav = useNavigate()

   

    console.log(products);

    //get all products
    const getAllProducts = async() =>{
        try {
            const {data} = await axios.get('api/v1/product/get-products')
            setProducts(data.allProducts); 
        } catch (error) {
            console.log(error);
        }
    }

    const deleteHandler = async(productId) =>{
        try {
           const response = await axios.delete(`api/v1/product/delete-product/${productId}`)
           alert(response.data.message)
           getAllProducts()
        } catch (error) {
           console.log(error) 
        }
    }

    useEffect(()=>{
        getAllProducts()
    },[])
  return (
    <Layout>
        <div className='flex'>

            <div>
              <AdminMenu/>  
            </div>

            <div className=''>
                <h1 className='text-3xl font-bold'>All Products</h1>
                <div className='flex flex-wrap gap-2'>
                    {products?.map(p =>(
                        <div className='p-2 border rounded cursor-pointer'>
                        <div>
                            <img src={`http://localhost:8080/${p.photo}`} alt="" className='h-[14rem] w-auto'  />
                        </div>
                        <div>
                            <h2 className='text-xl font-bold'>{p.name}</h2>
                            <p className='font-semibold'>{p.description}</p>
                        </div>
                        <div className='mt-3'>
                            <button className='p-2 bg-green-600 rounded-md font-bold text-white me-3' onClick={()=>nav(`/dashboard/admin/edit-product/${p._id}`)}  >Edit</button>
                            <button className='p-2 bg-red-500 rounded-md font-bold text-white me-3' onClick={()=>deleteHandler(p._id)} >Delete</button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

        </div>
    </Layout>
    
  )
}

export default Product