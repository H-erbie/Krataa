import React, { useState, useEffect } from "react";
import {
  FaMailBulk,
  FaLock,
  FaUber,
  FaUser,
  FaUserGraduate,
  FaGraduationCap,
} from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Cookies from "universal-cookie";
import { useGlobalContext } from "./context";
const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { getUser, getCookie } = useGlobalContext();

const userInfo = {
      fullname,
      email,
      username,
      password,
    };
    const cookies = new Cookies()
    useEffect(() => {
      if (getCookie) {
        navigate("/");
      }
     
    }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr('')

    try {
     const res = await fetch("http://localhost:3001/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      setBusy(false);
      setFullname("");
      setUsername("");
      setEmail("");
      setPassword("");
      if (res.ok) {
        const {token} = await res.json()
        cookies.set('accessToken', token, {
          path: '/',
          https: true,
          secure: true,
          sameSite: "lax"
        })
      getUser()
      navigate("/");

      }
      else{
        const errMsg = await res.json()
        setErr(errMsg.msg);
        setBusy(true);
      }
        
    } catch (error) {
      console.log(error.message);
      setErr(error.message);
      setBusy(true);

    } 
  };
  return (
    <main className="flex min-h-[100vh] items-center justify-center ">

      <a
        href="/"
        className="absolute top-20 flex items-center gap-x-1 left-1/4 hover:bg-gray-200 dark:dark:bg-[#3f434a] p-2 rounded-md"
      >
        <ArrowLeft />
        Go home{" "}
      </a>
      <span className='absolute top-[70px] flex items-center gap-x-1 right-2 sm:right-1/4  p-2  rounded-md'><ThemeToggle/></span>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-full  p-16 py-5 rounded-md  h-5/6"
      >
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        <div className="inp-field w-[60%] min-w-[250px] mx-auto">
          <AiOutlineUser className="text-xl" />
          <input
            type="text"
            placeholder="fullname"
            required
            className="bg-gray-200 w-full text-black"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="inp-field w-[60%] min-w-[250px] mx-auto">
            <FaUser className="text-xl" />
            <input
              type="text"
              placeholder="username"
              required
              className="bg-gray-200 w-full text-black"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="inp-field w-[60%] min-w-[250px] mx-auto">
            <FaMailBulk className="text-2xl" />
            <input
              type="email"
              required
              placeholder="Email"
              className="bg-gray-200 w-full text-black"
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
          className="bg-black dark:bg-white
          dark:hover:bg-gray-200 dark:text-black p-2 w-[40%] max-w-[300px] mx-auto hover:bg-gray-900 text-white text-center disabled:opacity-40"
          disabled={busy}
        >
          {busy ? "signing up..." : 'sign up'}
        </button>

        <p className="mt-5 text-center">
          Already have an account?{" "}
          <a href="/signin" className="font-bold hover:underline text-center">
            sign in
          </a>
        </p>
        <p className="text-red-600 w-max mx-auto text-lg">{err}</p>
      </form>
    </main>
  );
};

export default Signup;
