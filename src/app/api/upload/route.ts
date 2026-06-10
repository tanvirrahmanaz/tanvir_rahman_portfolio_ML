import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guard";

/**
 * Proxies an image upload to imgbb so the API key stays on the server.
 * Accepts multipart form-data with a single `image` file.
 */
export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const key = process.env.IMGBB_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "IMGBB_API_KEY is not set. Add it in your environment, or paste an image URL instead." },
      { status: 400 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("image");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No image file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const body = new URLSearchParams({ image: buffer.toString("base64") });

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body,
  });
  const json = await res.json();
  if (!json.success) {
    return NextResponse.json({ error: "imgbb upload failed" }, { status: 502 });
  }
  return NextResponse.json({ url: json.data.url as string });
}
