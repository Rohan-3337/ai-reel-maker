"use client";
import React, { useContext, useEffect, useState } from "react";
import { SelectTopic } from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import { SelectDuration } from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Loader from "./_components/Loader";
import { v4 as uuidv4 } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { db } from "@/config/db";
import { VideoData } from "@/config/Schema";
import { useUser } from "@clerk/nextjs";
import PlayerDialog from "../_components/PlayerDialog";

const CreateNew = () => {
  const [formdata, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId,setVideoId] = useState();
  const { videoData, setVideoData } = useContext(VideoDataContext);

  const { user } = useUser();
  useEffect(()=>{
      setVideoData({});
  },[])

  const onhandleChange = (fieldname, fieldvalue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldname]: fieldvalue,
    }));
  };

  const getVideoScript = async () => {
    if (!formdata.topic || !formdata.duration || !formdata.imageStyle) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);

    try {
      const prompt = `write a script to generate a ${formdata.duration} video on topic: interesting ${formdata.topic} story along with AI image prompt in ${formdata.imageStyle} format for each scene and return in JSON with fields: image_prompt and context.`;
      const result = await axios.post("/api/get-video-script", { prompt });

      const videoScript = result?.data?.result;
      setVideoData((prev) => ({ ...prev, videoScript }));

      const res =await Promise.all([getAudioFile(videoScript), generateImage(videoScript)]);
      setIsLoading(false);
      console.log(res);
    } catch (error) {
      console.error("Error generating video script:", error);
    } 
  };

  const getAudioFile = async (videoScript) => {
    try {
      const script = videoScript.scenes.map((s) => s.context).join(" ");
      const id = uuidv4();

      const result = await axios.post("/api/get-audio", { text: script, id });

      setVideoData((prev) => ({
        ...prev,
        audioFileUrl: result?.data?.url,
      }));

      generateAudiCaption(result?.data?.url);
    } catch (error) {
      console.error("Error generating audio:", error);
    }
  };

  const generateAudiCaption = async (fileUrl) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/generate-caption", {
        audioFileUrl: fileUrl,
      });

      setVideoData((prev) => ({
        ...prev,
        captions: response.data,
      }));
    } catch (error) {
      console.error("Error generating captions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateImage = async (videoScript) => {
    try {
      const imageList = [];
      const delayBetweenRequests = 0; // 10 seconds delay between requests (6 requests per minute)
  
      for (const scene of videoScript.scenes) {
        const response = await axios.post("/api/generate-image", {
          prompt: scene.image_prompt,
        });
        const image = response?.data?.result.replace(/\x00/g, "");
        console.log(image);
        imageList.push(image);
  
        // Introduce a delay to stay within the rate limit
        await new Promise((resolve) => setTimeout(resolve, delayBetweenRequests));
      }
  
      setVideoData((prev) => ({
        ...prev,
        imageList,
      }));
    } catch (error) {
      console.error("Error generating images:", error);
    }
  };

  useEffect(() => {
    if (
      videoData.videoScript &&
      videoData.audioFileUrl &&
      videoData.imageList &&
      videoData.captions
    ) {
     saveVideoData(videoData)
    }
    console.log(videoData)
  }, [videoData]);

  const saveVideoData = async (videoData) => {
    setIsLoading(true);
    try {
      const result = await db.insert(VideoData).values({
        script: videoData.videoScript,
        audioFileUrl: videoData.audioFileUrl,
        imageList: videoData.imageList,
        captions: videoData.captions,
        createdBy: user.primaryEmailAddress.emailAddress,
      });
      setVideoId(result[0]?.id);
      setPlayVideo(true);
      console.log("Saved:", result);
    } catch (error) {
      console.error("Error inserting video data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:px-20 p-5 shadow-md rounded-md mt-4">
      <h2 className="font-bold items-center">
        <SelectTopic onUserSelect={onhandleChange} />
        <SelectStyle onUserSelect={onhandleChange} />
        <SelectDuration onUserSelect={onhandleChange} />
      </h2>
      <Button className="mt-10 w-full" onClick={getVideoScript}>
        Create Short Video
      </Button>
      <PlayerDialog playVideo={playVideo} videoId={videoId}/>
      <Loader isLoading={isLoading} />
    </div>
  );
};

export default CreateNew;
