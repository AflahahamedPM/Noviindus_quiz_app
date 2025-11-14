import React from "react";
import { questionIcon, timerIcon } from "../image";
import { useQuestionData } from "@/providers/QuestionProvider";
import Image from "next/image";
import { CircularProgress } from "@mui/material";

const SubmitModalContent = () => {
  const {
    timer,
    questions,
    finalOutput,
    formatMillisecondsToMinSeconds,
    handleSubmit,
    isLoading,
  } = useQuestionData();
  const answeredQuestions =
    finalOutput?.correctAnswer + finalOutput?.wrongAnswer;
  const markedForReview = finalOutput?.markedForReview;

  const contentDatas = [
    {
      id: 1,
      bgColor: "#1C3141",
      icon: timerIcon,
      title: "Remaining Time:",
      answer: formatMillisecondsToMinSeconds(timer),
    },
    {
      id: 2,
      bgColor: "#DDA428",
      icon: questionIcon,
      title: "Total Questions:",
      answer: questions?.length,
    },
    {
      id: 3,
      bgColor: "#4CAF50",
      icon: questionIcon,
      title: "Questions Answered:",
      answer: answeredQuestions,
    },
    {
      id: 4,
      bgColor: "#800080",
      icon: questionIcon,
      title: "Marked for Review:",
      answer: markedForReview,
    },
  ];
  return (
    <div>
      {contentDatas?.map((data) => (
        <div key={data?.id} className="flex items-center justify-between mb-3">
          <div className="flex gap-2 items-center">
            <div
              className="p-3 rounded-lg flex justify-center items-center"
              style={{ backgroundColor: data?.bgColor }}
            >
              <Image src={data?.icon} width={20} height={20} alt="iconImg"/>
            </div>
            <p className="text-[#1C3141] text-sm ">{data?.title}</p>
          </div>

          <p>{data?.answer}</p>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="w-full py-3 rounded-lg bg-[#1C3141] mt-4 text-white cursor-pointer"
      >
        {isLoading ? (
          <CircularProgress size={20} color="white" />
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
};

export default SubmitModalContent;
