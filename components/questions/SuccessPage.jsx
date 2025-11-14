import { useQuestionData } from "@/providers/QuestionProvider";
import React from "react";
import { correctIcon, questionIcon, wrongIcon } from "../image";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const { finalQuizDetails } = useQuestionData();
  const router = useRouter();

  const contentDatas = [
    {
      id: 1,
      bgColor: "#DDA428",
      icon: questionIcon,
      title: "Total Questions:",
      answer: finalQuizDetails?.details?.length,
    },
    {
      id: 2,
      bgColor: "#4CAF50",
      icon: correctIcon,
      title: "Correct Answers:",
      answer: finalQuizDetails?.correct,
    },
    {
      id: 3,
      bgColor: "#800080",
      icon: wrongIcon,
      title: "Incorrect Answers:",
      answer: finalQuizDetails?.wrong,
    },
    {
      id: 4,
      bgColor: "#5C5C5C",
      icon: questionIcon,
      title: "Not Attended Questions:",
      answer: finalQuizDetails?.not_attended,
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center p-4 w-full mx-auto bg-[#f4fcff] min-h-screen mt-1">
      <div className="bg-linear-to-r from-[#1c3141] to-[#177A9C] p-6 flex flex-col mb-3 justify-center items-center sm:w-1/4 w-full rounded-lg">
        <p className="text-lg text-white font-medium">Marks Obtained:</p>
        <p className="text-6xl text-white">
          {finalQuizDetails?.score}/{finalQuizDetails?.details?.length}
        </p>
      </div>
      {contentDatas?.map((data) => (
        <div
          key={data?.id}
          className="flex sm:w-1/4 w-full items-center justify-between mb-3"
        >
          <div className="flex gap-2 items-center">
            <div
              className="p-3 rounded-lg flex justify-center items-center"
              style={{ backgroundColor: data?.bgColor }}
            >
              <Image src={data?.icon} width={20} height={20} alt="iconImg" />
            </div>
            <p className="text-[#1C3141] text-sm ">{data?.title}</p>
          </div>

          <p>{data?.answer}</p>
        </div>
      ))}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          router.push("/");
        }}
        className="sm:w-1/4 w-full py-3 rounded-lg bg-[#1C3141] mt-4 text-white cursor-pointer"
      >
        Done
      </button>
    </div>
  );
};

export default SuccessPage;
