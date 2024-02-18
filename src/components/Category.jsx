import React from 'react'
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import book from "../assets/timemachine.jpg";
import { ArrowRight } from 'lucide-react';


const Category = ({genre, books}) => {
  console.log(books)
    const headerGenre = [
        {
          id: 1,
          name: "sci-fi",
        },
        {
          id: 2,
          name: "romance",
        },
        {
          id: 3,
          name: "adventure",
        },
        {
          id: 4,
          name: "novel",
        },
        {
          id: 1,
          name: "sci-fi",
        },
        {
          id: 2,
          name: "romance",
        },
        {
          id: 3,
          name: "adventure",
        },
        {
          id: 4,
          name: "novel",
        },
        {
          id: 1,
          name: "sci-fi",
        },
        {
          id: 2,
          name: "romance",
        },
        {
          id: 3,
          name: "adventure",
        },
        {
          id: 4,
          name: "novel",
        },
      ];
  return (
    <>
<div className="flex justify-between items-center px-4">
<h2 className='text-2xl my-10 font-semibold capitalize'>{genre}</h2>
<a href='' className='flex gap-x-1 items-center'>more books <ArrowRight className='h-4 w-4'/></a>
</div>
<Carousel
        opts={{
          align: "start",
        }}
        className="w-full relative"
      >
        {" "}
        <CarouselPrevious className='absolute border-gray-500 dark:border-none bg-white hover:bg-gray-300 transition-all dark:hover:bg-gray-800 cursor-pointer border-[0.05] dark:bg-[#3f434a]  rounded-[100%] left-5 z-10  py-2 px-2 top-1/2'/>
        <CarouselContent className='border-none'>
          {books.map((book, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 transition-all hover:-translate-y-2 px-3 border-none lg:basis-1/3 border"
            >
                <Card className='w-40 border-none'>
                  <CardContent className=" aspect-square items-center justify-center p-6">
                    <img src={book.img} alt='book' className='w-full rounded-md'/>
                                    <p className='mt-2 capitalize text-center'>{book.name}</p>
</CardContent>
                </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className='absolute border-gray-500 dark:border-none bg-white hover:bg-gray-300 transition-all dark:hover:bg-gray-800 cursor-pointer border-[0.05] dark:bg-[#3f434a]  rounded-[100%] right-5 z-10 py-2 px-2 top-1/2'/>
      </Carousel>
      </>
  )
}

export default Category