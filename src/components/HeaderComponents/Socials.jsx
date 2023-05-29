import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Facebook from "../../assets/images/icons/facebook.svg";
import Whatsapp from "../../assets/images/icons/whatsapp.svg";
import Youtube from "../../assets/images/icons/youtube.svg";

const Socials = () => {
  return (
    <div className='socials'>
        <Link to="/" className=''><img src={Facebook} alt='Social' /></Link>
        <Link to="/" className=''><img src={Youtube} alt='Social' /></Link>
        <Link to="/" className=''><img src={Whatsapp} alt='Social' /></Link>
    </div>
  )
}

export default Socials
