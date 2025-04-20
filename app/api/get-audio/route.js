import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const { text, id } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Generate audio file using gTTS
    const filePath = path.join(process.cwd(), "public", `${id}.mp3`);
    const gtts = (await import("gtts")).default;
    const tts = new gtts(text, "en");

    await new Promise((resolve, reject) => {
      tts.save(filePath, (err) => (err ? reject(err) : resolve()));
    });

    // Read the generated file
    const fileBuffer = await fs.readFile(filePath);

    // Initialize UploadThing API
    const utapi = new UTApi({ apiKey: process.env.UPLOADTHING_TOKEN });
    const response = await utapi.uploadFiles([
      new File([fileBuffer], `${id}.mp3`, { type: "audio/mpeg" }),
    ]);

    // Log response for debugging
    console.log("UploadThing Response:", response);

    // Delete local file after upload
    await fs.unlink(filePath);

    // ✅ Use `ufsUrl` instead of the deprecated `url`
    const uploadedUrl = response?.[0]?.data?.ufsUrl;
    if (!uploadedUrl) {
      throw new Error("Failed to get uploaded file URL");
    }

    return NextResponse.json({ url: uploadedUrl });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
