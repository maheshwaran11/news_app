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
import NavBar from './components/NavBar';

export const categoryImagePath = "https://tnsltu.in/newsAPI/Images/Categories/";
export const newImagePath = "https://tnsltu.in/newsAPI/Images/News/";

const App = () => {

  
  return (
    <>
      <Home />
      {/* <RouterProvider router={router} /> */}
        {/* <NavBar /> */}
          
    </>
  )
}

export default App
