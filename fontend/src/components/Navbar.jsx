import React from "react";
import logo from "../assets/logo.png";
import { FaUser, FaSearch, FaChevronDown } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
const Navbar = () => {
  const location = useLocation();
  console.log(location);
  const categories = [
    {
      name: "sci-fi",
      link: "",
    },
    {
      name: "history",
      link: "",
    },
    {
      name: "adventure",
      link: "",
    },
    {
      name: "romance",
      link: "",
    },
    {
      name: "nature",
      link: "",
    },
  ];
  return (
    <div className="fixed bg-white z-20 border left-0 top-0 flex px-7 py-2 items-center justify-between w-screen">
      <a href="/" className="flex items-center gap-5">
        <img src={logo} alt="logo" className="w-9" />
        <p className="capitalize font-bold hover:text-gray-700 transition-all -ml-3">
          KRATAA
        </p>
      </a>

      <div className="flex gap-7 capitalize">
        <div className="cursor-pointer p-2 hover:bg-gray-200 rounded-lg">
          <span className="flex gap-1 items-center">
            categories <FaChevronDown />
          </span>{" "}
        </div>
        <a href="/contribute" className="no-underline p-2 hover:bg-gray-200 rounded-lg">
          contribute
        </a>
        <a href="/about" className=" no-underline p-2 hover:bg-gray-200 rounded-lg">
          about
        </a>
        <a href="/contact" className="no-underline  p-2 hover:bg-gray-200 rounded-lg">
          contact
        </a>
        <a href="/search" className="no-underline flex gap-1 items-center p-2 hover:bg-gray-200 rounded-lg">
          search <FaSearch/>
        </a>
      </div>
      <div className="flex gap-4 items-center">
        {location.pathname === "/" && (
          <a href="/signin" className="flex items-center">
            <div className="flex items-center gap-2 hover:text-gray-700 transition-all cursor-pointer mr-7">
              <FaUser className="text-xl" />
              <span className="capitalize font-semibold">SIGN IN</span>
            </div>
          </a>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
