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
    <section className='flex items-center justify-center bg-gray-100'>
        
        <form action="" className='flex shadow-lg flex-col gap-6 bg-white p-16 py-12 rounded-md  '>
            <div className="flex items-center justify-center gap-10">
                <img src={logo} alt="logo" className='w-11'/>
                <p className='font-bold -ml-[2rem]'>KRATAA</p>
            </div>
           <div className="flex flex-col gap-5">
           <div className="inp-field">
                <FaMailBulk className='text-2xl'/>
            <input type="text" placeholder='Email' className='bg-gray-200 text-black'/>
            </div>
            <div className="inp-field">
                <FaLock className='text-xl'/>
            <input type="password" placeholder='Password' className='bg-gray-200 text-black'/>
            </div>
           </div>
            <button  onClick={handleSubmit} className='bg-black p-2 hover:bg-gray-900 text-white text-center'>sign in</button>

            <p className='mt-6 text-center'>Don't have an account? <a href="/user/signup" className='font-bold hover:underline text-center'>sign up</a></p>
            
            <p className='uppercase text-center'>or</p>
            <div className="text-center"> <a href="/admin/signin" className='font-bold'>sign in</a> or  <a href="/admin/signup" className='font-bold'>sign up</a> as an admin</div>
        </form>
    </section>
  )
}

export default Login