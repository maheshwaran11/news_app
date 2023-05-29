import React from 'react'
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { Route, Routes } from 'react-router-dom';

const DefaultLayout = ({children}) => { 


  return (
    <>
        <NavBar />

        <Routes>
            <Route path='/' exact element={<Home />} key="0"></Route>
            <Route path='home' element={<Home />} key="1"></Route>
            <Route path='cinema' element={<Cinema />}  key="2"></Route>
            <Route path='contact' element={<About />}  key="3"></Route>
            <Route path='login' element={<Login />}  key="4"></Route>
            <Route path='register' element={<Register />}  key="5"></Route>
            <Route path='dashboard' element={<Dashboard />}  key="6"></Route>
            <Route path='addCategory' element={<AddCategory />}  key="7"></Route>
            <Route path='addNews' element={<AddNews />}  key="6"></Route>
            <Route path='newsDetails/:id/:title' element={<NewsDetails />}  key="6"></Route>
            <Route path='categories/:id/:title' element={<Categories />}  key="6"></Route>
          </Routes>

        <main>
            {children}
        </main>
        <Footer />
    </>
  )
}

export default DefaultLayout
