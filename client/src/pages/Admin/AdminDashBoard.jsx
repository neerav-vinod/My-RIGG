import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'

const AdminDashBoard = () => {
  return (
    <Layout>
    <div className='flex'>
        <div>
            <AdminMenu/>
        </div>

        <div>
            Details
        </div>
    </div>
    </Layout>
  )
}

export default AdminDashBoard