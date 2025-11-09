import React from "react";

export default function SongCard({ song, onPlay }) {
  return (
    <div className="song-card">
      <img src={song.coverURL || "/default-cover.png"} alt={song.title} />
      <div className="song-info">
        <strong>{song.title}</strong>
        <span>{song.artist}</span>
      </div>
      <button onClick={onPlay}>▶</button>
    </div>
  );
}
