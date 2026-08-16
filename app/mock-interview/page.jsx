"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";

// Page States
const PAGE_STATE = {
  FORM: "form",
  GENERATING: "generating",
  RESULTS: "results",
  ERROR: "error",
};

export default function MockInterviewPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [pageState, setPageState] = useState(PAGE_STATE.FORM);
  const [formData, setFormData] = useState({
    role: "",
    experience_level: "",
    subject: "",
    num_questions: 5,
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Redirect to login if not authenticated
  if (!authLoading && !isAuthenticated) {
    router.push("/login");
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "num_questions" ? parseInt(value, 10) || 5 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role.trim()) {
      setError("Please enter a role");
      return;
    }

    setPageState(PAGE_STATE.GENERATING);
    setError(null);

    try {
      const res = await fetch("/api/mock-interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: formData.role.trim(),
          experience_level: formData.experience_level.trim() || null,
          subject: formData.subject.trim() || null,
          num_questions: formData.num_questions,
        }),
      });

      const data = await res.json();

      if (!data.isSuccess) {
        throw new Error(data.message || "Failed to generate interview questions");
      }

      setResult(data.data);
      setPageState(PAGE_STATE.RESULTS);
    } catch (err) {
      console.error("Error generating interview:", err);
      setError(err.message);
      setPageState(PAGE_STATE.ERROR);
    }
  };

  const handleStartOver = () => {
    setFormData({
      role: "",
      experience_level: "",
      subject: "",
      num_questions: 5,
    });
    setResult(null);
    setError(null);
    setPageState(PAGE_STATE.FORM);
  };

  // Loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F8F5ED] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#f7dc6f] mx-auto mb-4"></div>
          <p className="text-[#263d4d] text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Generating State
  if (pageState === PAGE_STATE.GENERATING) {
    return (
      <div className="min-h-screen bg-[#F8F5ED] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#f7dc6f] mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-[#263d4d] mb-4">
            Generating Interview Questions
          </h2>
          <p className="text-gray-600">
            Our AI is creating personalized interview questions and model answers
            for your role. This may take a moment...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (pageState === PAGE_STATE.ERROR) {
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
            onClick={handleStartOver}
            className="bg-[#1b5276] hover:bg-[#153f5e] text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Results State
  if (pageState === PAGE_STATE.RESULTS && result) {
    return (
      <div className="min-h-screen bg-[#F8F5ED] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#263d4d] mb-3">
              Mock Interview: {result.role}
            </h1>
            {(result.experience_level || result.subject) && (
              <p className="text-gray-600">
                {result.experience_level && `${result.experience_level}`}
                {result.experience_level && result.subject && " • "}
                {result.subject}
              </p>
            )}
          </div>

          {/* Questions */}
          <div className="space-y-6 mb-10">
            {result.questions.map((q, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="bg-[#263d4d] px-6 py-4">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#f7dc6f] text-[#263d4d] rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </span>
                    <h3 className="text-white font-semibold text-lg pt-0.5">
                      {q.question}
                    </h3>
                  </div>
                </div>
                <div className="px-6 py-5">
                  <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-2">
                    Model Answer
                  </p>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {q.model_answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartOver}
              className="bg-[#f7dc6f] hover:bg-[#e5c55c] text-[#263d4d] font-bold py-3 px-8 rounded-full transition-all duration-300"
            >
              Create New Interview
            </button>
            <Link
              href="/mock-interview/history"
              className="bg-[#1b5276] hover:bg-[#153f5e] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 text-center"
            >
              View History
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Form State
  return (
    <div className="min-h-screen bg-[#F8F5ED]">
      {/* Hero Section */}
      <div className="bg-[#263d4d] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            AI Mock Interview
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Practice for your next role with AI-generated interview questions and
            model answers tailored to your experience level.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="h-1.5 w-32 bg-[#f7dc6f] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-[#263d4d] mb-2">
              Set Up Your Interview
            </h2>
            <p className="text-gray-600 mb-8">
              Tell us about the role you&apos;re preparing for.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Input */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Role / Position *
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Mathematics Teacher, Software Engineer"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f7dc6f] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Experience Level Input */}
              <div>
                <label
                  htmlFor="experience_level"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Experience Level
                </label>
                <select
                  id="experience_level"
                  name="experience_level"
                  value={formData.experience_level}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f7dc6f] focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="">Select experience level</option>
                  <option value="entry-level">Entry-level</option>
                  <option value="mid-level">Mid-level</option>
                  <option value="senior">Senior</option>
                  <option value="lead">Lead / Principal</option>
                </select>
              </div>

              {/* Subject Input */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject / Specialization
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="e.g., Physics, English Literature, Data Science"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f7dc6f] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Number of Questions */}
              <div>
                <label
                  htmlFor="num_questions"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Number of Questions: {formData.num_questions}
                </label>
                <input
                  type="range"
                  id="num_questions"
                  name="num_questions"
                  min="1"
                  max="20"
                  value={formData.num_questions}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1b5276]"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>10</span>
                  <span>20</span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 bg-[#1b5276] hover:bg-[#153f5e] text-white font-bold rounded-full transition-all duration-300"
              >
                Generate Interview
              </button>

              {/* History Link */}
              <div className="text-center pt-2">
                <Link
                  href="/mock-interview/history"
                  className="text-[#1b5276] hover:underline text-sm"
                >
                  View your past interviews
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
