"use client";
import React from "react";
import SingleQuestionContainer from "./SingleQuestionContainer";
import QuestionsContainer from "./QuestionsContainer";
import { useQuestionData } from "@/providers/QuestionProvider";
import { CircularProgress } from "@mui/material";
import SuccessPage from "./SuccessPage";

const QuestionComponent = () => {
  const { isLoading, isSuccessPageOpen } = useQuestionData();
  return (
    <>
      {isLoading ? (
        <div className="flex min-h-screen justify-center items-center">
        <CircularProgress color="black"/>
        </div>
      ) : isSuccessPageOpen ? (
        <SuccessPage />
      )  : (
        <div className="bg-[#F4FCFF] p-4 sm:flex min-h-screen gap-8">
          <div className="sm:w-1/2 flex flex-col">
            <SingleQuestionContainer />
          </div>

          <div className="sm:w-1/2 max-sm:mt-8">
            <QuestionsContainer />
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionComponent;
