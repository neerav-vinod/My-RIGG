import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import { Prices} from '../components/Forms/PriceArray'
import SearchBox from '../components/Forms/SearchBox'
import { Link, useNavigate } from 'react-router-dom'

const ProductPage = () => {
    const [products,setProducts] = useState()
    const [categories,setCategories] =useState();
    const [checked,setChecked] = useState([]);
    const [radio,setRadio] = useState([]);
    const [total,setTotal] = useState(0)
    const [page,setPage] = useState(1)
    const nav = useNavigate()


    const loadMOre = async() =>{
        try{
          const {data} = await axios.get(`api/v1/product/products-list/${page}`)  
          setProducts([...products,...data.products])
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        if(page===1) return
        loadMOre();
    },[page])
    
    //get Total Count
    const getTotal = async () =>{
        try {
            const response = await axios.get('/api/v1/product/product-count')
            setTotal(response.data.total)
        } catch (error) {
            console.log(error);
        }
    }


    // filter by Cat
    const handleFilter = (value,id) =>{
        let all = [...checked]
        if(value){
            all.push(id)
        }
        else{
            all = all.filter(c=> c!== id)
        }
        setChecked(all)
    }

    const getAllProducts = async() =>{
        try {
            const response = await axios.get(`/api/v1/product/product-list/${page}`);
            setProducts(response.data.products)
        } catch (error) {
           console.log(error); 
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
        getTotal();
    },[])  

    useEffect(()=>{
        if(!checked.length || !radio.length) getAllProducts();
    },[checked.length,radio.length])

    //get all filter products
    const filterProducts = async() =>{
      try {
        const response = await axios.post('/api/v1/product/product-filters',{checked,radio})
        setProducts(response.data.products)
      } catch (error) {
        console.log(error);
      }  
    }

    useEffect(()=>{
       if (checked.length || radio.length)  filterProducts()
    },[checked,radio])

    
    console.log(products);

  return (
    <Layout>
    <div className='flex'>
        <div className='h-[100vh] w-[20vw]'>
            <div>
                {
                    categories?.map(c=>(
                       <Checkbox key={(c._id)} onChange={(e)=> handleFilter(e.target.checked,c._id)} >
                        {c.name}
                       </Checkbox> 
                    ))
                }
            </div>

            <div className='mt-3'>
            {
                   <Radio.Group onChange={e=> setRadio(e.target.value)} >
                    {
                        Prices?.map(p=>(
                            <Radio value={p.array} >{p.name}</Radio>
                        ))
                    }
                   </Radio.Group>
                } 
            </div>
        </div>

        <div className=''>
            <div>
                <SearchBox/>
            </div>
            <div className='flex gap-2 flex-wrap mt-3'>
        {products?.map(p =>(

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
        <div>
           {
            products && products.length < total && 
            <button onClick={(e) =>{
                e.preventDefault();
                setPage(page + 1)
            }} className='p-2 font-bold border'>Load More</button> }
        </div>
        </div>

    </div>
    </Layout>
  )
}

export default ProductPage