import React from 'react'
import { 
  BrowserRouter, 
  Route,
  Routes
} from 'react-router-dom'

import './App.css';
import './Style.scss'
import Home from './pages/Home';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import Register from './pages/Admin/Register';
import AddCategory from './components/AddCategory';
import AddNews from './components/AddNews';
import Cinema from './pages/Cinema';
import About from './pages/About';
import NewsDetails from './pages/NewsDetails';
import Categories from './pages/Categories';

export const categoryImagePath = "https://tnsltu.in/newsAPI/Images/Categories/";
export const newImagePath = "https://tnsltu.in/newsAPI/Images/News/";

const App = () => {

  
  return (
    <>
      <Home />
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} key="0"></Route>
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
      </BrowserRouter>
    </>
  )
}

export default App
