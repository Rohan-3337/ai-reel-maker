import React, { useState } from 'react'
import {Thumbnail} from '@remotion/player';
import RemotionVideo from './RemotionVideo';
import PlayerDialog from './PlayerDialog';
const VideoList = ({videoList}) => {
  const [playdialog,setPlaydialog] =useState(false);
  const [videoId, setVideoId] = useState();
  return (
    <div className=' mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
        {videoList?.map((video,index) =>(
            <div className=' cursor-pointer transition-all hover:scale-105' onClick={()=>{setPlaydialog(Date.now()); setVideoId(video.id)}}>
                <Thumbnail
                component={RemotionVideo}
                compositionWidth={300}
                compositionHeight={450}
                frameToDisplay={30}
                durationInFrames={120}
                fps={30}
                style={{
                  borderRadius:15
                }}
                inputProps={{
                  ...video,
                  setDurationInFrames:(v)=>console.log(v),
                }}
                />
            </div>
        ))}
        <PlayerDialog playVideo={playdialog} videoId={videoId}/>
    </div>
  )
}

export default VideoList