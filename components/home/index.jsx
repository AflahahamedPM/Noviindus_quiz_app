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
    <div className="w-1/2 mx-auto py-5 flex flex-col justify-center items-center bg-[#F4FCFF]">
      <h1 className="text-2xl font-bold mb-4 text-[#1C3141]">
        Web Developement MCQ
      </h1>
      <div className="w-full flex flex-row gap-4 bg-[#1C3141] rounded-lg p-4 mb-6">
        {data.map((item, index) => (
          <div
            key={item?.id}
            className={`w-full flex flex-col justify-center items-center px-6 py-4 ${
              index !== data.length - 1 ? "border-r border-white" : ""
            }`}
          >
            <p className="text-sm font-semibold text-white">{item?.title}</p>
            <p className="text-4xl font-semibold text-white">
              {item?.subtitle}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full p-4">
        <h2 className="text-sm font-light mb-4 text-[#5C5C5C]">Instructions</h2>
        <ol className="list-decimal list-inside font-light text-sm text-[#5C5C5C]">
          {instructions.map((instruction, index) => (
            <li key={index} className="mb-2">
              {instruction}
            </li>
          ))}
        </ol>
      </div>
      <button
        onClick={() => router.push("/questions")}
        className="mt-6 bg-[#1C3141] text-white font-medium py-2 px-50 cursor-pointer rounded-lg transition-colors"
      >
        Start Test
      </button>
    </div>
  );
};

export default HomeComponent;
