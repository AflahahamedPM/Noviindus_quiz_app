"use client";
import React, { useEffect, useState } from "react";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { useQuestionData } from "@/providers/QuestionProvider";
const QuestionsContainer = () => {
  const {
    questions,
    setSelectedQuestion,
    formatMillisecondsToMinSeconds,
    timer,
  } = useQuestionData();

  const handleQuestionClick = (id) => {
    const selectedQtn = questions?.find((qtn) => qtn?.question_id === id);
    setSelectedQuestion(selectedQtn);
  };

  const indications = [
    { id: 1, title: "Attended", bgColor: "#4CAF50" },
    { id: 2, title: "Not Attended", bgColor: "#EE3535" },
    { id: 3, title: "Marked For Review", bgColor: "#800080" },
    {
      id: 4,
      title: "Answered and Marked For Review",
      bgColor: "#4CAF50",
      borderColor: "#800080",
    },
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center mt-2">
        <h2 className="text-sm font-light">Question No Sheet:</h2>
        <div className="flex gap-3 items-center">
          <p className="text-sm text-gray-600">Remaning Time:</p>
          <div className="flex gap-3 items-center bg-[#1C3141] px-2 py-1 rounded">
            <TimerOutlinedIcon fontSize="small" style={{ color: "white" }} />
            <span className="text-sm font-medium text-white">
              {formatMillisecondsToMinSeconds(timer)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex sm:gap-6 gap-2 mt-4 sm:min-h-105 min-h-20">
        {questions?.map((qtn) => (
          <div
            onClick={() => handleQuestionClick(qtn?.question_id)}
            key={qtn?.question_id}
            className={`h-10 w-10  ${
              qtn?.selected_option && qtn?.markedForReview
                ? "bg-[#4CAF50] border-3 border-[#800080]"
                : qtn?.selected_option
                ? "bg-[#4CAF50]"
                : qtn?.markedForReview
                ? "bg-[#800080]"
                : qtn?.notAttended
                ? "bg-[#EE3535]"
                : "bg-white"
            }  rounded-md border flex items-center justify-center cursor-pointer`}
          >
            <span className="font-semibold">{qtn?.number}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:flex sm:justify-between sm:items-center">
        {indications.map((option) => (
          <div key={option.id} className="flex gap-2 items-center">
            <div
              className="p-3 rounded"
              style={{
                backgroundColor: option.bgColor,
                border: `3px solid ${option?.borderColor || option.bgColor}`,
              }}
            />
            <p className="text-xs">{option.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsContainer;
