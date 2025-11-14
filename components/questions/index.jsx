import React from "react";
import SingleQuestionContainer from "./SingleQuestionContainer";
import QuestionsContainer from "./QuestionsContainer";

const QuestionComponent = () => {
  return (
    <div className="bg-[#F4FCFF] p-4 flex min-h-screen gap-8">
      <div className="w-1/2 flex flex-col">
        <SingleQuestionContainer />
      </div>

      <div className="w-1/2">
        <QuestionsContainer />
      </div>
    </div>
  );
};

export default QuestionComponent;
