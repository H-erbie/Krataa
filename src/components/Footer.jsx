import React from 'react'
import logo from "../assets/logo.png";
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const links = [
    'about us',
    'contact us',
    'sponsors',
    'FAQ'
  ]
  const socials = [
    {
      id: 1,
      icon: <FaFacebook/>
    },
    {
      id: 2,
      icon: <FaInstagram/>
    }, {
      id: 3,  
      icon: <FaTwitter/>
    },
    {
      id: 4,
      icon: <img src={logo} alt="something"  className='w-7'/>
    },
    
  ]
  if(location.pathname !== "/signin" &&
  location.pathname !== "/signup")return <footer className='bg-[#3f434a] flex flex-col gap-3 justify-center h-64 text-white '>
     <div className=' flex justify-center items-center'>
      
      <div className="flex gap-3">
        {
          links.map((link, index) => {
            return <a href='#' key={index} className='text-lg capitalize hover:text-gray-500 cursor-pointer'>{link}</a>
          })
        }
      </div>
      {/* <img src={logo} alt="logo" className='w-60'/> */}
    </div>
        <div className="flex gap-2 items-center mx-auto w-max mb-5 text-center">
          {
            socials.map((social) => {
              const {id, icon} = social
              return <a href='#' key={id} className='text-2xl hover:text-gray-500 cursor-pointer'>{icon}</a>
            })
          }

        </div>
    <p className='text-center'>All rights reserved</p>
 </footer>
  }

export default Footer