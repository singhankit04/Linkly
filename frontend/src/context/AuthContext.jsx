import React, { createContext, useState, useContext, useEffect } from 'react';
import { Logout } from '../api/authapi';
import { setAccessToken as setAxiosAccessToken } from '../utils/axiosInstance';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  // Rehydrate user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.accessToken) {
        setAxiosAccessToken(parsedUser.accessToken);
      }
    }
  }, []);
  

  const login = (userData, accessToken) => {
    setAxiosAccessToken(accessToken);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await Logout();
      setUser(null);
      setAxiosAccessToken(null);
      localStorage.removeItem('user');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
 
