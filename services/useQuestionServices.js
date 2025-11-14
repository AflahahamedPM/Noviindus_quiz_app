import { API_ENDPOINTS } from "@/config/api";
import useAlert from "@/hooks/useAlert";
import APIRequest from "@/utils/apiRequest";
import React, { useEffect, useState } from "react";

const useQuestionServices = () => {
  const { publishNotification } = useAlert();
  const [questions, setQuestions] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await APIRequest.multipartFormDataRequest(
        "GET",
        API_ENDPOINTS.getQuestions
      );
      if (response?.success) {
        // Handle successful response
        console.log("Questions fetched successfully:", response);
        setQuestions(response);
        setSelectedQuestion(response?.questions[0] || null);
      } else {
        publishNotification(
          response?.message || "Failed to fetch questions",
          "error"
        );
      }
    } catch (err) {
      publishNotification(
        err?.message || "An error occurred while fetching questions",
        "error"
      );
    }
  };
  return {
    questions,
    selectedQuestion,
    setSelectedQuestion
  };
};

export default useQuestionServices;
