import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { ChevronDown, X, AlignRight, User, Search } from "lucide-react";
import Cookies from "universal-cookie";
import { useGlobalContext } from "./context";
const Navbar = () => {
  const navMenuListRef = useRef(null); // Create a ref to the NavigationMenuList
  const navMenuSearchIconRef = useRef(null); // Create a ref to the NavigationMenuList
  const { getCookie, currentUser } = useGlobalContext();
  const userObj = localStorage.getItem("currentUser");
  const handleClickOutside = (event) => {
    if (
      event.target.parentNode !== navMenuListRef.current.parentNode &&
      event.target !== navMenuSearchIconRef.current &&
      event.target.parentNode !== navMenuSearchIconRef.current &&
      !event.target.parentNode.classList.contains("lucide-search") &&
      !event.target.classList.contains("lucide-search")
    ) {
      setSearchOverlay(false);
    }
  };
  const [sidemenu, setSidemenu] = useState(false);
  const [searchOverlay, setSearchOverlay] = useState(false);
  const showSidemenu = () => {
    setSidemenu(true);
  };
  const hideSidemenu = () => {
    setSidemenu(false);
  };
  
  const location = useLocation();
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
  const navlinks = [
    {
      name: "contribute",
      link: "/contribute",
    },
    {
      name: "about",
      link: "/about",
    },
    {
      name: "contact",
      link: "/contact",
    },
  ];

  if (location.pathname !== "/signin" && location.pathname !== "/signup")
    return (
      <>
        <NavigationMenu
          onClick={handleClickOutside}
          className="fixed border-b dark:border-transparent bg-white  dark:bg-[#3f434a] z-30  left-0 top-0  py-4 "
        >
          <NavigationMenuList className="items-center px-7 sm:px-10 justify-between">
            <NavigationMenuItem>
              <a href="/" className="flex items-center gap-5">
                <img src={logo} alt="logo" className="w-9" />
                <p
                  className={
                    searchOverlay ? "logo-name hidden sm:block" : "logo-name"
                  }
                >
                  KRATAA
                </p>
              </a>
            </NavigationMenuItem>
            <div className="hidden lg:flex justify-between items-center gap-x-8">
              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none flex items-center gap-x-1">
                    {" "}
                    Categories <ChevronDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white dark:border-transparent dark:bg-[#3f434a]">
                    <ul className="grid gap-3 p-4 pt-7 md:w-[500px] md:grid-cols-3 grid-cols-2 lg:w-[600px] place-items-start">
                      {categories.map((category, index) => (
                        <a
                          href={category.link}
                          key={index}
                          className="capitalize px-3 py-2 hover:bg-gray-200 dark:hover:bg-[#181B1F] rounded-lg"
                        >
                          <DropdownMenuItem className="outline-none">
                            {category.name}
                          </DropdownMenuItem>
                        </a>
                      ))}{" "}
                    </ul>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
              {navlinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <a
                    href={link.link}
                    className="no-underline capitalize px-3 py-2 dark:hover:bg-[#181B1F] hover:bg-gray-200 rounded-lg"
                  >
                    {link.name}
                  </a>
                </NavigationMenuItem>
              ))}
            </div>
            <NavigationMenuItem
              className={
                searchOverlay ? "lg-search flex w-[80%] sm:w-max" : "lg-search"
              }
            >
              <input
                ref={navMenuListRef}
                type="search"
                name="search"
                placeholder="search books"
                className="dark:bg-gray-200 focus:outline-black dark:focus:outline-gray-200 focus:outline border w-[90%] px-2 rounded-md"
                onClick={() => setSearchOverlay(true)}
              />
              <button className="no-underline dark:hover:bg-[#181B1F]  p-2 hover:bg-gray-200 rounded-lg">
                <Search />
              </button>
            </NavigationMenuItem>
            <div
              className={
                searchOverlay
                  ? " hidden sm:flex gap-x-5 items-center"
                  : "flex gap-x-5 items-center"
              }
            >
              <NavigationMenuItem
                ref={navMenuSearchIconRef}
                className="sm-search"
                onClick={() => setSearchOverlay(true)}
              >
                <Search />
              </NavigationMenuItem>

              <NavigationMenuItem>
                {" "}
                <a
                  href={getCookie ? "/user-profile" : "/signin"}
                  className="flex items-center"
                >
                  <div className="flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-200 transition-all cursor-pointer">
                    <User className="text-xl" />
                    <span className="capitalize hidden sm:block font-semibold">
                      {currentUser ? currentUser?.name : "Sign In"}
                    </span>
                  </div>
                </a>
              </NavigationMenuItem>

              <NavigationMenuItem className="hidden lg:block">
                <ThemeToggle />
              </NavigationMenuItem>

              <NavigationMenuItem
                className="lg:hidden block cursor-pointer text-2xl"
                onClick={showSidemenu}
              >
                <AlignRight />
              </NavigationMenuItem>
              <div
                className={sidemenu ? "overlay" : "overlay hidden"}
                onClick={hideSidemenu}
              ></div>
              <div
                className={
                  sidemenu
                    ? "right-0 transition-all top-0 fixed h-screen w-[20rem] sm:w-[24rem] bg-white dark:bg-[#3f434a]"
                    : "-right-[100vh] transition-all top-0 absolute h-screen w-[24rem] bg-white"
                }
              >
                <X
                  className="absolute cursor-pointer top-4 h-8 w-10 right-5"
                  onClick={hideSidemenu}
                />
                <span className="absolute top-3 left-5">
                  <ThemeToggle />
                </span>

                <div className="">
                  <p className="text-center pt-3 capitalize text-lg font-semibold">
                    categories
                  </p>
                </div>
              </div>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
        <div
          className={searchOverlay ? "searchOverlay block" : "searchOverlay"}
          onClick={() => setSearchOverlay(false)}
        ></div>
      </>
    );
};

export default Navbar;
