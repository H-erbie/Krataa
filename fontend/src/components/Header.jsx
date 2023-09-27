import React from 'react'

const Header = () => {
  return (
    <section className='header'
    >
      <div className="w-screen pl-8 gap-7 flex flex-col justify-center items-start text-white h-screen backdrop-brightness-[0.7]">
        <div className="text-5xl w-2/5  leading-normal font-bold font">ACCESS ANY BOOK FROM YOUR DEVICE ON KRATAA</div>
        <div className="text-lg w-2/5">krataa is a library management system built by the University of Energy and Natural Resources</div>
        <a href='/signin' className='btn  p-2 px-4 font-bold  hover:scale-110 transition-all bg-white cursor-pointer text-black'>SIGN IN</a>
      </div>
    </section>
  )
}

export default Header