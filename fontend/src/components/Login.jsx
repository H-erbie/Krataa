import React, { useState } from "react";
import { FaMailBulk, FaLock } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();
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
      if (!response.ok) {
        console.log(response)
      }

      // navigate("/user/library");
    } catch (error) {
      console.log(error);
      // setErr(error.message)
    }
  };
  return (
    <section className="flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex shadow-lg flex-col gap-6 bg-white p-16 py-12 rounded-md  "
      >
        <div className="flex items-center justify-center gap-10">
          <img src={logo} alt="logo" className="w-11" />
          <p className="font-bold -ml-[2rem]">KRATAA</p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="inp-field">
            <FaMailBulk className="text-2xl" />
            <input
              type="email"
              placeholder="Email"
              required
              className="bg-gray-200 text-black"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="inp-field">
            <FaLock className="text-xl" />
            <input
              type="password"
              placeholder="Password"
              required
              className="bg-gray-200 text-black"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={busy}
          className="bg-black p-2 hover:bg-gray-900 disabled:opacity-40 text-white text-center"
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
    </section>
  );
};

export default Login;
