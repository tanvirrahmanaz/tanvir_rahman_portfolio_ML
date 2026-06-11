import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guard";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF files are supported for resumes" }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Resume PDF must be 2 MB or smaller" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const url = `data:${file.type};base64,${buffer.toString("base64")}`;

  return NextResponse.json({
    url,
    name: file.name,
  });
}
