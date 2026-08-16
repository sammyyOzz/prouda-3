"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";

const TOOL_NAME = "cv_builder";

const STEP = {
  START: "start",
  UPLOAD: "upload",
  EXTRACTING: "extracting",
  FORM: "form",
  GENERATING: "generating",
  RESULTS: "results",
  ERROR: "error",
};

const EMPTY_PROFILE = {
  full_name: "",
  email: "",
  phone: "",
  city: "",
  linkedin: "",
  professional_summary_input: "",
  work_experience: "",
  education: "",
  certifications: "",
  skills: "",
};

function inputClass() {
  return "w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f7dc6f] focus:border-transparent outline-none transition-all";
}

export default function CVBuilderPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState(STEP.START);
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [jobDescription, setJobDescription] = useState("");
  const [wantsCoverLetter, setWantsCoverLetter] = useState(false);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [usage, setUsage] = useState(null);
  const [history, setHistory] = useState([]);

  const loadUsage = useCallback(async () => {
    try {
      const res = await fetch(`/api/billing/usage/${TOOL_NAME}`, { cache: "no-store" });
      const data = await res.json();
      if (data.isSuccess) setUsage(data.data);
    } catch (err) {
      console.error("Error loading trial usage:", err);
    }
  }, []);

  const loadHistory = useCallback(async () => {
    try {
      const res = await fetch("/api/cv-builder");
      const data = await res.json();
      if (data.isSuccess) setHistory(data.data);
    } catch (err) {
      console.error("Error loading CV history:", err);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadUsage();
      loadHistory();
    }
  }, [isAuthenticated, loadUsage, loadHistory]);

  if (!authLoading && !isAuthenticated) {
    router.push("/login");
    return null;
  }

  const resetAll = () => {
    setProfile(EMPTY_PROFILE);
    setJobDescription("");
    setWantsCoverLetter(false);
    setFile(null);
    setResult(null);
    setError(null);
    setStep(STEP.START);
    loadUsage();
    loadHistory();
  };

  const handleExtract = async () => {
    if (!file) return;
    setStep(STEP.EXTRACTING);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/cv-builder/extract", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!data.isSuccess) {
        throw new Error(data.message || "Failed to read your resume");
      }

      setProfile({
        full_name: data.data.full_name || "",
        email: data.data.email || "",
        phone: data.data.phone || "",
        city: data.data.city || "",
        linkedin: data.data.linkedin || "",
        professional_summary_input: data.data.professional_summary_input || "",
        work_experience: data.data.work_experience || "",
        education: data.data.education || "",
        certifications: data.data.certifications || "",
        skills: data.data.skills || "",
      });
      setStep(STEP.FORM);
    } catch (err) {
      console.error("Error extracting resume:", err);
      setError(err.message);
      setStep(STEP.ERROR);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usage && !usage.can_use) return;

    setStep(STEP.GENERATING);
    setError(null);

    try {
      const res = await fetch("/api/cv-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile,
          job_description: jobDescription.trim() || null,
          generate_cover_letter: wantsCoverLetter,
        }),
      });

      const data = await res.json();

      if (!data.isSuccess) {
        if (res.status === 402) {
          setError("You've used all your free trials for this tool. Subscribe to keep generating resumes.");
        } else {
          setError(data.message || "Failed to generate your resume");
        }
        setStep(STEP.ERROR);
        return;
      }

      setResult(data.data);
      setStep(STEP.RESULTS);
      loadUsage();
    } catch (err) {
      console.error("Error generating resume:", err);
      setError(err.message);
      setStep(STEP.ERROR);
    }
  };

  const canGenerateCoverLetter = jobDescription.trim().length > 0;
  const trialsExhausted = usage && !usage.can_use;

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

  if (step === STEP.EXTRACTING) {
    return (
      <div className="min-h-screen bg-[#F8F5ED] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#f7dc6f] mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-[#263d4d] mb-4">Reading Your Resume</h2>
          <p className="text-gray-600">We&apos;re pulling out your details to pre-fill the form...</p>
        </div>
      </div>
    );
  }

  if (step === STEP.GENERATING) {
    return (
      <div className="min-h-screen bg-[#F8F5ED] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#f7dc6f] mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-[#263d4d] mb-4">Building Your Resume</h2>
          <p className="text-gray-600">
            Our AI is writing your resume{wantsCoverLetter ? " and cover letter" : ""}. This may take a moment...
          </p>
        </div>
      </div>
    );
  }

  if (step === STEP.ERROR) {
    return (
      <div className="min-h-screen bg-[#F8F5ED] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-[#263d4d] mb-4">Oops!</h2>
          <p className="text-gray-600 mb-6">{error || "Something went wrong. Please try again."}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setStep(STEP.FORM)}
              className="bg-[#1b5276] hover:bg-[#153f5e] text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
            >
              Try Again
            </button>
            {trialsExhausted && (
              <Link
                href="/pricing"
                className="bg-[#f7dc6f] hover:bg-[#e5c55c] text-[#263d4d] font-bold py-3 px-8 rounded-full transition-all duration-300"
              >
                View Pricing
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === STEP.RESULTS && result) {
    const resume = result.resume;
    return (
      <div className="min-h-screen bg-[#F8F5ED] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#263d4d] mb-3">Your Resume Is Ready</h1>
            <p className="text-gray-600">Review it below, then download your PDF.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href={`/api/cv-builder/${result._id}/resume-pdf`}
              download
              className="bg-[#1b5276] hover:bg-[#153f5e] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 text-center"
            >
              Download Resume (PDF)
            </a>
            {result.cover_letter && (
              <a
                href={`/api/cv-builder/${result._id}/cover-letter-pdf`}
                download
                className="bg-[#f7dc6f] hover:bg-[#e5c55c] text-[#263d4d] font-bold py-3 px-8 rounded-full transition-all duration-300 text-center"
              >
                Download Cover Letter (PDF)
              </a>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-[#263d4d] mb-2">{result.full_name}</h2>
            <p className="text-sm text-gray-500 mb-6">
              {[result.email, result.phone, result.city, result.linkedin].filter(Boolean).join(" | ")}
            </p>

            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1b5276] mb-2">Summary</h3>
            <p className="text-gray-700 mb-6 whitespace-pre-wrap">{resume.summary}</p>

            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1b5276] mb-2">Experience</h3>
            <div className="space-y-4 mb-6">
              {resume.experience.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between flex-wrap gap-x-4">
                    <span className="font-semibold text-[#263d4d]">{item.title}</span>
                    <span className="text-sm text-gray-500">{item.dates}</span>
                  </div>
                  <p className="text-sm italic text-gray-600 mb-1">{item.company}</p>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                    {item.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1b5276] mb-2">Education</h3>
            <div className="space-y-2 mb-6">
              {resume.education.map((item, idx) => (
                <div key={idx} className="flex justify-between flex-wrap gap-x-4">
                  <span className="font-semibold text-[#263d4d]">{item.degree}</span>
                  <span className="text-sm text-gray-500">{item.dates}</span>
                  {item.institution && <span className="text-sm text-gray-600 w-full">{item.institution}</span>}
                </div>
              ))}
            </div>

            {resume.certifications.length > 0 && (
              <>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1b5276] mb-2">Certifications</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-6">
                  {resume.certifications.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </>
            )}

            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1b5276] mb-2">Skills</h3>
            <p className="text-gray-700 text-sm">{resume.skills.join(", ")}</p>
          </div>

          {result.cover_letter && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1b5276] mb-4">Cover Letter</h3>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{result.cover_letter}</p>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={resetAll}
              className="bg-[#1b5276] hover:bg-[#153f5e] text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
            >
              Build Another Resume
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === STEP.UPLOAD) {
    return (
      <div className="min-h-screen bg-[#F8F5ED] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-[#263d4d] mb-2">Upload Your Resume</h2>
            <p className="text-gray-600 mb-8">
              We&apos;ll pull your details out automatically so you can just review and confirm them.
            </p>

            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full mb-6 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#f7dc6f] file:text-[#263d4d] file:font-bold hover:file:bg-[#e5c55c]"
            />

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(STEP.START)}
                className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 font-bold rounded-full hover:bg-gray-50 transition-all duration-300"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleExtract}
                disabled={!file}
                className={`flex-1 py-3 px-6 font-bold rounded-full transition-all duration-300 ${
                  file
                    ? "bg-[#1b5276] hover:bg-[#153f5e] text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === STEP.FORM) {
    return (
      <div className="min-h-screen bg-[#F8F5ED] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {usage && (
            <div
              className={`mb-6 rounded-xl p-4 text-sm font-medium text-center ${
                trialsExhausted ? "bg-red-50 text-red-700 border border-red-200" : "bg-[#f7dc6f]/10 text-[#263d4d]"
              }`}
            >
              {usage.has_active_subscription
                ? "You have unlimited access with your subscription."
                : trialsExhausted
                  ? "You've used all 3 free resumes. Subscribe to keep generating."
                  : `${usage.remaining} of ${usage.free_trials} free resumes remaining.`}
              {trialsExhausted && (
                <>
                  {" "}
                  <Link href="/pricing" className="underline font-semibold">
                    View pricing
                  </Link>
                </>
              )}
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-[#263d4d] mb-2">Your Details</h2>
            <p className="text-gray-600 mb-8">
              Fill in or confirm your information. Our AI will turn this into a polished resume.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="full_name"
                    value={profile.full_name}
                    onChange={handleProfileChange}
                    required
                    className={inputClass()}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    required
                    className={inputClass()}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    required
                    className={inputClass()}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={profile.city}
                    onChange={handleProfileChange}
                    required
                    className={inputClass()}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn (optional)</label>
                <input
                  type="text"
                  name="linkedin"
                  value={profile.linkedin}
                  onChange={handleProfileChange}
                  placeholder="linkedin.com/in/your-name"
                  className={inputClass()}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What best describes you? (optional)
                </label>
                <textarea
                  name="professional_summary_input"
                  value={profile.professional_summary_input}
                  onChange={handleProfileChange}
                  rows={2}
                  placeholder="e.g. A dedicated math tutor with 5 years of experience helping students build confidence"
                  className={inputClass()}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Experience *</label>
                <textarea
                  name="work_experience"
                  value={profile.work_experience}
                  onChange={handleProfileChange}
                  required
                  rows={5}
                  placeholder="List each role: company, title, dates, and what you did"
                  className={inputClass()}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education *</label>
                <textarea
                  name="education"
                  value={profile.education}
                  onChange={handleProfileChange}
                  required
                  rows={3}
                  placeholder="School, degree, and dates"
                  className={inputClass()}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certifications (optional)</label>
                <textarea
                  name="certifications"
                  value={profile.certifications}
                  onChange={handleProfileChange}
                  rows={2}
                  className={inputClass()}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills *</label>
                <textarea
                  name="skills"
                  value={profile.skills}
                  onChange={handleProfileChange}
                  required
                  rows={2}
                  placeholder="e.g. Classroom management, Curriculum design, Bilingual (English/Spanish)"
                  className={inputClass()}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description (optional — tailors your resume and unlocks a cover letter)
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={5}
                  placeholder="Paste the job posting you're applying to"
                  className={inputClass()}
                />
              </div>

              <label className="flex items-center gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={wantsCoverLetter}
                  disabled={!canGenerateCoverLetter}
                  onChange={(e) => setWantsCoverLetter(e.target.checked)}
                  className="w-5 h-5 accent-[#1b5276]"
                />
                Also generate a matching cover letter
                {!canGenerateCoverLetter && (
                  <span className="text-gray-400">(paste a job description above to enable)</span>
                )}
              </label>

              <button
                type="submit"
                disabled={trialsExhausted}
                className={`w-full py-3 px-6 font-bold rounded-full transition-all duration-300 ${
                  trialsExhausted
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-[#1b5276] hover:bg-[#153f5e] text-white"
                }`}
              >
                {trialsExhausted ? "Free trials used up" : "Generate My Resume"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // START
  return (
    <div className="min-h-screen bg-[#F8F5ED]">
      <div className="bg-[#263d4d] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            AI CV / Resume Builder
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Build a polished, professional resume in minutes — with an optional matching cover letter.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="h-1.5 w-32 bg-[#f7dc6f] rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {usage && !usage.has_active_subscription && (
            <p className="text-center text-sm text-gray-600 mb-6">
              {usage.remaining > 0
                ? `You have ${usage.remaining} of ${usage.free_trials} free resumes remaining.`
                : "You've used all your free resumes. Subscribe to keep generating."}
            </p>
          )}

          <div className="grid sm:grid-cols-2 gap-6">
            <button
              onClick={() => setStep(STEP.FORM)}
              className="bg-white rounded-2xl shadow-xl p-8 text-left hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#f7dc6f]"
            >
              <h2 className="text-xl font-bold text-[#263d4d] mb-2">Start with a Job Description</h2>
              <p className="text-gray-600 text-sm">
                Paste a job posting and we&apos;ll tailor your resume to match it.
              </p>
            </button>

            <button
              onClick={() => setStep(STEP.UPLOAD)}
              className="bg-white rounded-2xl shadow-xl p-8 text-left hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#f7dc6f]"
            >
              <h2 className="text-xl font-bold text-[#263d4d] mb-2">Upload Your Existing Resume</h2>
              <p className="text-gray-600 text-sm">
                We&apos;ll extract your details and let you review them before generating.
              </p>
            </button>
          </div>

          {history.length > 0 && (
            <div className="mt-12">
              <h3 className="text-lg font-bold text-[#263d4d] mb-4">Your Recent Resumes</h3>
              <div className="space-y-3">
                {history.slice(0, 5).map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow p-4 flex items-center justify-between flex-wrap gap-2"
                  >
                    <div>
                      <p className="font-semibold text-[#263d4d]">{item.full_name}</p>
                      <p className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-3 text-sm">
                      <a href={`/api/cv-builder/${item._id}/resume-pdf`} download className="text-[#1b5276] hover:underline">
                        Resume PDF
                      </a>
                      {item.has_cover_letter && (
                        <a
                          href={`/api/cv-builder/${item._id}/cover-letter-pdf`}
                          download
                          className="text-[#1b5276] hover:underline"
                        >
                          Cover Letter PDF
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
