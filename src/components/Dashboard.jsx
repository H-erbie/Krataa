import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./context";
import { useNavigate } from "react-router";
import { User2, Laptop, BarChart, Glasses } from "lucide-react";
import ManageBooks from './ManageBooks'
import Overview from './Overview'
import Stats from './Stats'
const Dashboard = () => {
  const { currentUser } = useGlobalContext();
  const navigate = useNavigate();
  const [activeDashNav, setActiveDashNav] = useState('overview')
  const [content, setContent] = useState('overview')
  const changeActiveDashNav = (navname) =>{
     setActiveDashNav(navname)
    //  setContent(navname)
  }
  useEffect(() => {
    if (currentUser?.role !== "admin") {
      navigate("/");
    }
  }, []);
  const dashboardNav = [
    {
      name: "overview",
      url: "",
      icon: <Glasses/>
    },
    {
      name: "manage books",
      url: "",
      icon: <Laptop/>

    },
    {
      name: "statistics",
      url: "",
      icon: <BarChart/>

    },
  ];
  const rhs = [
    {
      item: <Overview/>
    },
    {
      item: <ManageBooks/>
    },
    {
      item: <Stats/>
    },
  ];
  return (
    <main className="min-h-screen pt-20 relative">
      
      <div className="flex">
        <div className=" sm:w-[10%] lg:w-[15%] dash-nav flex p-2 flex-col justify-evenly dark:border-gray-600 border-r">
          {dashboardNav.map((navlink, index) => {
            if(navlink.name === activeDashNav){
              return <button onClick={()=>changeActiveDashNav(navlink.name)} key={index} className='flex justify-center bg-blue-50 lg:px-3 dark:bg-gray-400 dark:hover:bg-gray-500 p-2 w-max lg:w-full mx-auto lg:mx-0 rounded-[100%] hover:bg-blue-100  lg:py-2 lg:rounded-md capitalize items-center gap-x-3'>
              {navlink.icon}<span className='hidden lg:block'>{navlink.name}</span>
            </button>
            }
           return <button onClick={()=>changeActiveDashNav(navlink.name)} key={index} className='flex justify-center hover:bg-blue-100 dark:hover:bg-gray-500 lg:px-3 p-2 lg:py-2 w-max lg:w-full mx-auto lg:mx-0  rounded-[100%] lg:rounded-md capitalize items-center gap-x-3'>
              {navlink.icon}<span className='hidden lg:block'>{navlink.name}</span>
            </button>
})}
        </div>
        <div className="lg:w-[85%] sm:w-[90%] overflow-y-scroll">
        {activeDashNav === 'overview' && <Overview />}
          {activeDashNav === 'manage books' && <ManageBooks />}
          {activeDashNav === 'statistics' && <Stats />}
        </div></div>

    </main>
  );
};

export default Dashboard;
