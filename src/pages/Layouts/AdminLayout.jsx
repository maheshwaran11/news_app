import React from 'react'
import AdminSidebar from '../Admin/adminComponents/AdminSidebar';
import AdminHeader from '../Admin/adminComponents/AdminHeader';

const AdminLayout = ({children}) => {


  return (
    <div className='adminContent' id='dashBoardPage'>
        <div className='container-fluid'>
            <div className='row'>
                
                    <div className='col-3 bg-1'>
                        <AdminSidebar />
                    </div>
                    <div className='col-9'>
                        <AdminHeader />
                        {children}
                    </div>
                
            </div>
        </div>
        

      
      
      
    </div>
  )
}

export default AdminLayout
