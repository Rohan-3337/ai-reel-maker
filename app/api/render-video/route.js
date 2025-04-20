// pages/api/render-video.ts
import { renderMedia } from "@remotion/renderer";
import RemotionVideo from "@/app/dashboard/_components/RemotionVideo";

export default async function handler(
  req,
  res
) {
  try {
    const outputPath = "out/video.mp4"; // Temporary output path

    await renderMedia({
      composition: {
        id: "MyVideo",
        width: 1920,
        height: 1080,
        fps: 30,
        durationInFrames: 60,
      },
      serveUrl: process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000",
      codec: "h264",
      outputLocation: outputPath,
      // Pass your React component
      component: RemotionVideo,
    });

    // Return the video file for download
    res.download(outputPath, "video.mp4", (err) => {
      if (err) {
        console.error("Download failed:", err);
        res.status(500).send("Error downloading video");
      }
    });
  } catch (error) {
    console.error("Rendering failed:", error);
    res.status(500).json({ error: "Failed to render video" });
  }
}