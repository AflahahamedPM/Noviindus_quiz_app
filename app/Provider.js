"use client";
import { SnackbarProvider } from "notistack";
import React from "react";

const CustomProvider = ({ children }) => {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
}

export default CustomProvider;