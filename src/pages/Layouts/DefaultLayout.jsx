import React from 'react'
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const DefaultLayout = ({children}) => { 


  return (
    <>
        <NavBar />
        <main>
            {children}
        </main>
        <Footer />
    </>
  )
}

export default DefaultLayout
