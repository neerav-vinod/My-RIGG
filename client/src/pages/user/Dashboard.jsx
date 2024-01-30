import React from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/UserMenu'

const Dashboard = () => {
  return (
    <Layout>
    <>
    <div className='flex'>
      <div>
          <UserMenu/>
      </div>

      <div>
          dashboard 
      </div>
    </div>
    </>
    </Layout>
  )
}

export default Dashboard