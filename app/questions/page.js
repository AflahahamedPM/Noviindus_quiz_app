import QuestionComponent from "@/components/questions";
import { QuestionProvider } from "@/providers/QuestionProvider";
import React from "react";

const page = () => {
  return (
    <QuestionProvider>
      <QuestionComponent />
    </QuestionProvider>
  );
};

export default page;
