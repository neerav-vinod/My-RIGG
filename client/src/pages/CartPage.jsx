import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../context/Auth'
import { useCart } from '../context/Cart'
import axios from 'axios'
import DropIn from "braintree-web-drop-in-react";
import { useNavigate } from 'react-router-dom'


const CartPage = () => {
    const {auth} = useAuth()
    const {cart,setCart} = useCart()
    const [clientToken, setClientToken] = useState('');
    const [instance, setInstance] = useState('')
    const [loading,setLoading] = useState(false)

    const nav = useNavigate()

    const totalPrice = () =>{
        let total = 0 
        cart.forEach(data =>{
            const price = parseFloat(data.price)

            if(!isNaN(price)){
                total += price
            }
        })

        return total
    }
 

    const removeFromCart = (data) =>{
        const array = [...cart]
        const filterdData = array.filter(d =>{
           return d._id !== data._id
        } )
        console.log("Filterd Data",filterdData);
        localStorage.setItem('cart', JSON.stringify(filterdData))
        setCart(filterdData)
    }

    const getToken = async () =>{
       try {
        const {data} = await axios.get(`/api/v1/product/braintree/token`)
        setClientToken(data?.clientToken)
       } catch (error) {
        console.log(error);
       } 
    }

    useEffect(()=>{
        getToken();
    },[auth?.token])

    

    const handlePayment = async() =>{
        try {
            setLoading(true)
            const {nonce} = await instance.requestPaymentMethod()
            const {data} = await axios.post('/api/v1/product/braintree/payment', {
                nonce,cart
            })
            setLoading(false)
            localStorage.removeItem('cart')
            setCart([])
            nav('/dashboard/user/orders')
        } catch (error) {
           console.log(error); 
           setLoading(false)
        }
    }

  return (
    <Layout>
        <div>
            <h1 className='text-center font-bold text-2xl mt-3'>{!auth.token ? "Login to access Cart functionality": `You have ${cart.length} item in your Cart`}</h1>
            {auth.user && <div className='p-5 flex gap-5'>
                <div>
                   {cart.map(data=><div className='flex gap-2'>
                        <div>
                        <img className='h-[200px]' src={`http://localhost:8080/${data.photo}`} alt="" />
                        </div>

                        <div className='mt-3'>
                            <h1>{data.name}</h1>
                            <p>{data.description.substring(0,30)}...</p>
                            <h1>${data.price}</h1>
                            <button onClick={()=>removeFromCart(data)} className='bg-red-500 p-2 rounded-lg font-semibold tracking-wider text-white'>Remove</button>
                        </div>
                    </div>)}
                </div>

                <div>
                    <p className='mt-2'>Checkout Price : $ {totalPrice()}  </p>
                </div>

                <div>
                 {
                    !clientToken || !cart?.length ? (''):(
                       <>
                        <DropIn
                options={{
                    authorization: clientToken,
                }}
                onInstance={instance => setInstance(instance)}
                />
                <button className='p-2 bg-blue-600 rounded-xl text-white font-bold ' onClick={()=>handlePayment()} disabled={ loading || !instance}  >
                   { loading ? "Processing" : "Make Payment"}
                    </button>
                       </> 
                    )
                 }    
                </div> 
            </div>}
        </div>
    </Layout>
    
  )
}

export default CartPage