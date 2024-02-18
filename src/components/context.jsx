import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

const AppContext = createContext()
const AppProvider = ({children})=>{
const [currentUser, setCurrentUser] = useState(null)
    const getUser = async() => {
        try {
            const accessToken = new Cookies().get('accessToken')
            const response =  await fetch("http://localhost:3001/api/user/currentuser", {
              method: "GET",
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              }
            })
            const user = await response.json()
            localStorage.setItem('currentUser', JSON.stringify(user)) 
            const getStoredUser = localStorage.getItem('currentUser')           
            setCurrentUser(JSON.parse(getStoredUser))
        } catch (error) {
            console.log(error.message)
        }
    }         
       const storedUser = localStorage.getItem('currentUser');
        const cookies = new Cookies()
        const getCookie =  cookies.get('accessToken')
        useEffect(() => {
            if (storedUser) {
              const user = JSON.parse(storedUser);
              setCurrentUser(user);
            }
            if(!storedUser){
                setCurrentUser(null);

            }
            if(!getCookie){
                localStorage.removeItem('currentUser')
            }
          }, [getCookie, storedUser, currentUser]);

    return <AppContext.Provider value={{currentUser, getCookie, getUser}}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}
export {AppContext, AppProvider}