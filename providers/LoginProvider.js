"use client";
import React, { createContext, useContext } from "react";
import useLoginServices from "../services/useLoginServices";

const LoginContext = createContext(null);

export const LoginProvider = ({children}) => {
  const services = useLoginServices();
  return <LoginContext.Provider value={services}>{children}</LoginContext.Provider>;
};

export const useLoginData = () => useContext(LoginContext);
