import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl, duration, progress, ref, start, subtitle, pause, seek, play, pausingVideo }) => {
  return (
    <React.Fragment>
      <ReactPlayer
        ref={ref}
        url={videoUrl}
        className="react-player"
        controls
        width="100%"
        height="100%"
        onDuration={duration}
        onProgress={progress}
        onStart={start}
        onPlay={play}
        onPause={pause}
        onSeek={seek}
        playing={pausingVideo}
        config={
          subtitle
            ? {
                file: {
                  attributes: {
                    crossOrigin: 'true'
                  },
                  tracks: subtitle
                }
              }
            : {
                file: {
                  attributes: {
                    crossOrigin: 'true'
                  }
                }
              }
        }
      />
    </React.Fragment>
  );
};

export default VideoPlayer;
