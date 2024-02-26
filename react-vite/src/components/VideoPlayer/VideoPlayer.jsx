import './VideoPlayer.css';

const VideoPlayer = ({ src }) => {
  // Function to request full-screen mode
  const goFullScreen = (event) => {
    const videoElement = event.target;
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      // Firefox
      videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) {
      // IE/Edge
      videoElement.msRequestFullscreen();
    }
  };

  return (
    <video
      className="video-player"
      controls
      onClick={goFullScreen}
      onEnded={() => {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
