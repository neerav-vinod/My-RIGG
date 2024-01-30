import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { useAuth } from '../../context/Auth'
import UserMenu from '../../components/UserMenu'
import moment from 'moment'

const Orders = () => {

  const [orders, setOrders] = useState([])

  const {auth,setAuth} = useAuth()

  const getOrders = async () =>{
    try {
      const {data} = await axios.get('api/v1/auth/orders')
      setOrders(data)
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(()=>{
    getOrders()
  },[auth?.token])

  console.log(orders);

  return (
    <Layout>
    <div className='flex'>
        <div>
          <UserMenu/>
        </div>


        <div>
        <table className='mt-5 w-[70vw]'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='p-3 text-left'>id</th>
                <th className='p-3 text-left'>Status</th>
                {/* <th className='p-3 text-left'>Buyer</th> */}
                <th className='p-3 text-left'>Date</th>
                <th className='p-3 text-left'>Payment</th>
                <th className='p-3 text-left'>Quantity</th>
              </tr>
            </thead>
            <tbody>
             { orders?.map((data,index)=>(
                  <>         
                  <tr>
                  <td className='p-3 bg-gray-500 text-white font-semibold'>{index + 1}</td>
                  <td className='p-3 bg-gray-500 text-white font-semibold'>{data?.status}</td>
                  <td className='p-3 bg-gray-500 text-white font-semibold'>{moment(data?.createAt).fromNow()}</td>
                  <td className='p-3 bg-gray-500 text-white font-semibold'>{data?.payment?.success ? "Success":"Failed"}</td>
                  <td className='p-3 bg-gray-500 text-white font-semibold'>{data?.products?.length}</td>
                </tr>
                {<tr>
                  {data?.products.map(data =>(
                    <div className='flex'>
                    <div>
                    <img className='h-[200px]' src={`http://localhost:8080/${data.photo}`} alt="" />
                    </div>

                    <div className='mt-3'>
                        <h1>{data.name}</h1>
                        <p>{data.description.substring(0,30)}...</p>
                        <h1>${data.price}</h1>
                    </div>
                </div>
                  ))}
                </tr>}
                </>  
             )) 
              }
            </tbody>
          </table>
        </div>
    </div>
    </Layout>
  )
}

export default Orders