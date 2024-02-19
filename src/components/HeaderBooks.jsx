import React, { useState, Suspense } from "react";
import { Link } from "react-router-dom";
import Category from "./Category";

import { FaBars } from "react-icons/fa";

const HeaderBooks = () => {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);

  const getAllBooks = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/books", {
        method: "GET",
      });
      if (res.ok) {
        const newBooks = await res.json();
        setBooks(newBooks);

        const bookGenres = newBooks.map((book) => book.genre.toLowerCase());
        const uniqueGenres = new Set(bookGenres);
        setCategories(Array.from(uniqueGenres));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useState(() => {
    getAllBooks();
  }, []);
if(books.length === 0){

  return <div className="flex pt-28 px-2 sm:px-16 items-center flex-col gap-y-5 min-h-screen">
      {[1, 2, 3].map((box, index) => (

    <div       key={index}
    className="flex justify-between gap-x-7">
{
  [1, 2, 3].map((box, index) => (
    <div 
      key={index}
      className="animate-pulse w-52 h-36  bg-gray-400 rounded-md"
    ></div>))
}
  </div>))
}
  </div>
}
  return (
    <section className="p-7 min-h-screen pt-16 px-2 sm:px-16">
      {categories.map((category, index) => {
      const categoryBooks = books.filter((book) => book.genre == category);
      return (
        <Suspense
          key={index}
          fallback={[1, 2, 3].map((box, index) => (
            <div 
              key={index}
              className="animate-pulse w-52 h-52 bg-gray-400 rounded-sm"
            ></div>
          ))}
        >
          <Category genre={category} books={categoryBooks} />
        </Suspense>
      );
    })}
      {/* <h2 className="font-bold mb-4 text-center  text-2xl">A glimpse of the many books available</h2> */}
      {/* <Category/>
      <Category/>
      <Category/>
      <Category/> */}
    </section>
  );
};

export default HeaderBooks;
