"use client";
import { useQuestionData } from '@/providers/QuestionProvider';
import Image from 'next/image';
import React from 'react'

const SingleQuestionContainer = () => {
    const { questions, selectedQuestion } = useQuestionData();
    const buttonDatas = [
     {id:1, title:"Mark for review", bgColor:"#FFEBE6", textColor:"white"},  
    { id: 2, title: "Previous" },
    { id: 3, title: "Next" },
    ]
  return (
    <>
    <h1 className="text-lg font-bold mb-4 text-[#1C3141]">
          Web Development MCQ
        </h1>
        <div className="bg-white border ">
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

            return (
              <label
                key={opt.id}
                className="flex items-center gap-3 bg-white border p-4 cursor-pointer hover:bg-gray-100 rounded"
              >
                <span className="font-semibold">{label}.</span>

                <span>{opt?.option}</span>

                <input
                  type="radio"
                  name="selectedOption"
                  value={opt?.id}
                  className="cursor-pointer ml-auto"
                  onChange={() => console.log("Selected:", opt)}
                />
              </label>
            );
          })}
        </div>
        </>
  )
}

export default SingleQuestionContainer