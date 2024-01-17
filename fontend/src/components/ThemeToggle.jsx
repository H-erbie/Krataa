import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const storedData = localStorage.getItem("krataa-ui-theme");
  const [theme, setTheme] = useState(JSON.parse(storedData) || "light");
  console.log();
  const handleClick = () => {
    if (theme === "dark") {
      localStorage.setItem("krataa-ui-theme", JSON.stringify("light"));
      setTheme("light");
    } else {
      localStorage.setItem("krataa-ui-theme", JSON.stringify("dark"));
      setTheme("dark");
    }
  };
  useEffect(() => {
    theme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [theme]);
  return (
    <button
      className="hover:bg-gray-200 dark:hover:bg-[#181B1F]  rounded-[100%] p-[10px]"
      onClick={handleClick}
    >
      {theme === "light" ? (
        <Moon className="text-xl" />
      ) : (
        <Sun className="text-xl" />
      )}
    </button>
  );
};

export default ThemeToggle;
