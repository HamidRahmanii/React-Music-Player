import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { playAudio } from "../util";

const Player = ({
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  setCurrentSong,
  songs,
  setSongs,
}) => {
  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };
  //Event Handler
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...setSongInfo, currentTime: e.target.value });
  };
  const skipBackHandler = async () => {
    let currentIndex = songs.findIndex((state) => state.id === currentSong.id);
    const newCurrentIndex =
      currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    await setCurrentSong(songs[newCurrentIndex]);
    activeLibraryHandler(songs[newCurrentIndex]);
    // playAudio(isPlaying, audioRef);
    if (isPlaying) audioRef.current.play();
  };
  const skipForwardHandler = async () => {
    let currentIndex = songs.findIndex((state) => state.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    // playAudio(isPlaying, audioRef);
    if (isPlaying) audioRef.current.play();
  };

  //Add Styles
  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="Player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div className="track">
          <input
            style={{
              background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
            }}
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          ></input>
          <div style={trackAnimation} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={skipBackHandler}
          className="skip-back"
          icon={faAngleLeft}
          size="3x"
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={!isPlaying ? faPlay : faPause}
          size="3x"
        />
        <FontAwesomeIcon
          onClick={skipForwardHandler}
          className="skip-forward"
          icon={faAngleRight}
          size="3x"
        />
      </div>
    </div>
  );
};

export default Player;
