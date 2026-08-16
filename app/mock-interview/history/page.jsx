"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";

export default function MockInterviewHistoryPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirect to login if not authenticated
  if (!authLoading && !isAuthenticated) {
    router.push("/login");
    return null;
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchSessions();
    }
  }, [isAuthenticated]);

  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/mock-interview/history");
      const data = await res.json();

      if (!data.isSuccess) {
        throw new Error(data.message || "Failed to fetch session history");
      }

      setSessions(data.data);
    } catch (err) {
      console.error("Error fetching sessions:", err);
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
            {authLoading ? "Loading..." : "Fetching your interviews..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5ED]">
      {/* Header */}
      <div className="bg-[#263d4d] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/mock-interview"
            className="inline-flex items-center text-white/70 hover:text-white mb-4 transition-colors"
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
            Back to Mock Interview
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Your Interview History
          </h1>
          <p className="text-white/70 mt-2">
            Review your past AI mock interview sessions
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Error State */}
          {error && (
            <div className="text-center py-12">
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
              <h2 className="text-xl font-bold text-[#263d4d] mb-4">
                Failed to load history
              </h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={fetchSessions}
                className="bg-[#1b5276] hover:bg-[#153f5e] text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!error && sessions.length === 0 && (
            <div className="text-center py-16">
              <div className="mb-6">
                <svg
                  className="w-20 h-20 text-gray-300 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#263d4d] mb-3">
                No interviews yet
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                You haven&apos;t created any mock interview sessions yet.
                Start practicing for your next role!
              </p>
              <Link
                href="/mock-interview"
                className="inline-block bg-[#1b5276] hover:bg-[#153f5e] text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
              >
                Create Your First Interview
              </Link>
            </div>
          )}

          {/* Sessions List */}
          {!error && sessions.length > 0 && (
            <div className="space-y-4">
              {sessions.map((session) => (
                <Link
                  key={session._id}
                  href={`/mock-interview/${session._id}`}
                  className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#263d4d] mb-1">
                        {session.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                        {session.experience_level && (
                          <span className="inline-block bg-gray-100 px-2 py-1 rounded">
                            {session.experience_level}
                          </span>
                        )}
                        {session.subject && (
                          <span className="inline-block bg-gray-100 px-2 py-1 rounded">
                            {session.subject}
                          </span>
                        )}
                        <span className="inline-block bg-[#f7dc6f]/20 text-[#263d4d] px-2 py-1 rounded">
                          {session.num_questions} questions
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <span className="text-sm text-gray-400">
                        {formatDate(session.created_at)}
                      </span>
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Create New Button */}
              <div className="text-center pt-8">
                <Link
                  href="/mock-interview"
                  className="inline-block bg-[#f7dc6f] hover:bg-[#e5c55c] text-[#263d4d] font-bold py-3 px-8 rounded-full transition-all duration-300"
                >
                  Create New Interview
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
