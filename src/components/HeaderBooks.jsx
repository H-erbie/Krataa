import React, { useState, Suspense } from "react";
import { Link } from "react-router-dom";
import Category from "./Category";

import { FaBars } from "react-icons/fa";

const HeaderBooks = () => {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);

  const getAllCategories = (newBooks) => {
    newBooks.forEach((book) => {
      if (!categories.includes(book.genre)) {
        setCategories([...categories, book.genre]);
      }
    });
  };
  const getAllBooks = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/books", {
        method: "GET",
      });
      if (res.ok) {
        const newBooks = await res.json();
        setBooks(newBooks);
        // getAllCategories(newBooks)
        // console.log()
        newBooks.forEach((book) => {
          if (!categories.includes(book.genre)) {
            setCategories([...categories, book.genre]);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useState(() => {
    getAllBooks();
  }, []);
  // console.log(categories)

  return (
    <section className="p-7 pt-16 px-2 sm:px-16">
      {categories.map((category, index) => {
        const categoryBooks = books.filter((book) => book.genre == category);
        return (
          <Suspense key={index} fallback={
          [1,2,3].map((box, index) => (
         <div className="animate-pulse w-52 h-52 bg-gray-400 rounded-sm"></div>

          ))}>
    
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
