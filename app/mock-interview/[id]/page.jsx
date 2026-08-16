"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";

export default function MockInterviewDetailPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id;

  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirect to login if not authenticated
  if (!authLoading && !isAuthenticated) {
    router.push("/login");
    return null;
  }

  useEffect(() => {
    if (isAuthenticated && sessionId) {
      fetchSession();
    }
  }, [isAuthenticated, sessionId]);

  const fetchSession = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(`/api/mock-interview/${sessionId}`);
      const data = await res.json();

      if (!data.isSuccess) {
        throw new Error(data.message || "Failed to fetch session");
      }

      setSession(data.data);
    } catch (err) {
      console.error("Error fetching session:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Loading while checking auth or fetching data
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F5ED] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#f7dc6f] mx-auto mb-4"></div>
          <p className="text-[#263d4d] text-lg">
            {authLoading ? "Loading..." : "Fetching interview session..."}
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-[#F8F5ED] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
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
          <h2 className="text-2xl font-bold text-[#263d4d] mb-4">
            {error.includes("not found") ? "Session Not Found" : "Error"}
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {error.includes("not found") ? (
              <Link
                href="/mock-interview/history"
                className="bg-[#1b5276] hover:bg-[#153f5e] text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
              >
                View History
              </Link>
            ) : (
              <button
                onClick={fetchSession}
                className="bg-[#1b5276] hover:bg-[#153f5e] text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
              >
                Try Again
              </button>
            )}
            <Link
              href="/mock-interview"
              className="bg-[#f7dc6f] hover:bg-[#e5c55c] text-[#263d4d] font-bold py-3 px-8 rounded-full transition-all duration-300"
            >
              Create New Interview
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Session Detail View
  if (!session) {
    return (
      <div className="min-h-screen bg-[#F8F5ED] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Session not found</p>
          <Link
            href="/mock-interview/history"
            className="inline-block mt-4 text-[#1b5276] hover:underline"
          >
            View your history
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5ED]">
      {/* Header */}
      <div className="bg-[#263d4d] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <Link
              href="/mock-interview/history"
              className="inline-flex items-center text-white/70 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to History
            </Link>
            <span className="text-white/50 text-sm">
              {formatDate(session.created_at)}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {session.role}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            {session.experience_level && (
              <span className="inline-block bg-white/10 text-white px-3 py-1 rounded-full text-sm">
                {session.experience_level}
              </span>
            )}
            {session.subject && (
              <span className="inline-block bg-white/10 text-white px-3 py-1 rounded-full text-sm">
                {session.subject}
              </span>
            )}
            <span className="inline-block bg-[#f7dc6f] text-[#263d4d] px-3 py-1 rounded-full text-sm font-medium">
              {session.num_questions} questions
            </span>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {session.questions.map((q, index) => (
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/mock-interview"
              className="bg-[#f7dc6f] hover:bg-[#e5c55c] text-[#263d4d] font-bold py-3 px-8 rounded-full transition-all duration-300 text-center"
            >
              Create New Interview
            </Link>
            <Link
              href="/mock-interview/history"
              className="bg-[#1b5276] hover:bg-[#153f5e] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 text-center"
            >
              View All History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
