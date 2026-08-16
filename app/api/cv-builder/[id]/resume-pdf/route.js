const API_URL = process.env.API_URL || "http://localhost:8000";

/**
 * GET /api/cv-builder/[id]/resume-pdf
 * Stream the generated resume PDF back to the browser
 */
export async function GET(request, { params }) {
  const { id } = await params;
  const cookieHeader = request.headers.get("cookie") || "";

  const res = await fetch(`${API_URL}/cv-builder/${id}/resume.pdf`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ isSuccess: false, message: "Failed to fetch resume PDF" }), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(res.body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": res.headers.get("content-disposition") || "attachment; filename=Resume.pdf",
    },
  });
}
