import React from "react";
import { usePlayer } from "../contexts/PlayerContext";

export default function Player() {
  const { playlist, index, playing, toggle, progress, seek, handleNext, handlePrev } = usePlayer();
  const current = playlist[index];

  const duration = current ? (current.duration || 0) : 0;

  return (
    <div className="player">
      {current ? (
        <>
          <img src={current.coverURL || "/default-cover.png"} alt="" />
          <div className="meta">
            <div><strong>{current.title}</strong></div>
            <div>{current.artist}</div>
            <input
              type="range"
              min="0"
              max={duration}
              value={progress}
              onChange={e => seek(Number(e.target.value))}
            />
            <div className="controls">
              <button onClick={handlePrev}>⏮</button>
              <button onClick={toggle}>{playing ? "⏸" : "▶"}</button>
              <button onClick={handleNext}>⏭</button>
            </div>
          </div>
        </>
      ) : (
        <div className="meta">Selecciona una canción para reproducir</div>
      )}
    </div>
  );
}
