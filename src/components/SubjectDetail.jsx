import TermBadge from "./TermBadge";

function yearLabel(yearLevel) {
  if (!yearLevel) return "N/A";
  if (yearLevel === 1) return "1st Year";
  if (yearLevel === 2) return "2nd Year";
  if (yearLevel === 3) return "3rd Year";
  return "4th Year";
}

function SubjectDetail({ subject, onBack }) {
  if (!subject) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Subject Details</h1>
        </div>
        <div className="data-state error">
          No subject selected.
        </div>
        {onBack && (
          <button
            type="button"
            className="portal-btn primary"
            onClick={onBack}
          >
            Back to My Subjects
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="list-sub">My Subjects</p>
          <h1>{subject.code} — {subject.title}</h1>
        </div>
        {onBack && (
          <div className="page-actions">
            <button
              type="button"
              className="portal-btn primary"
              onClick={onBack}
            >
              Back to My Subjects
            </button>
          </div>
        )}
      </div>

      <div className="subject-detail-page">
        <div className="card">
          <div className="subject-detail-header">
            <div>
              <h2>{subject.title}</h2>
              <p className="list-sub">{subject.code}</p>
            </div>
            <TermBadge type={subject.termType} />
          </div>

          <div className="subject-detail-grid">
            <div>
              <h4>Year Level</h4>
              <p>{yearLabel(subject.yearLevel)}</p>
            </div>
            <div>
              <h4>Units</h4>
              <p>{subject.units}</p>
            </div>
            <div>
              <h4>Enrolled Students</h4>
              <p>{subject.enrolledCount ?? "N/A"}</p>
            </div>
            <div>
              <h4>Pre‑requisites</h4>
              <p>
                {subject.prerequisites?.length
                  ? subject.prerequisites.join(", ")
                  : "None"}
              </p>
            </div>
          </div>

          {subject.description && (
            <div className="subject-detail-section">
              <h4>Subject Description</h4>
              <p>{subject.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubjectDetail;

