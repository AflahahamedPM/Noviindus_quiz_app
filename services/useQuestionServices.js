import { API_ENDPOINTS } from "@/config/api";
import useAlert from "@/hooks/useAlert";
import APIRequest from "@/utils/apiRequest";
import React, {
  useEffect,
  useReducer,
  useCallback,
  useState,
  useRef,
} from "react";

const initialState = {
  questionsWrapper: null,
  questions: [],
  selectedIndex: -1,
  direction: 1,
  finalOutput: {
    correctAnswer: 0,
    wrongAnswer: 0,
    markedForReview: 0,
  },
};

const ACTIONS = {
  FETCH_SUCCESS: "FETCH_SUCCESS",
  SELECT_OPTION: "SELECT_OPTION",
  NEXT: "NEXT",
  PREV: "PREV",
  SET_SELECTED_INDEX: "SET_SELECTED_INDEX",
  MARK_REVIEW: "MARK_REVIEW",
  TICK: "TICK",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_SUCCESS: {
      const wrapper = action.payload;
      const questions = (wrapper?.questions || []).map((q) => ({
        ...q,
        timeSpent: q?.timeSpent || 0,
        notAttended: !!q?.notAttended,
        markedForReview: !!q?.markedForReview,
      }));
      return {
        ...state,
        questionsWrapper: wrapper,
        questions,
        selectedIndex: questions.length > 0 ? 0 : -1,
        direction: 1,
      };
    }

    case ACTIONS.SELECT_OPTION: {
      const { questionId, optionId } = action.payload;
      const qIndex = state.questions.findIndex(
        (q) => q?.question_id === questionId
      );
      if (qIndex === -1) return state;

      const question = state.questions[qIndex];
      const selectedCount = question?.selectedCount || 0;

      if (selectedCount === 1) {
        return state;
      }

      const isCorrect = question?.options?.find((o) => o.id === optionId)
        ?.is_correct;

      const updatedQuestion = {
        ...question,
        selected_option: optionId,
        selectedCount: selectedCount + 1,
        notAttended: false,
      };

      const updatedQuestions = [...state.questions];
      updatedQuestions[qIndex] = updatedQuestion;

      const updatedFinalOutput = {
        ...state.finalOutput,
        correctAnswer: state.finalOutput.correctAnswer + (isCorrect ? 1 : 0),
        wrongAnswer: state.finalOutput.wrongAnswer + (isCorrect ? 0 : 1),
      };

      return {
        ...state,
        questions: updatedQuestions,
        finalOutput: updatedFinalOutput,
      };
    }

    case ACTIONS.NEXT: {
      const nextIndex = Math.min(
        state.selectedIndex + 1,
        state.questions.length - 1
      );
      if (nextIndex < 0 || nextIndex >= state.questions.length) return state;

      const prevIdx = state.selectedIndex;

      let updatedQuestions = state.questions;
      if (nextIndex > prevIdx) {
        updatedQuestions = state.questions.map((q, i) => {
          if (i < nextIndex && !q.selected_option) {
            return { ...q, notAttended: true };
          }
          return q;
        });
      }

      return {
        ...state,
        selectedIndex: nextIndex,
        questions: updatedQuestions,
      };
    }

    case ACTIONS.PREV: {
      const prevIndex = Math.max(state.selectedIndex - 1, 0);

      const updatedQuestions = state.questions.map((q, i) => {
        if (i === prevIndex && q?.notAttended) {
          return { ...q, notAttended: false };
        }
        return q;
      });
      return {
        ...state,
        selectedIndex: prevIndex,
        questions: updatedQuestions,
      };
    }

    case ACTIONS.SET_SELECTED_INDEX: {
      const newIdx = action.payload;
      if (newIdx < 0 || newIdx >= state.questions.length) return state;

      const updatedQuestions = state.questions.map((q, i) => {
        if (i < newIdx && !q?.selected_option) {
          return { ...q, notAttended: true };
        } else if (i === newIdx && q?.notAttended) {
          return { ...q, notAttended: false };
        }
        return q;
      });

      return {
        ...state,
        selectedIndex: newIdx,
        questions: updatedQuestions,
      };
    }

    case ACTIONS.MARK_REVIEW: {
      const { questionId } = action.payload || {};
      let updatedQuestions = state.questions;
      if (questionId) {
        const index = state.questions.findIndex(
          (q) => q?.question_id === questionId
        );
        if (index !== -1) {
          const updated = { ...state.questions[index], markedForReview: true };
          updatedQuestions = [...state.questions];
          updatedQuestions[index] = updated;
        }
      }
      return {
        ...state,
        questions: updatedQuestions,
        finalOutput: {
          ...state.finalOutput,
          markedForReview: state.finalOutput.markedForReview + 1,
        },
      };
    }

    case ACTIONS.TICK: {
      const tickMs = action.payload?.tickMs ?? 1000;
      const currentIdx = state.selectedIndex;
      if (currentIdx < 0 || currentIdx >= state.questions.length) return state;

      const currentQ = state.questions[currentIdx];
      const newTime = (currentQ?.timeSpent || 0) + tickMs;

      const updatedQuestions = [...state.questions];
      updatedQuestions[currentIdx] = { ...currentQ, timeSpent: newTime };

      const THRESHOLD_MS = action.payload?.thresholdMs ?? 60000;
      if (newTime > THRESHOLD_MS) {
        let direction = state.direction ?? 1;
        let proposedNext = currentIdx + direction;

        if (proposedNext < 0 || proposedNext >= state.questions.length) {
          direction = -direction;
          proposedNext = currentIdx + direction;
          if (proposedNext < 0 || proposedNext >= state.questions.length) {
            return { ...state, questions: updatedQuestions, direction };
          }
        }

        if (!currentQ.selected_option) {
          updatedQuestions[currentIdx] = {
            ...updatedQuestions[currentIdx],
            notAttended: true,
          };
        }

        return {
          ...state,
          questions: updatedQuestions,
          selectedIndex: proposedNext,
          direction,
        };
      }

      return {
        ...state,
        questions: updatedQuestions,
      };
    }

    default:
      return state;
  }
}

const useQuestionServices = () => {
  const { publishNotification } = useAlert();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, selectedIndex, finalOutput, questionsWrapper } = state;
  const [timer, setTimer] = useState(0);

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isComprehensiveModalOpen, setIsComprehensiveModalOpen] = useState(
    false
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessPageOpen, setIsSuccessPageOpen] = useState(false);
  const [finalQuizDetails, setFinalQuizDetails] = useState({});
  const questionsRef = useRef(questions);
  const hasSubmittedRef = useRef(false);
  const intervalRef = useRef(null);
  const THRESHOLD_MS = 60000;

  useEffect(() => {
    questionsRef.current = questions;
  }, [questions]);

  useEffect(() => {
    if (questionsWrapper?.total_time) {
      const totalTimeMs = questionsWrapper.total_time * 60 * 1000;
      setTimer(totalTimeMs);
    }
  }, [questionsWrapper]);

  useEffect(() => {
    if (questionsWrapper?.total_time) {
      const tickMs = 1000;

      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          const next = Math.max(0, prev - tickMs);
          if (next === 0) {
            handleSubmit();
            clearInterval(intervalRef.current);
          }
          return next;
        });
        dispatch({
          type: ACTIONS.TICK,
          payload: { tickMs, thresholdMs: THRESHOLD_MS },
        });
      }, tickMs);
    }

    return () => clearInterval(intervalRef.current);
  }, [questionsWrapper]);

  function formatMillisecondsToMinSeconds(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await APIRequest.multipartFormDataRequest(
        "GET",
        API_ENDPOINTS.getQuestions
      );
      if (response?.success) {
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: response });
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionChange = useCallback(
    (questionId, optionId) => {
      const q = state.questions.find((x) => x?.question_id === questionId);
      const selectedCount = q?.selectedCount || 0;
      if (selectedCount === 1) {
        publishNotification("You have already selected an option", "error");
        return;
      }
      dispatch({
        type: ACTIONS.SELECT_OPTION,
        payload: { questionId, optionId },
      });
    },
    [state.questions.length, publishNotification]
  );

  const handleNextClick = useCallback(
    (qstnId, qstnNumber) => {

      if (!state.questions?.length) return;
      if (questionsRef.current[qstnNumber]?.timeSpent >= THRESHOLD_MS) {
        publishNotification(
          "You have used alotted time for the next question, please select any other question",
          "warning"
        );
        return;
      }
      dispatch({ type: ACTIONS.NEXT });
    },
    [state.questions.length]
  );

  const handlePreviousClick = useCallback(
    (qstnId, qstnNumber) => {
      const prevQstnIndex = qstnNumber - 2;

      if (!state.questions?.length) return;
      if (questionsRef.current[prevQstnIndex]?.timeSpent >= THRESHOLD_MS) {
        publishNotification(
          "You have used alotted time for the previous question, please select any other question",
          "warning"
        );
        return;
      }
      dispatch({ type: ACTIONS.PREV });
    },
    [state.questions.length]
  );

  const handleMarkForReview = useCallback(
    (questionId) => {
      publishNotification("Question marked for review", "success");
      dispatch({ type: ACTIONS.MARK_REVIEW, payload: { questionId } });
    },
    [publishNotification]
  );

  const setSelectedQuestion = useCallback(
    (qtn) => {
      if (!qtn) {
        dispatch({ type: ACTIONS.SET_SELECTED_INDEX, payload: -1 });
        return;
      }
      const idx = state.questions.findIndex(
        (question) => question?.question_id === qtn.question_id
      );

      if (questionsRef.current[idx]?.timeSpent >= THRESHOLD_MS) {
        publishNotification(
          "You have used alotted time for the selected question, please select any other question",
          "warning"
        );
        return;
      }
      if (idx !== -1)
        dispatch({ type: ACTIONS.SET_SELECTED_INDEX, payload: idx });
    },
    [state.questions]
  );

  const selectedQuestion =
    selectedIndex >= 0 ? state.questions[selectedIndex] : null;

  const handlePreview = async () => {
    setIsSubmitModalOpen(true);
    hasSubmittedRef.current = false;
  };

  const handleSubmit = async () => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;
    try {
      setIsLoading(true);
      const answers = (questionsRef.current || []).map((q) => ({
        question_id: q?.question_id,
        selected_option_id: q?.selected_option ?? null,
      }));

      const form = new FormData();
      form.append("answers", JSON.stringify(answers));

      const response = await APIRequest.multipartFormDataRequest(
        "POST",
        API_ENDPOINTS.submitTest,
        form
      );
      if (response?.success) {
        setFinalQuizDetails(response);
        setIsSuccessPageOpen(true);
      }
    } catch (error) {
      publishNotification(
        err?.message || "An error occurred during submitting",
        "error"
      );
      hasSubmittedRef.current = false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    questions,
    selectedQuestion,
    setSelectedQuestion,
    handleMarkForReview,
    handleNextClick,
    handlePreviousClick,
    handleOptionChange,
    finalOutput,
    formatMillisecondsToMinSeconds,
    timer,
    handlePreview,
    setIsSubmitModalOpen,
    isSubmitModalOpen,
    handleSubmit,
    isLoading,
    isSuccessPageOpen,
    setIsSuccessPageOpen,
    finalQuizDetails,
    isComprehensiveModalOpen,
    setIsComprehensiveModalOpen,
  };
};

export default useQuestionServices;
