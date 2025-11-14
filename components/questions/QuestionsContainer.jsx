"use client";
import React from "react";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { useQuestionData } from "@/providers/QuestionProvider";
const QuestionsContainer = () => {
  const { questions, setSelectedQuestion } = useQuestionData();
  
  const handleQuestionClick = (id) => {
    const selectedQtn = questions?.questions?.find(
      (qtn) => qtn?.question_id === id
    );
    setSelectedQuestion(selectedQtn);
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <h2 className="text-sm font-light mb-4">Question No Sheet:</h2>
        <div className="flex gap-3 items-center">
          <p className="text-sm text-gray-600">Remaning Time:</p>
          <div className="flex gap-3 items-center bg-[#1C3141] px-2 py-1 rounded">
            <TimerOutlinedIcon fontSize="small" style={{ color: "white" }} />
            <span className="text-sm font-medium text-white">10:00</span>
          </div>
        </div>
      </div>
      <div className="flex gap-6 items-center mt-4">
        {questions?.questions?.map((qtn, index) => (
          <div
            onClick={() => handleQuestionClick(qtn?.question_id)}
            key={qtn?.question_id}
            className="h-10 w-10 bg-white rounded-md border flex items-center justify-center cursor-pointer"
          >
            <span className="font-semibold">{qtn?.number}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsContainer;
