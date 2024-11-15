import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  const {user} = useSelector((state) => state.auth)
  if(!user){
    return <Navigate to="/login" replace/>
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <div>Admin Dashboard</div>;
      case 'user':
        return <div>User Dashboard</div>
      default:
        return <Navigate to='/login' replace/>;
    }
  }

  return (
    <div className='container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start'>
      <header className='lg:w-1/5 sm:2/5 w-full border'>
      {renderDashboard()}
      </header>
      <main className='p-8 bg-white w-full border mt-5'>
        <Outlet/>
      </main>
    </div>
  )
}

export default DashboardLayout