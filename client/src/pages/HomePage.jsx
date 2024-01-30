import React from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../context/Auth'


export const HomePage = () => {
  const {auth} = useAuth();
  console.log(auth);
  return (
    <div>
        <Layout>
          
        </Layout>
    </div>
  )
}
