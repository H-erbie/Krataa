import React from "react";
import logo from "../assets/logo.png";
import {FaUser} from 'react-icons/fa'

const Navbar = () => {
  return (
    <div className="fixed bg-white z-20 border left-0 top-0 flex p-x-3 justify-between w-screen">
      <a href="/" className="flex items-center">
        <img src={logo} alt="logo" className="w-20"/>
        <p className="capitalize font-bold hover:text-gray-700 transition-all -ml-3">KRATAA</p>
      </a>
      <div className="flex items-center gap-2 hover:text-gray-700 transition-all cursor-pointer mr-7">
        <a href="/signin"><FaUser className="text-xl"/></a>
        {/* <a href="/signin" className="capitalize font-semibold">SIGN IN</a> */}
      </div>
    </div>
  );
};

export default Navbar;
