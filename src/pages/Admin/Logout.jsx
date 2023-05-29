import React from 'react'
import { useNavigate } from 'react-router-dom';


const Logout = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("Auth");
        localStorage.removeItem("AuthUser");
        navigate('/login');
    }
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Logout
