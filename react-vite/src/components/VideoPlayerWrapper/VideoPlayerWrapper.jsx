import { useLocation } from "react-router-dom";
import VideoPlayer from "../VideoPlayer/VideoPlayer";


const VideoPlayerWrapper = () => {
  const location = useLocation();
  console.log("🚀 ~ VideoPlayerWrapper ~ location:", location)
  const src = location.state?.src; // Extract the video URL from state


  return <VideoPlayer src={src} />;
};

export default VideoPlayerWrapper;
