import RemotionVideo from '@/app/dashboard/_components/RemotionVideo';
import React from 'react'
import {Composition} from 'remotion';
const Root = () => {
  return (
    <>
      <Composition
        id="MyVideo"
        // Import the component and add the properties you had in the `<Player>` before
        component={RemotionVideo}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  )
}

export default Root