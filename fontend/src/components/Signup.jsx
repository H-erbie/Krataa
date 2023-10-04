import React, { useState } from "react";

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
const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [program, setProgram] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const res = await fetch("http://localhost:3001/api/user/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     fullname: fullname,
    //     email: email,
    //     username: username,
    //     program: program,
    //     password: password,
    //   }),
    // });
    console.log({
      fullname: fullname,
      email: email,
      username: username,
      program: program,
      password: password,
    });
    setFullname("");
    setUsername("");
    setEmail("");
    setPassword("");
    setProgram("");
    navigate("/library");
  };
  return (
    <section className="flex items-center justify-center bg-gray-100">
      <form
        action=""
        className="flex shadow-lg flex-col gap-2 bg-white p-16 py-5 rounded-md  h-5/6"
      >
        <div className="flex items-center justify-center gap-10">
          <img src={logo} alt="logo" className="w-11" />
          <p className="font-bold -ml-[2rem]">KRATAA</p>
        </div>

        <div className="inp-field">
          <AiOutlineUser className="text-xl" />
          <input
            type="text"
            placeholder="fullname"
            className="bg-gray-200 text-black"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="inp-field">
            <FaUser className="text-xl" />
            <input
              type="text"
              placeholder="username"
              className="bg-gray-200 text-black"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="inp-field">
            <FaMailBulk className="text-2xl" />
            <input
              type="text"
              placeholder="Email"
              className="bg-gray-200 text-black"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            
          </div>
          <div className="inp-field">
            <FaGraduationCap className="text-xl" />
            <select
              name=""
              id=""
              placeholder="choose a program"
              className="p-2 px-3 w-60 rounded-md"
              onChange={(e) => setProgram(e.target.value)}
              value={program}
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Medical Laboratory">
                Medical Laboratory
              </option>{" "}
              <option value="Nursing">Nursing</option>{" "}
              <option value="Information Technology">
                Information Technology
              </option>{" "}
              <option value="Natural Resources">Natural Resources</option>{" "}
              <option value="Electrical Engineering">
                Electrical Engineering
              </option>{" "}
            </select>
            {/* <input
              type="text"
              placeholder="program"
              className="bg-gray-200 text-black"
              
            /> */}
          </div>
          <div className="inp-field">
            <FaLock className="text-xl" />
            <input
              type="password"
              placeholder="Password"
              className="bg-gray-200 text-black"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-black p-2 hover:bg-gray-900 text-white text-center"
        >
          sign up
        </button>

        <p className="mt-5 text-center">
          Already have an account?{" "}
          <a
            href="/user/signin"
            className="font-bold hover:underline text-center"
          >
            sign in
          </a>
        </p>
        <p className="uppercase text-center">or</p>
        <div className="text-center">
          {" "}
          <a href="/admin/signin" className="font-bold">
            sign in
          </a>{" "}
          or{" "}
          <a href="/admin/signup" className="font-bold">
            sign up
          </a>{" "}
          as an admin
        </div>
      </form>
    </section>
  );
};

export default Signup;
