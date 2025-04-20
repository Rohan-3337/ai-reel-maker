"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import EmptyState from './_components/EmptyState';
import { db } from '@/config/db';
import { VideoData } from '@/config/Schema';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import VideoList from './_components/VideoList';

const Dashboard = () => {
  const {user} = useUser();
  const [videos,setVideos] =useState([]);
  const router = useRouter();

  useEffect(()=>{
    user&&getVideoList();
  },[user])
  const getVideoList = async()=>{
    const result = await db.select().from(VideoData).where(eq(VideoData?.createdBy,user?.primaryEmailAddress?.emailAddress));
    console.log(result);
    setVideos(result);
  }

  return (
    <div>
      <div className=' flex justify-between items-center'>
        <h2  className=' font-bold text-xl'>Dashboard</h2>
        <Button onClick={()=>router.replace("/dashboard/create-new")} >+ Create new</Button>
      </div>
      {videos && videos.length ===0 && (
        <EmptyState/>
      )}
      <VideoList videoList={videos}/>
    </div>
  )
}

export default Dashboard