import { useMemo, useState } from "react";

const seedAnnouncements = [
  {
    id: "a1",
    title: "Data Privacy Policy",
    category: "All Students",
    date: "2026-03-13",
    body: "Please read and acknowledge the university Data Privacy Policy.",
  },
  {
    id: "a2",
    title: "Online Classroom Learning Environment Survey",
    category: "All Students",
    date: "2026-03-13",
    body: "Answer the online learning survey to help improve services.",
  },
  {
    id: "a3",
    title: "Enrollment Reminder",
    category: "Registrar",
    date: "2026-03-15",
    body: "Final day of enrollment is approaching. Please finalize your subjects.",
  },
];

function Announcements() {
  const [query, setQuery] = useState("");
  const [onlyUnread, setOnlyUnread] = useState(false);
  const [readIds, setReadIds] = useState(() => new Set());

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return seedAnnouncements
      .filter((a) =>
        q
          ? `${a.title} ${a.category} ${a.body}`.toLowerCase().includes(q)
          : true,
      )
      .filter((a) => (onlyUnread ? !readIds.has(a.id) : true))
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [query, onlyUnread, readIds]);

  const toggleRead = (id) => {
    setReadIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Announcements</h1>
        <div className="page-actions">
          <input
            className="page-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search announcements…"
          />
          <label className="page-checkbox">
            <input
              type="checkbox"
              checked={onlyUnread}
              onChange={(e) => setOnlyUnread(e.target.checked)}
            />
            Unread only
          </label>
        </div>
      </div>

      <div className="list">
        {items.map((a) => {
          const isRead = readIds.has(a.id);
          return (
            <div key={a.id} className={`list-item ${isRead ? "muted" : ""}`}>
              <div className="list-item-top">
                <div>
                  <div className="pill">{a.category}</div>
                  <div className="list-title">{a.title}</div>
                  <div className="list-sub">{a.date}</div>
                </div>
                <button
                  type="button"
                  className="portal-btn"
                  onClick={() => toggleRead(a.id)}
                >
                  {isRead ? "Mark unread" : "Mark read"}
                </button>
              </div>
              <p className="list-body">{a.body}</p>
            </div>
          );
        })}

        {items.length === 0 && (
          <div className="data-state loading">No announcements found.</div>
        )}
      </div>
    </div>
  );
}

export default Announcements;

