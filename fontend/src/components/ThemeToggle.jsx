import React, { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(false);
  return (
    <button className="hover:bg-gray-200 border rounded-md p-[10px]" onClick={()=> setTheme(!theme)}>
      {theme ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
    </button>
  );
};

export default ThemeToggle;
