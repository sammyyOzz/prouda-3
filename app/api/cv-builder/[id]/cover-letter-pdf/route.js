const API_URL = process.env.API_URL || "http://localhost:8000";

/**
 * GET /api/cv-builder/[id]/cover-letter-pdf
 * Stream the generated cover letter PDF back to the browser
 */
export async function GET(request, { params }) {
  const { id } = await params;
  const cookieHeader = request.headers.get("cookie") || "";

  const res = await fetch(`${API_URL}/cv-builder/${id}/cover-letter.pdf`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ isSuccess: false, message: "Failed to fetch cover letter PDF" }), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(res.body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": res.headers.get("content-disposition") || "attachment; filename=Cover_Letter.pdf",
    },
  });
}
