'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie'; 
import { useRouter } from 'next/navigation';


const UserContext = createContext(null);


export const useUser = () => {
  return useContext(UserContext);
};

// Provider component
export const UserProvider = ({ children }) => {
    const router  = useRouter()
  const [token, setToken] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    // Load the token from the cookie
    const storedToken = Cookies.get('myclasstoken');
    
    if (storedToken) {
      setToken(storedToken);
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  // Function to update token in state and cookie
  const updateToken = (newToken) => {
    if (newToken) {
      Cookies.set('myclasstoken', newToken);
      setToken(newToken);
      setAuth(true);
    } else {
      Cookies.remove('myclasstoken');
      setToken(null);
      setAuth(false);
      router.push('/')
    }
  };

  return (
    <UserContext.Provider value={{ token, auth, updateToken }}>
      {children}
    </UserContext.Provider>
  );
};
