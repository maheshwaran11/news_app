import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import Logo from './HeaderComponents/Logo';
import Menu from './HeaderComponents/Menu';
import Socials from './HeaderComponents/Socials';
import Search from './HeaderComponents/Search';
import BreakingNews from './HeaderComponents/BreakingNews';
import { Icon } from '@mui/material';


const NavBar = () => {
    
    const [user, setUser] = useState('');
    const [mobileMenuOpenFlag, setMobileMenuOpenFlag] = useState(false);

    useEffect(() => {
        if(localStorage.getItem("Auth")) {
            setUser(localStorage.getItem("AuthUser"))
        } else {
            setUser('')
        }
    }, [])

    const mobileMenuOpen = () => {
        setMobileMenuOpenFlag(!mobileMenuOpenFlag);
    }

  return (
    <>
    <header className={mobileMenuOpenFlag ? 'mobileMenuOpen' : ''}>
        <div className='container-fluid'>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col col-4'>
                        
                    </div>
                    <div className='col col-4 text-center'>
                        <div className='d-md-none'>
                            <Socials />
                        </div>
                    </div>
                    <div className='col col-4'>
                        <div className='d-md-none'>
                            <div className='loginwrapper text-right'>
                            
                                {
                                    user ? <>
                                        <Link to='/dashboard'><span>{user}</span></Link>
                                    </> : <>
                                    <Link to="/login" className='loginLink'>Login</Link>                                
                                    </>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='container-fluid menuWrapper'>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col col-3'>
                        <Logo />
                    </div>
                    <div className='col col-6 text-center'>
                        <div className='mobileMenuIcon d-lg-none'>
                            <button onClick={mobileMenuOpen}>
                            {
                                mobileMenuOpenFlag ? <Icon>close</Icon> : <Icon>menu</Icon>
                            }
                                
                            </button>
                        </div>
                        <div className='mobileMenuWrapper'>
                            <Menu />
                            <div className='d-lg-none'>
                                <Socials />

                                <div className='loginwrapper text-right'>
                                    {
                                        user ? <>
                                            <Link to='/dashboard'><span>{user}</span></Link>
                                        </> : <>
                                        <Link to="/login" className='loginLink'>Login</Link>                                
                                        </>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col col-3 text-right'>
                        <Search />
                    </div>
                    
                </div>
            </div>
        </div>

        <div className='container-fluid b-newsWrapper'>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col col-12'>
                        <BreakingNews />
                    </div>                    
                </div>
            </div>
        </div>
        <Outlet />
    </header>
    
    </>
  )
}

export default NavBar
