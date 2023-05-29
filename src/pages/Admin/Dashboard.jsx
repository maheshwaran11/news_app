import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../Layouts/AdminLayout';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("Auth")) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    }, [])

    




  return (
    <AdminLayout>
        <div className='dashboardContent'>
            Dashboard
        </div>
    </AdminLayout>
  )
}

export default Dashboard
