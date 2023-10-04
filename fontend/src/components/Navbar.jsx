import React from "react";
import logo from "../assets/logo.png";
import {FaUser} from 'react-icons/fa'
import {useLocation} from 'react-router-dom'
const Navbar = () => {
  const location = useLocation()
  console.log(location)
  return (
    <div className="fixed bg-white z-20 border left-0 top-0 flex px-7 py-2 justify-between w-screen">
      <a href="/" className="flex items-center gap-5">
        <img src={logo} alt="logo" className="w-9"/>
        <p className="capitalize font-bold hover:text-gray-700 transition-all -ml-3">KRATAA</p>
      </a>
      {location.pathname === '/' && <a href="/user/signin" className="flex items-center"><div className="flex items-center gap-2 hover:text-gray-700 transition-all cursor-pointer mr-7">
        <FaUser className="text-xl"/>
         <span className="capitalize font-semibold">SIGN IN</span>
      </div>
      </a>
      }
    </div>
  );
};

export default Navbar;
