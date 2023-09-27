import React from 'react'
import logo from "../assets/logo.png";


const Footer = () => {
  const links = [
    'about us',
    'contact us',
    'sponsors',

  ]
  return (
 <footer className='bg-[#111] h-64 text-white '>
     <div className=' flex justify-center items-center'>
      <div className="">
        {
          links.map(link => {
            return <div className="">{link}</div>
          })
        }
      </div>
      <img src={logo} alt="logo" className='w-60'/>
    </div>
    <p className='text-center'>All rights reserved</p>
 </footer>
  )
}

export default Footer