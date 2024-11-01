'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// Helper function to decode JWT and handle errors gracefully
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to parse token payload", error);
    return null;
  }
};

// Create context
const UserContext = createContext(null);

export const useUser = () => {
  return useContext(UserContext);
};

// Provider component
export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(null);

  // Check for token on mount and set user data if available
  useEffect(() => {
    const storedToken = Cookies.get('myclasstoken');
    if (storedToken) {
      const payload = parseJwt(storedToken);
      if (payload) {
        setUser({ id: payload.id, name: payload.name });
        setAuth(true);
        setToken(storedToken);
      } else {
        // If token is invalid, remove it to avoid re-parsing
        Cookies.remove('myclasstoken');
        setAuth(false);
        setToken(null);
        setUser(null);
      }
    }
  }, []);

  // Function to update token, parse payload, and update auth state
  const updateToken = (newToken) => {
    if (newToken) {
      Cookies.set('myclasstoken', newToken);
      setToken(newToken);
      const payload = parseJwt(newToken);
      if (payload) {
        setUser({ id: payload.id, name: payload.name });
        setAuth(true);
      } else {
        console.error("Invalid token payload");
      }
    } else {
      // Clear token, reset auth and user state, and redirect to home
      setAuth(false);
      setToken(null);
      Cookies.remove('myclasstoken');
      setUser(null);
      router.push('/login');
    }
  };

  const logout=() =>{
    setAuth(false);
    setToken(null);
    setUser(null);
    router.push('/login')
  }

  return (
    <UserContext.Provider value={{ user, auth, updateToken, token,logout }}>
      {children}
    </UserContext.Provider>
  );
};
