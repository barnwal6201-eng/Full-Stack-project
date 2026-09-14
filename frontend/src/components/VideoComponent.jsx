import React from 'react'
import Video from '../assets//MovieBannerVideo.mp4'
import { bannerStyles } from '../assets/dummyStyles'

const VideoComponent = () => {
  return (
    <div className={bannerStyles.videoContainer}>
        <video autoPlay loop muted playsInline className={bannerStyles.video}>
            <source src={Video} type='video/mp4' />
            {/*fallback text */}
            Your browser does not support the video tag.
        </video>
        <div className={bannerStyles.overlay}></div>
      </div>
  )
}

export default VideoComponent
