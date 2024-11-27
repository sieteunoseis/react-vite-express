// ToastContext.js
import React, { createContext, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from "react-toastify";

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const handleToast = (text) => {
    toast(text, {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <ToastContext.Provider value={handleToast}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};
