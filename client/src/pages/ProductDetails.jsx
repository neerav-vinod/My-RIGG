import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/Cart'

const ProductDetails = () => {
    const params = useParams()
    const [product,setProduct] = useState()
    const [relatedProducts, setRelatedProducts] = useState([]);
    const {cart,setCart} = useCart()

    console.log(params);

    const getSimilarProducts = async (pid,cid) =>{
        try{
            const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProducts(data.products)
        }catch(error){
            console.log(error);
        }
    }
    
    const getProducts = async() =>{
        try {
            const {data} = await  axios.get(`/api/v1/product/one-product/${params.id}`)
            setProduct(data.fetchedProduct)
            getSimilarProducts(data?.fetchedProduct._id,data?.fetchedProduct.category)
        } catch (error) {
           console.log(error) 
        }
    }

    useEffect(()=>{
        getProducts()
    },[])
  return (
    <Layout>
    <div>
        <div className='flex p-2 gap-5'>
        <div>
            <img src={`http://localhost:8080/${product?.photo}`} alt="" className='h-[350px] w-[400px]' />
        </div>

        <div>
            <p>{product?.name}</p>
            <p>{product?.description}</p>
            <button onClick={()=>{
                setCart([...cart,product])
                localStorage.setItem("cart", JSON.stringify([...cart,product]))
                }} className=' bg-orange-400 p-2' >Add to Cart</button>
        </div>
        </div>

       <div>
        <h1>Similar Products</h1>
        <div>
        <div className='flex gap-2 flex-wrap mt-3'>
        {relatedProducts?.map(p =>(

                     <Link to={`/product-details/${p.slug}`} >
                        <div className='p-2 border rounded cursor-pointer' >
                        <div>
                            <img src={`http://localhost:8080/${p.photo}`} alt="" className='h-[14rem] w-auto'  />
                        </div>
                        <div>
                            <h2 className='text-xl font-bold'>{p.name}</h2>
                            <p className='font-semibold'>{p.description.substring(0,30)}...</p>
                            <p>$ {p.price}</p>
                        </div>
                    </div>
                    </Link>
                    ))}
        </div>
        </div>
        </div> 
    </div>
    </Layout>
   
  )
}

export default ProductDetails