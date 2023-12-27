import React from "react";
import { Link } from "react-router-dom";
const headerGenre = [
  {
    id: 1,
    name: 'sci-fi',
  },
  {
    id: 2,
    name: 'romance'
  },
  {
    id: 3,
    name: 'adventure'
  },
  {
    id: 4,
    name: 'novel'
  }
]

const HeaderBooks = () => {
  return (
    <section className="p-7 px-16">
      <h2 className="font-semibold capitalize text-xl">
        here's <span className="normal-case">a</span> glimpse of the real deal
      </h2>
      <div className="flex flex-col gap-5 mt-5">
        {
          headerGenre.map(genre => {
            const {id, name} = genre;
            return <div className=""key={id}>
              <h3 className="capitalize text-lg font-semibold">{name}</h3>
              <p className="">books</p>
            </div>
          })
        }
      </div>
        <a href='/library' className="mx-auto w-max">see more</a>
    </section>
  );
};

export default HeaderBooks;
