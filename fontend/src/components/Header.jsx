import React from "react";
import HeaderBooks from "./HeaderBooks";

const Header = () => {
  return (
    <section className="header">
      <div className="w-screen pl-24 gap-7 flex flex-col justify-center items-start text-white h-screen backdrop-brightness-[0.6]">
        <div className="text-5xl w-3/5  leading-normal font-bold font uppercase">
          sign in to get access to any book from your device on krataa
        </div>
        <div className="text-lg w-2/5 capi">
          Krataa is a library management system that enables everyone, mostly
          students to get easy access to books
        </div>
        <a
          href="/signin"
          className="btn  p-2 px-4 font-bold  hover:scale-110 transition-all bg-white cursor-pointer text-black"
        >
          SIGN IN
        </a>
      </div>
      <HeaderBooks />
    </section>
  );
};

export default Header;
