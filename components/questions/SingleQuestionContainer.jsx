"use client";
import { useQuestionData } from "@/providers/QuestionProvider";
import Image from "next/image";
import React from "react";
import Dialogue from "../ResuableComponents/Dialogue";
import SubmitModalContent from "./SubmitModalContent";
import { polygonIcon, textIcon } from "../image";
import ComprehensiveContent from "./ComprehensiveContent";

const SingleQuestionContainer = () => {
  const {
    questions,
    selectedQuestion,
    handleMarkForReview,
    handleNextClick,
    handlePreviousClick,
    handleOptionChange,
    handlePreview,
    isSubmitModalOpen,
    setIsSubmitModalOpen,
    isComprehensiveModalOpen,
    setIsComprehensiveModalOpen,
  } = useQuestionData();

  const buttonDatas = [
    {
      id: 1,
      title: "Mark for review",
      bgColor: "#800080",
      textColor: "#FFFFFF",
      onclick: (questionId) => handleMarkForReview(questionId),
    },
    {
      id: 2,
      title: "Previous",
      bgColor: "#CECECE",
      textColor: "#1C3141",
      onclick: () => handlePreviousClick(),
    },
    {
      id: 3,
      title: "Next",
      bgColor: "#1C3141",
      textColor: "#FFFFFF",
      onclick: () => handleNextClick(),
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold mb-4 text-[#1C3141]">
          Web Development MCQ
        </h1>
        <p className="text-sm text-gray-600">
          {selectedQuestion?.number} / {questions?.length}
        </p>
      </div>

      {selectedQuestion?.comprehension && (
        <button
          onClick={() => setIsComprehensiveModalOpen(true)}
          className="flex my-3 max-sm:w-full w-1/2 justify-between items-center p-2 bg-[#177A9C] text-white rounded-md cursor-pointer"
        >
          <Image src={textIcon} alt="textIcon" height={20} width={20} />
          <p>Read Comprehensive Paragraph</p>
          <Image src={polygonIcon} alt="polygonIcon" height={10} width={10} />
        </button>
      )}

      <div className="bg-white shadow-lg rounded-lg">
        <p className="p-4">
          {selectedQuestion?.number}. {selectedQuestion?.question}
        </p>
        {selectedQuestion?.image && (
          <div className="flex justify-center mb-4">
            <Image
              src={selectedQuestion?.image}
              alt="Question Image"
              width={250}
              height={250}
            />
          </div>
        )}
      </div>

      <p className="mt-4 text-gray-700 text-sm">Choose the answer:</p>

      <div className="flex flex-col gap-4 mt-4">
        {selectedQuestion?.options?.map((opt, index) => {
          const label = String.fromCharCode(65 + index);
          const checked = opt?.id === selectedQuestion?.selected_option;
          return (
            <label
              key={opt.id}
              className="flex items-center gap-3 bg-white border border-[#CECECE] rounded-lg p-4 cursor-pointer hover:bg-gray-100"
            >
              <span className="font-semibold">{label}.</span>

              <span>{opt?.option}</span>

              <input
                type="radio"
                name="selectedOption"
                value={opt?.id}
                className="cursor-pointer ml-auto"
                onChange={() =>
                  handleOptionChange(selectedQuestion?.question_id, opt?.id)
                }
                checked={checked}
                aria-checked={checked}
              />
            </label>
          );
        })}
      </div>
      
      <div className="flex justify-between mt-6">
        {buttonDatas.map((btn) => (
          <button
            key={btn.id}
            style={{ backgroundColor: btn.bgColor, color: btn.textColor }}
            className={`w-fit  px-4 py-2 gap-2 rounded cursor-pointer`}
            onClick={() => btn.onclick(selectedQuestion?.question_id)}
          >
            {btn.title}
          </button>
        ))}
      </div>

      <button
        onClick={handlePreview}
        className="w-full py-3 rounded-lg bg-[#1C3141] mt-4 text-white cursor-pointer"
      >
        Submit Test
      </button>

      <Dialogue
        open={isSubmitModalOpen}
        handleClose={() => setIsSubmitModalOpen(false)}
        hasCloseButton={true}
        dialogueTitle="Are you sure you want to submit the test?"
        child={
          <>
            <SubmitModalContent />
          </>
        }
      />

      <Dialogue
        open={isComprehensiveModalOpen}
        handleClose={() => setIsComprehensiveModalOpen(false)}
        hasCloseButton={false}
        dialogueTitle="Comprehensive Paragraph"
        child={
          <>
            <ComprehensiveContent
              paragraph={selectedQuestion?.comprehension}
              handleClose={() => setIsComprehensiveModalOpen(false)}
            />
          </>
        }
      />
    </>
  );
};

export default SingleQuestionContainer;
