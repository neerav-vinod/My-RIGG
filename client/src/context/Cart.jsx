import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './Auth';


const CartContext = createContext();

const CartProvider = ({children}) =>{
    const [cart,setCart] = useState([])
    const {auth} = useAuth()
    useEffect(()=>{
        let cartItems = JSON.parse(localStorage.getItem('cart'))
        if(cartItems){
            setCart(cartItems)
        }
        
    },[auth?.user])
    return(
        <CartContext.Provider value={{cart,setCart}} >
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext)

export {useCart, CartProvider}

