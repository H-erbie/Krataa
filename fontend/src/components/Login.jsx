import React, { useState, useEffect } from "react";
import { FaMailBulk, FaLock } from "react-icons/fa";
import Cookies from "universal-cookie";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useGlobalContext } from "./context";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const cookies = new Cookies()
  const navigate = useNavigate();
  const {  getCookie } = useGlobalContext();

  useEffect(() => {
    if (getCookie) {
      navigate("/");
    }
   
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const response = await fetch("http://localhost:3001/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      setBusy(false);
      setEmail("");
      setPassword("");
      if (response.ok) {
        const {token} = await response.json()
        cookies.set('accessToken', token, {
          path: '/',
          https: true,
          secure: true,
          sameSite: "lax"
        })
        navigate('/')
      }
      
      // navigate("/user/library");
    } catch (error) {
      console.log(error);
      // setErr(error.message)
    }
  };
  return (
    <main className="flex min-h-[100vh] items-center justify-center">
    <a href="/" className="absolute top-28 flex items-center gap-x-1 left-1/4 hover:bg-gray-200 dark:hover:dark:bg-[#3f434a] p-2 rounded-md"><ArrowLeft/>Go home </a> 
     <span className='absolute top-[100px] flex items-center gap-x-1 right-2 sm:right-1/4  p-2  rounded-md'><ThemeToggle/></span>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full p-16 py-12 rounded-md  "
      >
        <h2 className="text-2xl font-bold text-center">Sign In</h2>

        <div className="flex flex-col w-full gap-5">
          <div className="inp-field w-[60%] min-w-[250px] mx-auto">
            <FaMailBulk className="text-2xl" />
            <input
              type="email"
              placeholder="Email"
              required
              className="bg-gray-200 w-full  text-black"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="inp-field w-[60%] min-w-[250px] mx-auto">
            <FaLock className="text-xl" />
            <input
              type="password"
              placeholder="Password"
              required
              className="bg-gray-200 w-full text-black"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={busy}
          className="bg-black dark:text-black  dark:bg-white p-2 w-[40%] max-w-[300px] mx-auto hover:bg-gray-900 dark:hover:bg-gray-200 disabled:opacity-40 text-white text-center"
        >
          sign in
        </button>

        <p className="mt-6 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="font-bold hover:underline text-center">
            sign up
          </a>
        </p>
        <p className="text-red-600 text-lg">{err}</p>
      </form>
    </main>
  );
};

export default Login;
