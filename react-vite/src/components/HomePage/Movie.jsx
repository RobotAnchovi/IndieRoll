// In your component where you want to display the video
import React from 'react';
import VideoPlayer from '../VideoPlayer';

const SomeComponent = () => {
  const videoSrc = "https://path-to-your-aws-video/video.mp4"; // Replace with your video source

  return (
    <div>
      <VideoPlayer src={videoSrc} />
    </div>
  );
};

export default SomeComponent;
