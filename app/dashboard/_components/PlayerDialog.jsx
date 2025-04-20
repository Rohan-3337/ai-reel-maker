import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { db } from "@/config/db";
import { VideoData } from "@/config/Schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { VideoDataContext } from "@/app/_context/VideoDataContext";

const PlayerDialog = ({ playVideo, videoId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { videoData, setVideoData } = useContext(VideoDataContext);
  const [durationInFrames, setDurationInFrames] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle dialog state based on playVideo prop changes
  useEffect(() => {
    setOpenDialog(playVideo);
  }, [playVideo]);

  // Fetch video data when videoId changes
  useEffect(() => {
    if (videoId && openDialog) {
      getVideoData();
    }
  }, [videoId, openDialog]);

  const getVideoData = async () => {
    try {
      const result = await db.select().from(VideoData).where(eq(VideoData.id, videoId));
      if (result && result.length > 0) {
        setVideoData(result[0]);
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  const handleDownload = async () => {
    if (!videoData) {
      alert("No video data available!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/render-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(videoData),
      });

      if (!response.ok) {
        throw new Error(`Failed to render video: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${videoData.title || "video"}.mp4`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert(error.message || "Failed to render video!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.replace("/dashboard");
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="bg-white flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="font-bold text-3xl my-5">
            {videoData?.title || "Preview Your Video"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="my-4 w-full flex justify-center">
          {videoData ? (
            <Player
              component={RemotionVideo}
              durationInFrames={Math.round(durationInFrames)}
              compositionWidth={300}
              compositionHeight={450}
              fps={30}
              controls={true}
              inputProps={{
                ...videoData,
                setDurationInFrames: (frameValue) => setDurationInFrames(frameValue),
              }}
            />
          ) : (
            <div className="p-10 text-center">Loading video data...</div>
          )}
        </div>

        <div className="flex justify-between w-full gap-10 mt-4">
          <Button variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleDownload} 
            disabled={isLoading || !videoData}
          >
            {isLoading ? "Processing..." : "Export"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDialog;