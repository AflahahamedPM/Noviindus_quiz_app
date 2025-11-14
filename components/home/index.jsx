"use client";
import React from "react";
import { instructions } from "@/utils/instructions";
import { useRouter } from "next/navigation";

const HomeComponent = () => {
  const data = [
    { id: 1, title: "Total MCQ's:", subtitle: "10" },
    { id: 2, title: "Total marks:", subtitle: "10" },
    { id: 3, title: "Total Time:", subtitle: "10:00" },
  ];
  const router = useRouter();
  return (
    <div className="w-full bg-[#F4FCFF] min-h-fit">
    <div className=" sm:w-1/2 w-11/12 overflow-hidden mx-auto py-5 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4 text-[#1C3141]">
        Web Developement MCQ
      </h1>
      <div className="w-full flex flex-row gap-4 bg-[#1C3141] rounded-lg p-4 mb-6">
        {data.map((item, index) => (
          <div
            key={item?.id}
            className={`sm:w-full w-10/12 flex flex-col justify-center items-center px-6 py-4 ${
              index !== data.length - 1 ? "border-r border-white" : ""
            }`}
          >
            <p className="sm:text-sm text-xs font-semibold text-white">{item?.title}</p>
            <p className="sm:text-4xl text-3xl font-semibold text-white">
              {item?.subtitle}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full p-4">
        <h2 className="sm:text-sm text-xs font-light mb-4 text-[#5C5C5C]">Instructions</h2>
        <ol className="list-decimal list-inside font-light text-sm text-[#5C5C5C]">
          {instructions.map((instruction, index) => (
            <li key={index} className="mb-2 max-sm:text-xs">
              {instruction}
            </li>
          ))}
        </ol>
      </div>
      <button
        onClick={() => router.push("/questions")}
        className="mt-6 bg-[#1C3141] text-white font-medium py-2  w-full cursor-pointer rounded-lg transition-colors"
      >
        Start Test
      </button>
    </div>
    </div>
  );
};

export default HomeComponent;
