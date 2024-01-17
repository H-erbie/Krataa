import React from "react";
import { Link } from "react-router-dom";
import Category from "./category";

import { FaBars } from "react-icons/fa";

const HeaderBooks = () => {

  return (
    <section className="p-7 px-2 sm:px-16">
  
      <h2 className="font-bold mb-4 text-center  text-2xl">A glimpse of the many books available</h2>
      <Category/>
      <Category/>
      <Category/>
      <Category/>
         </section>
  );
};

export default HeaderBooks;
