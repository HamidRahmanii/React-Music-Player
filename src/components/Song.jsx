import React from "react";
import { ColorExtractor } from "react-color-extractor";
import { MdLyrics } from "react-icons/md";

//Import Lyrics
import Lyrics from "./Lyrics";

const Song = ({
  currentSong,
  isPlaying,
  colors,
  setColors,
  lyricsStatus,
  setLyricsStatus,
}) => {
  return (
    <div className="song-container">
      <div className="image">
        <ColorExtractor getColors={(colors) => setColors(colors)}>
          <img
            className={`imassge ${isPlaying ? "play-image" : ""}`}
            alt={currentSong.name}
            src={currentSong.cover}
          />
        </ColorExtractor>
        <div
          className={`circle ${lyricsStatus ? "delete-circle" : ""}`}
          style={{
            backgroundColor: `${colors[0]}`,
          }}
        />
        <Lyrics lyricsStatus={lyricsStatus} currentSong={currentSong} />
      </div>
      <div className="song-info">
        <h1 className="song-name" style={{ color: `${colors[2]}` }}>
          {currentSong.name}
        </h1>
        <h3 className="song-artist" style={{ color: `${colors[5]}` }}>
          {currentSong.artist}
        </h3>
        <button onClick={() => setLyricsStatus(!lyricsStatus)}>
          <MdLyrics /> Lyrics
        </button>
      </div>
    </div>
  );
};

export default Song;
