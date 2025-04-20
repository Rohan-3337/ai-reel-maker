import React, { useEffect } from 'react'
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion'

const RemotionVideo = ({script,imageList,audioFileUrl,captions,setDurationInFrames}) => {
  useEffect(()=>{
    console.log(script,imageList,audioFileUrl,captions,setDurationInFrames);
  },[script,imageList,audioFileUrl,captions,setDurationInFrames])
  const {fps} =useVideoConfig();
  const frame = useCurrentFrame();
  const getdurattionframe = ()=>{
    setDurationInFrames(captions?.result[captions?.result.length - 1]?.end / 1000 * fps);
    console.log(captions.result[captions.result.length - 1]?.end / 1000 * fps);
    return captions?.result[captions?.result.length - 1]?.end / 1000 * fps;
  }
  const getCurrentCaptions  = ()=>{
    const currentTime = frame/30*1000;
    const current = captions?.result.find((item)=>currentTime>= item.start && currentTime<=item.end);
    return current?.text;
  }
  return (
    <AbsoluteFill style={{backgroundColor:"black"}}> 
      {imageList?.map((item,index)=>{
        const startTime = ((index*getdurattionframe())/imageList?.length);
        const duration = getdurattionframe();
        const scale =(index)=> interpolate(
          frame,
          [startTime, startTime+duration/2,startTime+duration],
          index%2 ==0 ?[ 1,1.8,1] :[1.8,1,1.8],
          {
            extrapolate: 'clamp',
            extrapolateRight:"clamp",
           }
        )
        return(
        <>
        <Sequence key={index} from={startTime} durationInFrames={getdurattionframe()}>
          <Img
          src={item}
          style={{
            width: '100%',
            height: '100%',
            objectFit:"cover",
            transform:`scale(${scale(index)})`
          }}/>
          <AbsoluteFill style={{
            color:"white",
            justifyContent:"center",
            top:undefined,
            bottom:50,
            height:150,
            width:"100%",
            textAlign:"center",
          }}>
            <h2 className=' text-2xl'>{getCurrentCaptions()}</h2>
          </AbsoluteFill>
        </Sequence>
        </>
      )})}
      {audioFileUrl && <Audio src={audioFileUrl} />}
    </AbsoluteFill>
  )
}

export default RemotionVideo