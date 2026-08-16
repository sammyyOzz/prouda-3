"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

// Quiz States
const QUIZ_STATE = {
  LOADING: "loading",
  ERROR: "error",
  QUESTION: "question",
  USER_INFO: "user_info",
  SUBMITTING: "submitting",
  RESULTS: "results",
};

export default function CareerQuizPage() {
  const [quizState, setQuizState] = useState(QUIZ_STATE.LOADING);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userInfo, setUserInfo] = useState({ fullName: "", email: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [submissionId, setSubmissionId] = useState(null);

  // Fetch questions on mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setQuizState(QUIZ_STATE.LOADING);
      const res = await fetch("/api/career-quiz/questions");
      const data = await res.json();

      if (!data.isSuccess) {
        throw new Error(data.message || "Failed to load questions");
      }

      setQuestions(data.data);
      setQuizState(QUIZ_STATE.QUESTION);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError(err.message);
      setQuizState(QUIZ_STATE.ERROR);
    }
  };

  const handleAnswerSelect = (optionId) => {
    const question = questions[currentQuestionIndex];
    const newAnswer = {
      question_id: question._id,
      selected_option_id: optionId,
    };

    // Update answers
    const existingAnswerIndex = answers.findIndex(
      (a) => a.question_id === question._id,
    );

    let newAnswers;
    if (existingAnswerIndex >= 0) {
      newAnswers = [...answers];
      newAnswers[existingAnswerIndex] = newAnswer;
    } else {
      newAnswers = [...answers, newAnswer];
    }

    setAnswers(newAnswers);

    // Move to next question or user info screen
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizState(QUIZ_STATE.USER_INFO);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleUserInfoSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo.fullName.trim() || !userInfo.email.trim()) {
      return;
    }

    setQuizState(QUIZ_STATE.SUBMITTING);

    try {
      const res = await fetch("/api/career-quiz/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: userInfo.fullName.trim(),
          email: userInfo.email.trim().toLowerCase(),
          answers: answers,
        }),
      });

      const data = await res.json();

      if (!data.isSuccess) {
        throw new Error(data.message || "Failed to submit quiz");
      }

      setResult(data.data);
      setSubmissionId(data.data.submission_id);
      setQuizState(QUIZ_STATE.RESULTS);
    } catch (err) {
      console.error("Error submitting quiz:", err);
      setError(err.message);
      setQuizState(QUIZ_STATE.ERROR);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setUserInfo({ fullName: "", email: "" });
    setResult(null);
    setSubmissionId(null);
    setError(null);
    setQuizState(QUIZ_STATE.QUESTION);
  };

  const progress =
    questions.length > 0
      ? Math.round(
          ((currentQuestionIndex +
            (quizState === QUIZ_STATE.USER_INFO ? 1 : 0)) /
            (questions.length + 1)) *
            100,
        )
      : 0;

  // Loading Screen
  if (quizState === QUIZ_STATE.LOADING) {
    return (
      <div className="min-h-screen bg-[#F8F5ED] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#f7dc6f] mx-auto mb-4"></div>
          <p className="text-[#263d4d] text-lg">Loading quiz...</p>
        </div>
      </div>
    );
  }

  // Error Screen
  if (quizState === QUIZ_STATE.ERROR) {
    return (
      <div className="min-h-screen bg-[#F8F5ED] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <svg
              className="w-16 h-16 text-red-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#263d4d] mb-4">Oops!</h2>
          <p className="text-gray-600 mb-6">
            {error || "Something went wrong. Please try again."}
          </p>
          <button
            onClick={fetchQuestions}
            className="bg-[#1b5276] hover:bg-[#153f5e] text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
          >
            Try Again
          </button>
          <Link href="/" className="block mt-4 text-[#1b5276] hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Results Screen
  if (quizState === QUIZ_STATE.RESULTS && result) {
    return (
      <div className="min-h-screen bg-[#F8F5ED] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263d4d] mb-4">
              Your Career Analysis
            </h1>
            <p className="text-gray-600 text-lg">
              Personalized for {result.full_name}
            </p>
          </div>

          {/* Results Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 mb-8">
            <div className="prose prose-lg max-w-none text-gray-700">
              {result.generated_result.split("\n").map(
                (paragraph, idx) =>
                  paragraph.trim() && (
                    <p key={idx} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ),
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetakeQuiz}
              className="bg-[#f7dc6f] hover:bg-[#e5c55c] text-[#263d4d] font-bold py-3 px-8 rounded-full transition-all duration-300"
            >
              Retake Quiz
            </button>
            <Link
              href="/courses"
              className="bg-[#1b5276] hover:bg-[#153f5e] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 text-center"
            >
              Explore Courses
            </Link>
          </div>

          {/* <p className="text-center text-gray-500 mt-6 text-sm">
            Result saved. You can return to this page anytime using your email.
          </p> */}
        </div>
      </div>
    );
  }

  // Submitting Screen
  if (quizState === QUIZ_STATE.SUBMITTING) {
    return (
      <div className="min-h-screen bg-[#F8F5ED] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#f7dc6f] mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-[#263d4d] mb-4">
            Generating Your Analysis
          </h2>
          <p className="text-gray-600">
            Our AI is analyzing your responses to create a personalized career
            suitability report. This may take a moment...
          </p>
        </div>
      </div>
    );
  }

  // User Info Form
  if (quizState === QUIZ_STATE.USER_INFO) {
    return (
      <div className="min-h-screen bg-[#F8F5ED] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Almost there!
              </span>
              <span className="text-sm font-medium text-[#f7dc6f]">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-[#f7dc6f] h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#263d4d] mb-2">
              Last Step
            </h2>
            <p className="text-gray-600 mb-8">
              Enter your details to receive your personalized career analysis.
            </p>

            <form onSubmit={handleUserInfoSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={userInfo.fullName}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, fullName: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f7dc6f] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f7dc6f] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setQuizState(QUIZ_STATE.QUESTION);
                    setCurrentQuestionIndex(questions.length - 1);
                  }}
                  className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 font-bold rounded-full hover:bg-gray-50 transition-all duration-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 bg-[#1b5276] hover:bg-[#153f5e] text-white font-bold rounded-full transition-all duration-300"
                >
                  Get My Analysis
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Question Screen
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-[#F8F5ED]">
      {/* Hero Section */}
      <div className="bg-[#263d4d] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white leading-tight tracking-tight mb-8">
            Discover your ideal teaching career
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Answer {questions.length} questions. Get a personalized AI career
            analysis and course recommendations matched to your personality,
            experience and goals.
          </p>
          {/* Decorative accent */}
          <div className="mt-10 flex justify-center">
            <div className="h-1.5 w-32 bg-[#f7dc6f] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Quiz Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-[#f7dc6f]">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-[#f7dc6f] h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-[#f7dc6f]/20 text-[#263d4d] text-sm font-medium px-3 py-1 rounded-full">
                {currentQuestion?.category}
              </span>
            </div>

            {/* Question Text */}
            <h2 className="text-xl sm:text-2xl font-bold text-[#263d4d] mb-8">
              {currentQuestion?.text}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion?.options.map((option) => {
                const isSelected = answers.some(
                  (a) =>
                    a.question_id === currentQuestion._id &&
                    a.selected_option_id === option.id,
                );

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? "border-[#f7dc6f] bg-[#f7dc6f]/10"
                        : "border-gray-200 hover:border-[#f7dc6f] hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                          isSelected
                            ? "border-[#f7dc6f] bg-[#f7dc6f]"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-gray-700 font-medium">
                        {option.text}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className={`flex-1 py-3 px-6 border-2 font-bold rounded-full transition-all duration-300 ${
                  currentQuestionIndex === 0
                    ? "border-gray-100 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Previous
              </button>
              <div className="flex-1"></div>
            </div>
          </div>

          {/* Quiz Info */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>Discover your ideal teaching career path</p>
          </div>
        </div>
      </div>
    </div>
  );
}
