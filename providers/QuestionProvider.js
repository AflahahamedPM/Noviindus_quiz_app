"use client";
import React, { createContext, use, useContext } from "react";
import useQuestionServices from "@/services/useQuestionServices";

const QuestionContext = createContext(null);

export const QuestionProvider = ({ children }) => {
  const services = useQuestionServices();
  return (
    <QuestionContext.Provider value={services}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestionData = () => useContext(QuestionContext);
