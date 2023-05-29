import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logout from '../Logout'

const AdminHeader = () => {
    const [user, setUser] = useState('')

    useEffect(() => {
        if(localStorage.getItem("Auth")) {
            setUser(localStorage.getItem("AuthUser"))
        } else {
            setUser('')
        }
    }, [])
    
  return (
    <div className='admin_header bg-1'>
      <div className='text-right'>
      {
        user ? <>
            <Link to='/dashboard'><span>{user}</span></Link>
        </> : <>
        <Link to="/login" className='loginLink'>Login</Link>                                
        </>
    }
    <Logout />
      </div>
      
    </div>
  )
}

export default AdminHeader
