import React, { useState, useRef } from "react";

//Import Styles
import "./styles/App.scss";

//Import Components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";

//Import data
import data from "./data";

function App() {
  //Refference
  const audioRef = useRef(null);

  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [colors, setColors] = useState([]);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [lyricsStatus, setLyricsStatus] = useState(false);

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );
    setSongInfo({
      ...songInfo,
      currentTime: currentTime,
      duration: duration,
      animationPercentage: animationPercentage,
    });
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((state) => state.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
    // playAudio(isPlaying, audioRef);
  };

  return (
    <div
      className={`app ${libraryStatus ? "library-active" : ""}`}
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]})`,
      }}
    >
      <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
        colors={colors}
      />
      <Song
        isPlaying={isPlaying}
        songs={songs}
        currentSong={currentSong}
        colors={colors}
        setColors={setColors}
        lyricsStatus={lyricsStatus}
        setLyricsStatus={setLyricsStatus}
      />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        colors={colors}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
