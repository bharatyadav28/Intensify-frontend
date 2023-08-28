import ReactPlayer from "react-player";

const VideoPlayer = ({ url }) => {
  return (
    <div className="w-100">
      <ReactPlayer url={url} controls loop width="100%" height="100%" />{" "}
    </div>
  );
};

export default VideoPlayer;
