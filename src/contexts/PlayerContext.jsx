import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const PlayerContext = createContext();
export function usePlayer() { return useContext(PlayerContext); }

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [playlist, setPlaylist] = useState([]); // array de canciones
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    const onTime = () => setProgress(audio.currentTime);
    const onEnd = () => handleNext();
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, [playlist, index]);

  useEffect(() => {
    const audio = audioRef.current;
    if (playlist.length > 0 && playlist[index]) {
      audio.src = playlist[index].audioURL;
      audio.load();
      if (playing) audio.play();
    }
  }, [index, playlist]);

  const play = (list, idx = 0) => {
    setPlaylist(list);
    setIndex(idx);
    setPlaying(true);
    setTimeout(() => audioRef.current.play(), 100); // asegurar carga
  };

  const toggle = async () => {
    const audio = audioRef.current;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      await audio.play();
      setPlaying(true);
    }
  };

  const seek = (time) => {
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  const handleNext = () => {
    if (index < playlist.length - 1) setIndex(index + 1);
    else { setPlaying(false); audioRef.current.pause(); }
  };

  const handlePrev = () => {
    if (audioRef.current.currentTime > 3) {
      seek(0);
    } else if (index > 0) {
      setIndex(index - 1);
      setPlaying(true);
    } else {
      seek(0);
    }
  };

  return (
    <PlayerContext.Provider value={{
      audioRef, playlist, index, playing, progress,
      play, toggle, seek, handleNext, handlePrev, setPlaylist
    }}>
      {children}
    </PlayerContext.Provider>
  );
}
