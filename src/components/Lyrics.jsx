import React from "react";

import "../styles/_lyrics.scss";

const Lyrics = ({ currentSong, lyricsStatus }) => {
  return (
    <div className={`lyrics ${lyricsStatus ? "active-lyrics" : ""}`}>
      <p className="exact-lyrics">{currentSong.lyrics}</p>
    </div>
  );
};

export default Lyrics;
