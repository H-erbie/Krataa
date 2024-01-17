import React from "react";
import HeaderBooks from "./HeaderBooks";

const Header = () => {
  return (
    <>
      <section className="header">
        <div className="w-screen sm:pl-24 gap-7 flex flex-col justify-center items-start text-white h-screen backdrop-brightness-[0.6]">
          <div className="lg:text-5xl mx-auto sm:mx-0  md:text-4xl sm:text-3xl text-2xl w-[80%]  lg:w-3/5  leading-normal font-bold font uppercase">
            sign in to get access to any book from your device on krataa
          </div>
          <div className="text-lg mx-auto sm:mx-0  w-3/4 lg:w-2/5 capi">
            Krataa is a library management system that enables everyone, mostly
            students to get easy access to books
          </div>
          <a
            href="/signin"
            className="btn mx-auto sm:mx-0   p-2 px-4 font-bold  hover:scale-110 transition-all bg-white cursor-pointer text-black"
          >
            SIGN IN
          </a>
        </div>
      </section>{" "}
      <HeaderBooks />
    </>
  );
};

export default Header;
