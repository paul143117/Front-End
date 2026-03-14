import { useMemo, useState } from "react";

const seedLinks = [
  {
    id: "d1",
    name: "IEEE Xplore (Demo)",
    description: "Engineering and computing research papers.",
    url: "https://ieeexplore.ieee.org/",
    tag: "Research",
  },
  {
    id: "d2",
    name: "Google Scholar",
    description: "Search scholarly literature across disciplines.",
    url: "https://scholar.google.com/",
    tag: "Search",
  },
  {
    id: "d3",
    name: "ACM Digital Library (Demo)",
    description: "Computing publications and resources.",
    url: "https://dl.acm.org/",
    tag: "Library",
  },
];

function OnlineDatabases() {
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return seedLinks.filter((l) =>
      q
        ? `${l.name} ${l.description} ${l.tag}`.toLowerCase().includes(q)
        : true,
    );
  }, [query]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Online Databases</h1>
        <div className="page-actions">
          <input
            className="page-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search databases…"
          />
        </div>
      </div>

      <div className="list">
        {items.map((l) => (
          <div key={l.id} className="list-item">
            <div className="list-item-top">
              <div>
                <div className="pill">{l.tag}</div>
                <div className="list-title">{l.name}</div>
                <div className="list-sub">{l.description}</div>
              </div>
              <a className="portal-btn link-btn" href={l.url} target="_blank" rel="noreferrer">
                Open
              </a>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="data-state loading">No databases found.</div>
        )}
      </div>
    </div>
  );
}

export default OnlineDatabases;

