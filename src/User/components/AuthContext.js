import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize isLoggedIn from localStorage to keep user logged in after refreshing the page
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const isUserLoggedIn = localStorage.getItem('isLoggedIn');
    // Convert the string 'true' or 'false' back to a boolean
    return isUserLoggedIn === 'true';
  });

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Store login state in localStorage
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Remove login state from localStorage
  };

  // Optional: Clear localStorage when the component unmounts
  // This is more about cleanup and might not be necessary for your use case
  useEffect(() => {
    return () => {
      // If you decide to clear the login state when the app is closed, uncomment the next line
      // localStorage.removeItem('isLoggedIn');
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
