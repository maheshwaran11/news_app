import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { GetAllCategories } from '../../services/api';

const Menu = () => {

    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statusFlag, setstatusFlag] = useState(false);
    const [category, setCategory] = useState("");
    const [menuList, useMenuList] = useState([]);

    useEffect(() => {
        fetchAllCategories();
      }, []);
    
    
      const fetchAllCategories = () => {
          GetAllCategories().then((response) => {
            let data = response.data.data.splice(0, 5);
            setCategoryList(data); 
            
            setstatusFlag(true);
            if(response.data.status === 1) {
                setstatusFlag(true);
            } else {
                setstatusFlag(false);
            }
        }).catch((err) => {
            setstatusFlag(false);
        }).finally(() => {
            setLoading(false);
        });
      }
    

    

    return (
        <>
        <div className='menu'>
        <Link to='/'>Home</Link>
            {
                
                categoryList.map((menuItem, index) => {
                    return <Link to={`/categories/${menuItem.id}/${menuItem.title}`} key={index}>{menuItem.title}</Link>    
                })
            }
        </div>
        </>
    )
}

export default Menu
