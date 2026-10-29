import { useState } from "react";

const players = [
  {
    id: "p1",
    name: "Luna",
    role: "Frontend Engineer",
    score: 94,
    status: "Focused",
  },
  { id: "p2", name: "Marco", role: "Designer", score: 88, status: "Reviewing" },
  { id: "p3", name: "Ava", role: "QA Analyst", score: 91, status: "Testing" },
];

function App() {
  const [selectedId, setSelectedId] = useState("p1");

  const selectedPlayer =
    players.find((player) => player.id === selectedId) ?? players[0];

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Debugging demo</p>
        <h1>Team performance overview</h1>
      </header>

      <div className="layout">
        <PlayerList
          players={players}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <PlayerDetail player={selectedPlayer} />
      </div>
    </main>
  );
}

function PlayerList({ players, selectedId, onSelect }) {
  return (
    <aside className="panel">
      <h2>Team members</h2>
      <div className="player-list">
        {players.map((player) => {
          const isSelected = player.id === selectedId;

          return (
            <button
              key={player.id}
              type="button"
              className={`player-item ${isSelected ? "selected" : ""}`}
              onClick={() => onSelect(player.id)}
            >
              <span className="player-name">{player.name}</span>
              <span className="player-role">{player.role}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function PlayerDetail({ player }) {
  const summary = player.score >= 90 ? "Above target" : "Needs support";

  return (
    <section className="panel detail-panel">
      <p className="eyebrow">Selected profile</p>
      <h2>{player.name}</h2>
      <p className="role">{player.role}</p>

      <div className="stats-grid">
        <div>
          <span className="label">Score</span>
          <strong>{player.score}</strong>
        </div>
        <div>
          <span className="label">Status</span>
          <strong>{player.status}</strong>
        </div>
        <div>
          <span className="label">Summary</span>
          <strong>{summary}</strong>
        </div>
      </div>
    </section>
  );
}

export default App;
