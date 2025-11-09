import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { usePlayer } from "../contexts/PlayerContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import SongCard from "../components/SongCard";
import Player from "../components/Player";

export default function Home() {
  const { currentUser, logout } = useAuth();
  const { play } = usePlayer();
  const [songs, setSongs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    async function fetchSongs() {
      const col = collection(db, "songs");
      const snap = await getDocs(col);
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setSongs(data);
      setFiltered(data);
    }
    fetchSongs();
  }, []);

  useEffect(() => {
    if (!q) setFiltered(songs);
    else setFiltered(songs.filter(s => (s.title + s.artist).toLowerCase().includes(q.toLowerCase())));
  }, [q, songs]);

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>🎶Wikify</h1>
          <p className="nombre">Hola, {currentUser?.displayName || currentUser?.email}</p>
        </div>
        <div>
          <input placeholder="Buscar..." value={q} onChange={e=>setQ(e.target.value)} />
          <button onClick={logout}>Salir</button>
        </div>
      </header>

      <main className="grid">
        {filtered.map((song, idx) => (
          <SongCard key={song.id} song={song} onPlay={() => play(filtered, idx)} />
        ))}
      </main>

      <Player />
    </div>
  );
}
