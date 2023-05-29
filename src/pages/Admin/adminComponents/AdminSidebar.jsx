import React from 'react'
import { Link } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <>
      <div className='sidebarContainer'>
        <div className='sidebar'>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/addCategory">Add Category</Link>
            <Link to="/addNews">Add News</Link>
            <Link to="/">Home</Link>
        </div>
      </div>
    </>
  )
}

export default AdminSidebar
