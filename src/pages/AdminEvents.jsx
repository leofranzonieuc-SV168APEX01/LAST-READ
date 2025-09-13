"use client";
import { useState } from "react";
import "./AdminEvents.css";

export default function AdminEvents() {
  const [events, setEvents] = useState([
    {
      discipline: "Off-road",
      lieu: "Salagou",
      date: "2025-10-01",
      distance: "20 km",
      niveau: "Intermédiaire",
      remarque: "Prévoir protections",
      photo: "/salagou.jpg",
    },
    {
      discipline: "Piste",
      lieu: "Circuit Occitanie",
      date: "2025-11-15",
      distance: "5 km",
      niveau: "Débutant",
      remarque: "Session encadrée",
      photo: "/piste.jpg",
    },
  ]);

  const [form, setForm] = useState({
    discipline: "",
    lieu: "",
    date: "",
    distance: "",
    niveau: "",
    remarque: "",
    photo: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, form]);
    setForm({
      discipline: "",
      lieu: "",
      date: "",
      distance: "",
      niveau: "",
      remarque: "",
      photo: "",
    });
  };

  return (
    <div className="admin-container">
      <h1>Backoffice - Gestion des événements</h1>

      <form onSubmit={handleSubmit} className="event-form">
        <input
          type="text"
          placeholder="Discipline"
          value={form.discipline}
          onChange={(e) => setForm({ ...form, discipline: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Lieu"
          value={form.lieu}
          onChange={(e) => setForm({ ...form, lieu: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Distance"
          value={form.distance}
          onChange={(e) => setForm({ ...form, distance: e.target.value })}
        />
        <input
          type="text"
          placeholder="Niveau"
          value={form.niveau}
          onChange={(e) => setForm({ ...form, niveau: e.target.value })}
        />
        <input
          type="text"
          placeholder="Remarque"
          value={form.remarque}
          onChange={(e) => setForm({ ...form, remarque: e.target.value })}
        />
        <input
          type="text"
          placeholder="Photo (URL)"
          value={form.photo}
          onChange={(e) => setForm({ ...form, photo: e.target.value })}
        />
        <button type="submit" className="btn-red">Ajouter</button>
      </form>

      <div className="event-list">
        {events.map((ev, i) => (
          <div key={i} className="event-card">
            <img src={ev.photo} alt={ev.discipline} />
            <h3>{ev.discipline}</h3>
            <p><strong>Lieu:</strong> {ev.lieu}</p>
            <p><strong>Date:</strong> {ev.date}</p>
            <p><strong>Distance:</strong> {ev.distance}</p>
            <p><strong>Niveau:</strong> {ev.niveau}</p>
            <p>{ev.remarque}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
