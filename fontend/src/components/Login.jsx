import React, { useState } from 'react'
import { FaMailBulk, FaLock } from 'react-icons/fa'
import logo from "../assets/logo.png";
import {useNavigate} from 'react-router-dom'


const Login = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

          const navigate = useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault();
         fetch('http://localhost:3001/api/user/signin', {method: 'POST',  headers: {
            "Content-Type": "application/json"
          }, 
          body: JSON.stringify({
            email: email,
            password: password
        }),})
        setEmail('')
        setPassword('')
        navigate('/library')
    }
  return (
    <section className='flex items-center justify-center'>
        
        <form action="" className='flex flex-col gap-3 bg-gray-100 p-5 rounded-md py-11 h-5/6'>
            <div className="flex items-center ">
                <img src={logo} alt="logo" className='w-32'/>
                <p className='font-bold -ml-[2rem]'>KRATAA</p>
            </div>
            <div className="inp-field">
                <FaMailBulk className='text-2xl'/>
            <input type="text" placeholder='Email' className='bg-gray-200 text-black'/>
            </div>
            <div className="inp-field">
                <FaLock className='text-xl'/>
            <input type="password" placeholder='Password' className='bg-gray-200 text-black'/>
            </div>
            <button  onClick={handleSubmit} className='bg-black p-2 hover:bg-gray-900 text-white text-center'>sign in</button>

            <p>Don't have an account? </p>
            <a href="/signup" className='font-bold text-center'>sign up</a>
        </form>
    </section>
  )
}

export default Login