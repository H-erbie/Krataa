import React, { useState } from 'react'

import { FaMailBulk, FaLock, FaUber, FaUser, FaUserGraduate, FaGraduationCap } from 'react-icons/fa'
import {AiOutlineUser} from 'react-icons/ai'
import logo from "../assets/logo.png";
import {useNavigate} from 'react-router-dom'

const Signup = () => {
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [program, setProgram] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault();
         fetch('http://localhost:3001/api/user/signup', {method: 'POST',  headers: {
            "Content-Type": "application/json"
          }, 
          body: JSON.stringify({
            fullname: fullname,
            email: email,
            username: username,
            program: program,
            password: password
        }),})
        setFullname('')
        setUsername('')
        setEmail('')
        setPassword('')
        setProgram('')
        navigate('/library')
    }
  return (
    <section className="flex items-center justify-center">
      <form
        
        className="flex flex-col gap-3 bg-gray-100 p-5 rounded-md py-11 h-5/6"
      >
        <div className="flex items-center ">
          <img src={logo} alt="logo" className="w-32" />
          <p className="font-bold -ml-[2rem]">KRATAA</p>
        </div>
        
        <div className="inp-field">
          <AiOutlineUser className="text-xl" />
          <input
            type="text"
            placeholder="fullname"
            className="bg-gray-200 text-black"
            onChange={(e)=>setFullname(e.target.value)}
            value={fullname}
          />
        </div>
        <div className="inp-field">
          <FaUser className="text-xl" />
          <input
            type="text"
            placeholder="username"
            className="bg-gray-200 text-black"
            onChange={(e)=>setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="inp-field">
          <FaMailBulk className="text-2xl" />
          <input
            type="text"
            placeholder="Email"
            className="bg-gray-200 text-black"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="inp-field">
          <FaGraduationCap className="text-xl" />
          <input
            type="text"
            placeholder="program"
            className="bg-gray-200 text-black"
            onChange={(e)=>setProgram(e.target.value)}
            value={program}
          />
        </div>
        <div className="inp-field">
          <FaLock className="text-xl" />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-200 text-black"
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button  onClick={handleSubmit} className='bg-black p-2 hover:bg-gray-900 text-white text-center'>sign up</button>
        
        <p>Already have an account? </p>
        <a href="/signin" className="font-bold text-center">
          sign in
        </a>
      </form>
    </section>
  )
}

export default Signup