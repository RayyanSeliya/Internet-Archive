import React, { useState } from "react";

type Track = {
  title: string;
  creator: string;
  date: string;
  audio_url: string;
};

const App: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    setResults([]);
    try {
      const res = await fetch(`/api/ia/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      alert("Error fetching results.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
        color: "#fff",
        fontFamily: "Inter, Arial, sans-serif",
        padding: "40px 0",
      }}
    >
      <div
        style={{
          maxWidth: 600,
          margin: "40px auto",
          background: "rgba(34, 34, 34, 0.97)",
          borderRadius: 18,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
          padding: "32px 32px 24px 32px",
          border: "1px solid #222",
        }}
      >
        <h2 style={{ marginBottom: 28, fontWeight: 700, letterSpacing: 1 }}>Internet Archive Audio Search</h2>
        <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for a song (e.g. Peggy O)"
            style={{
              flex: 1,
              padding: "12px 16px",
              fontSize: 17,
              background: "#292929",
              color: "#fff",
              border: "1.5px solid #444",
              borderRadius: 8,
              outline: "none",
              transition: "border 0.2s",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
            onKeyDown={e => {
              if (e.key === "Enter") search();
            }}
          />
          <button
            onClick={search}
            style={{
              padding: "12px 24px",
              fontSize: 17,
              background: "linear-gradient(90deg, #6a82fb 0%, #fc5c7d 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              transition: "background 0.2s",
            }}
          >
            Search
          </button>
        </div>
       {loading && (
  <div style={{ marginBottom: 18, textAlign: "center" }}>
    <div style={{
      display: "inline-block",
      width: 32,
      height: 32,
      border: "4px solid #6a82fb",
      borderTop: "4px solid transparent",
      borderRadius: "50%",
      animation: "spin 1s linear infinite"
    }} />
    <style>
      {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
    </style>
  </div>
)}


        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {results.map((track, idx) => (
            <li
              key={idx}
              style={{
                margin: "0 0 32px 0",
                background: "#232526",
                borderRadius: 14,
                boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
                padding: "24px 18px 18px 18px",
                border: "1px solid #313131",
              }}
            >
              <div style={{ marginBottom: 10 }}>
                <span style={{ fontWeight: 600, fontSize: 18 }}>
                  {track.title || track.audio_url.split("/").pop()}
                </span>
                <div style={{ color: "#bbb", fontSize: 14, marginTop: 2 }}>
                  {track.creator} {track.date && `(${track.date})`}
                </div>
              </div>
              <audio
                src={track.audio_url}
                controls
                style={{
                  width: "100%",
                  margin: "8px 0 10px 0",
                  borderRadius: 6,
                  background: "#191919",
                }}
              />
              <div>
                <a
                  href={track.audio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#6a82fb",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: 15,
                    border: "1px solid #6a82fb",
                    padding: "5px 16px",
                    borderRadius: 6,
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseOver={e => {
                    (e.target as HTMLAnchorElement).style.background = "#6a82fb";
                    (e.target as HTMLAnchorElement).style.color = "#fff";
                  }}
                  onMouseOut={e => {
                    (e.target as HTMLAnchorElement).style.background = "transparent";
                    (e.target as HTMLAnchorElement).style.color = "#6a82fb";
                  }}
                >
                  Open in Archive
                </a>
              </div>
            </li>
          ))}
        </ul>
        {!loading && results.length === 0 && (
          <div style={{ color: "#aaa", marginTop: 20, textAlign: "center" }}>No results found.</div>
        )}
      </div>
    </div>
  );
};

export default App;
