import React from "react";
import uenrLibrary from "../../src/assets/Books.jpg";

const Contact = () => {
  return (
    <main className="min-h-[100vh] flex pt-20">
     <div className="w-1/2 relative">
     <img
        src={uenrLibrary}
        alt="uenr library"
        className="w-full h-full brightness-[0.7]  object-cover"
      />
      <p className="absolute top-1/2 left-20 text-6xl text-white font-bold">connect with us</p>
     </div>
      <form
        action=""
        className="w-1/2 flex flex-col items-center justify-center gap-y-4"
      >
        <h2>We're just a form away📄</h2>
        <input type="text" placeholder="fullname" className="w-[80%] border  dark:border-none" />
        <input type="email" placeholder="email" className="w-[80%] border dark:border-none" />
        <input type="text" placeholder="subject" className="w-[80%] border dark:border-none" />
        <textarea
          name=""
          id=""
          placeholder="message"
          className="w-[80%] rounded-md p-2 border dark:border-none"
          cols="30"
          rows="10"
        ></textarea>
        <button className="bg-black text-white dark:text-black hover:bg-gray-500 dark:bg-gray-400 p-3 dark:hover:bg-white transition-all">Get in touch!✈</button>
      </form>
    </main>
  );
};

export default Contact;
