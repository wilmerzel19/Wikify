import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register(email, password, displayName);
      nav("/");
    } catch (error) {
      setErr(error.message);
    }
  }

  return (
    <div className="center">
      <h2>Registro</h2>
      {err && <div className="error">{err}</div>}
      <form onSubmit={handleSubmit} className="card">
        <input placeholder="Nombre" value={displayName} onChange={e=>setDisplayName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  );
}
