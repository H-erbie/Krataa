import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useGlobalContext } from "./context";
import Cookies from "universal-cookie";
import { User, Edit, LogOut, Trash, X, Loader } from "lucide-react";
import uenrLibrary from "../../src/assets/Books.jpg";

const UserProfile = () => {
  const { currentUser, getCookie } = useGlobalContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [showEditModal, setShowEditModal] = useState(false);
  const logOut = () => {
    cookies.remove("accessToken");
    localStorage.removeItem("currentUser");
    navigate("/");
  };
  const storedUser = localStorage.getItem("currentUser");
  const user = JSON.parse(storedUser);
  const hideEditModal = () => {
    setShowEditModal(false);
    setUsername(user.name);
    setFullname(user.fullname);
    setEmail(user.email);
  };
  useEffect(() => {
    if (!getCookie) {
      navigate("/signin");
    }
    if (storedUser) {
      setUsername(user.name);
      setFullname(user.fullname);
      setEmail(user.email);
    }
  }, []);
  const updateUser = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/user/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username,
          email,
          fullname,
          id: currentUser.userId,
        }),
      });
      const updatedUser = await res.json();

      setUsername(updatedUser.username);
      setFullname(updatedUser.fullname);
      setEmail(updatedUser.email);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUpdateLoading(false);
      setShowEditModal(false);
    } catch (error) {
      console.error(error.message);
      setUpdateLoading(false);
    }
  };

  const deleteUser = async () => {
    setDeleteLoading(true)
    try {
      const res = await fetch("http://localhost:3001/api/user/delete-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          id: currentUser.userId,
        }),
      });
      if (res.ok) {
        cookies.remove("accessToken");
        localStorage.removeItem("currentUser");
        navigate("/");
      }
      else{
        setDeleteLoading(false)
        console.log(await res.json())
      }
    } catch (error) {
      setDeleteLoading(false)
      console.error(error.message);
    }
  };
  return (
    <div className="min-h-[100vh]  pt-20">
      <div className="h-40 overflow-hidden w-screen">
        <img
          src={uenrLibrary}
          className="object-cover w-full"
          alt="uenr library photo"
        />
      </div>
      <section className="h-80 absolute top-36 w-full">
        <article>
          {" "}
          <div className="p-20 mt-5 mx-auto rounded-[100%] dark:bg-gray-400 dark:border-none  bg-gray-100 border w-max">
            <User className="h-16 w-16" />
          </div>
        </article>
        <article className="mx-auto w-max mt-4">
          <p className="my-3">
            <span className="font-semibold">Username:</span>{" "}
            <span>{currentUser?.name}</span>
          </p>
          <p className="my-3">
            <span className="font-semibold">Full Name:</span>{" "}
            <span>{currentUser?.fullname}</span>
          </p>
          <p className="my-3">
            <span className="font-semibold">Email:</span>{" "}
            <span>{currentUser?.email}</span>
          </p>
        </article>
        <article className="absolute -top-[58px] sm:-top-10 right-3 ">
          <button
            onClick={() => setShowEditModal(true)}
            className="p-3 hover:bg-gray-500 bg-gray-400 sm:bg-transparent transition-all rounded-[100%] sm:rounded-md sm:py-1 text-white  flex gap-x-2 w-max "
          >
            <span className="hidden sm:block  ">Edit </span>
            <Edit className="w-5 h-5 sm:h-6 sm:w-6" />
          </button>{" "}
          <button
            className="p-3 hover:bg-gray-500 sm:bg-transparent bg-gray-400 transition-all my-1 sm:rounded-md sm:py-1 sm:my-3 rounded-[100%] text-white flex gap-x-2  w-max"
            onClick={logOut}
          >
            <span className="hidden sm:block  ">logout</span>{" "}
            <LogOut className="w-5 h-5 sm:h-6 sm:w-6" />
          </button>
          <button
            className="p-3 bg-red-500 hover:bg-red-600 sm:bg-transparent transition-all text-white sm:rounded-md sm:py-1 rounded-[100%] flex gap-x-2 w-max"
            onClick={deleteUser}
          >
            <span className="hidden sm:flex gap-x-2 ">{deleteLoading && <Loader className="animate-spin"/>} delete account </span>
            <Trash className="w-5 h-5 sm:h-6 sm:w-6" />
          </button>
        </article>
      </section>
      {/* Edit modal */}
      <div
        className={showEditModal ? "edit-overlay" : "edit-overlay hidden"}
        onClick={hideEditModal}
      ></div>
      <article
        className={showEditModal ? "edit-form bottom-0" : "edit-form sm:hidden"}
      >
        <button
          className="absolute top-3 right-5 sm:right-3"
          onClick={hideEditModal}
        >
          <X />
        </button>
        <h3 className="font-bold py-4 px-3 text-2xl text-center">
          Edit User Profile
        </h3>
        <form
          onSubmit={updateUser}
          className="px-5 sm:px-3 py-5 flex gap-y-3 flex-col"
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border dark:bg-[#181B1F] dark:border-gray-300"
          />
          <label htmlFor="fullname">Fullname</label>

          <input
            type="text"
            name="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="border dark:bg-[#181B1F] dark:border-gray-300"
          />
          <label htmlFor="email">Email</label>

          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border dark:bg-[#181B1F] dark:border-gray-300"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-gray-400 hover:bg-gray-500 transition-all mx-auto w-max rounded-md dark:bg-gray-600"
          >
            {updateLoading ? "Updating Profile..." : "Update Profile"}
          </button>
        </form>
      </article>
    </div>
  );
};

export default UserProfile;
