'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Quiz States
const QUIZ_STATE = {
  LOADING: 'loading',
  ERROR: 'error',
  QUESTION: 'question',
  USER_INFO: 'user_info',
  SUBMITTING: 'submitting',
  RESULTS: 'results',
};

export default function VideoScriptGeneratorPage() {
  const [quizState, setQuizState] = useState(QUIZ_STATE.LOADING);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userInfo, setUserInfo] = useState({ fullName: '', email: '' });
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
      const res = await fetch('/api/video-script-generator/questions');
      const data = await res.json();

      if (!data.isSuccess) {
        throw new Error(data.message || 'Failed to load questions');
      }

      setQuestions(data.data);
      setQuizState(QUIZ_STATE.QUESTION);
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError(err.message);
      setQuizState(QUIZ_STATE.ERROR);
    }
  };

  const getCurrentAnswer = () => {
    const question = questions[currentQuestionIndex];
    return answers.find((a) => a.question_id === question._id);
  };

  const isOptionSelected = (optionId) => {
    const answer = getCurrentAnswer();
    return answer?.selected_option_ids?.includes(optionId) || false;
  };

  const handleSingleSelect = (optionId) => {
    const question = questions[currentQuestionIndex];
    const newAnswer = {
      question_id: question._id,
      selected_option_ids: [optionId],
    };

    updateAnswerAndProceed(newAnswer);
  };

  const handleMultiSelect = (optionId) => {
    const question = questions[currentQuestionIndex];
    const existingAnswer = getCurrentAnswer();

    let selectedIds;
    if (existingAnswer) {
      // Toggle selection
      if (existingAnswer.selected_option_ids.includes(optionId)) {
        selectedIds = existingAnswer.selected_option_ids.filter((id) => id !== optionId);
      } else {
        selectedIds = [...existingAnswer.selected_option_ids, optionId];
      }
    } else {
      selectedIds = [optionId];
    }

    const newAnswer = {
      question_id: question._id,
      selected_option_ids: selectedIds,
    };

    // Update answers without auto-advancing for multi-select
    const existingAnswerIndex = answers.findIndex(
      (a) => a.question_id === question._id
    );

    let newAnswers;
    if (existingAnswerIndex >= 0) {
      newAnswers = [...answers];
      newAnswers[existingAnswerIndex] = newAnswer;
    } else {
      newAnswers = [...answers, newAnswer];
    }

    setAnswers(newAnswers);
  };

  const updateAnswerAndProceed = (newAnswer) => {
    const question = questions[currentQuestionIndex];

    const existingAnswerIndex = answers.findIndex(
      (a) => a.question_id === question._id
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

  const handleNext = () => {
    const answer = getCurrentAnswer();
    if (!answer || answer.selected_option_ids.length === 0) {
      return; // Don't proceed if no answer selected
    }

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
      const res = await fetch('/api/video-script-generator/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: userInfo.fullName.trim(),
          email: userInfo.email.trim().toLowerCase(),
          answers: answers,
        }),
      });

      const data = await res.json();

      if (!data.isSuccess) {
        throw new Error(data.message || 'Failed to submit');
      }

      setResult(data.data);
      setSubmissionId(data.data.submission_id);
      setQuizState(QUIZ_STATE.RESULTS);
    } catch (err) {
      console.error('Error submitting:', err);
      setError(err.message);
      setQuizState(QUIZ_STATE.ERROR);
    }
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setUserInfo({ fullName: '', email: '' });
    setResult(null);
    setSubmissionId(null);
    setError(null);
    setQuizState(QUIZ_STATE.QUESTION);
  };

  const progress = questions.length > 0
    ? Math.round(((currentQuestionIndex + (quizState === QUIZ_STATE.USER_INFO ? 1 : 0)) / (questions.length + 1)) * 100)
    : 0;

  // Loading Screen
  if (quizState === QUIZ_STATE.LOADING) {
    return (
      <div className="min-h-screen bg-[#F8F5ED] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#f7dc6f] mx-auto mb-4"></div>
          <p className="text-[#263d4d] text-lg">Loading questions...</p>
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
            <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#263d4d] mb-4">Oops!</h2>
          <p className="text-gray-600 mb-6">{error || 'Something went wrong. Please try again.'}</p>
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263d4d] mb-4">
              Your Introduction Video Script
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Here&apos;s your personalized script, {result.full_name}. Practice it a few times and record with confidence!
            </p>
          </div>

          {/* Script Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
            {/* Script Header */}
            <div className="bg-[#1b5276] px-6 py-4">
              <h3 className="text-xl font-bold text-white">Video Script</h3>
              <p className="text-white/80 text-sm">60-90 seconds when delivered naturally</p>
            </div>

            {/* Script Content */}
            <div className="p-6 sm:p-8">
              <div className="prose prose-lg max-w-none text-gray-700">
                {result.generated_script.split('\n').map((line, idx) => {
                  const trimmedLine = line.trim();
                  if (!trimmedLine) return null;

                  // Format [SAY] and [DO] tags
                  if (trimmedLine.startsWith('[SAY]')) {
                    return (
                      <div key={idx} className="mb-4">
                        <span className="text-[#1b5276] font-semibold text-sm uppercase tracking-wide">[SAY]</span>
                        <p className="ml-4 mt-1 text-gray-800">{trimmedLine.replace('[SAY]', '').trim()}</p>
                      </div>
                    );
                  }
                  if (trimmedLine.startsWith('[DO]')) {
                    return (
                      <div key={idx} className="mb-4 bg-gray-50 p-3 rounded-lg">
                        <span className="text-[#f7dc6f] font-semibold text-sm uppercase tracking-wide">[DO]</span>
                        <p className="ml-4 mt-1 text-gray-600 italic">{trimmedLine.replace('[DO]', '').trim()}</p>
                      </div>
                    );
                  }
                  return (
                    <p key={idx} className="mb-4">
                      {trimmedLine}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-[#f7dc6f]/10 rounded-2xl p-6 sm:p-8 mb-12">
            <h3 className="text-xl font-bold text-[#263d4d] mb-4">Recording Tips</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-[#1b5276] font-bold">1.</span>
                <span>Good lighting is key — face a window or use a ring light</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1b5276] font-bold">2.</span>
                <span>Look directly at the camera lens, not the screen</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1b5276] font-bold">3.</span>
                <span>Speak slowly and pause between thoughts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1b5276] font-bold">4.</span>
                <span>Smile! It comes through in your voice</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1b5276] font-bold">5.</span>
                <span>Do a few practice runs before recording</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetake}
              className="bg-[#f7dc6f] hover:bg-[#e5c55c] text-[#263d4d] font-bold py-3 px-8 rounded-full transition-all duration-300"
            >
              Start again with different answers
            </button>
            <Link
              href="/"
              className="bg-[#1b5276] hover:bg-[#153f5e] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 text-center"
            >
              Return to Home
            </Link>
          </div>
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
            Crafting Your Script
          </h2>
          <p className="text-gray-600">
            Our AI is writing a personalized video script based on your unique background and teaching style. This may take a moment...
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
              <span className="text-sm font-medium text-gray-600">Almost there!</span>
              <span className="text-sm font-medium text-[#f7dc6f]">{progress}%</span>
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
              Enter your details to receive your personalized video script.
            </p>

            <form onSubmit={handleUserInfoSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={userInfo.fullName}
                  onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f7dc6f] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
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
                  Generate My Script
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
  const isMultiSelect = currentQuestion?.question_type === 'multiple';
  const currentAnswer = getCurrentAnswer();
  const hasSelections = currentAnswer && currentAnswer.selected_option_ids.length > 0;

  return (
    <div className="min-h-screen bg-[#F8F5ED]">
      {/* Hero Section */}
      <div className="bg-[#263d4d] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white leading-tight tracking-tight mb-8">
            Create your perfect intro video
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Answer {questions.length} questions about your teaching style and background. Get a personalized 60-90 second script that helps you connect with students authentically.
          </p>
          {/* Decorative accent */}
          <div className="mt-10 flex justify-center">
            <div className="h-1.5 w-32 bg-[#f7dc6f] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Quiz Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-[#f7dc6f]">{progress}%</span>
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
            {isMultiSelect && (
              <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full ml-2">
                Select all that apply
              </span>
            )}
          </div>

          {/* Question Text */}
          <h2 className="text-xl sm:text-2xl font-bold text-[#263d4d] mb-8">
            {currentQuestion?.text}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion?.options.map((option) => {
              const isSelected = isOptionSelected(option.id);

              return (
                <button
                  key={option.id}
                  onClick={() => isMultiSelect ? handleMultiSelect(option.id) : handleSingleSelect(option.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-[#f7dc6f] bg-[#f7dc6f]/10'
                      : 'border-gray-200 hover:border-[#f7dc6f] hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 border-2 mr-4 flex items-center justify-center transition-all ${
                        isMultiSelect ? 'rounded' : 'rounded-full'
                      } ${
                        isSelected
                          ? 'border-[#f7dc6f] bg-[#f7dc6f]'
                          : 'border-gray-300'
                      }`}
                    >
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-700 font-medium">{option.text}</span>
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
                  ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            {isMultiSelect && (
              <button
                onClick={handleNext}
                disabled={!hasSelections}
                className={`flex-1 py-3 px-6 font-bold rounded-full transition-all duration-300 ${
                  hasSelections
                    ? 'bg-[#1b5276] hover:bg-[#153f5e] text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            )}
          </div>
        </div>

        {/* Quiz Info */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Create a personalized introduction that helps you stand out</p>
        </div>
      </div>
    </div>
  </div>
  );
}
