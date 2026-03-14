function ProgramDetail({ program, onBack, onViewSubjects }) {
  if (!program) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Program Details</h1>
        </div>
        <div className="data-state error">
          No program selected.
        </div>
        {onBack && (
          <button
            type="button"
            className="portal-btn primary"
            onClick={onBack}
          >
            Back to My Program
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header page-header--program-detail">
        <div>
          <p className="list-sub">My Program</p>
          <h1>{program.code.toUpperCase()} — {program.name}</h1>
        </div>
        <div className="page-actions">
          {onBack && (
            <button
              type="button"
              className="portal-btn portal-btn--outline"
              onClick={onBack}
            >
              Back to My Program
            </button>
          )}
          {onViewSubjects && (
            <button
              type="button"
              className="portal-btn primary"
              onClick={onViewSubjects}
            >
              View Program Subjects
            </button>
          )}
        </div>
      </div>

      <div className="program-detail">
        <div className="program-detail-hero">
          <div className="program-detail-hero-inner">
            <span className="program-detail-badge">{program.code.toUpperCase()}</span>
            <h2 className="program-detail-hero-title">{program.name}</h2>
            <span className={`program-detail-status program-detail-status--${program.status}`}>
              {program.status === "active" ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <div className="program-detail-grid">
          <div className="program-detail-card">
            <h3 className="program-detail-card-title">Overview</h3>
            <dl className="program-detail-dl">
              <div className="program-detail-dl-row">
                <dt>Duration</dt>
                <dd>{program.duration}</dd>
              </div>
              <div className="program-detail-dl-row">
                <dt>Degree type</dt>
                <dd>{program.type || "Bachelor's"}</dd>
              </div>
              <div className="program-detail-dl-row">
                <dt>Total units</dt>
                <dd>{program.totalUnits}</dd>
              </div>
            </dl>
          </div>
          {program.college && (
            <div className="program-detail-card">
              <h3 className="program-detail-card-title">College</h3>
              <p className="program-detail-card-text">{program.college}</p>
            </div>
          )}
          {program.chair && (
            <div className="program-detail-card">
              <h3 className="program-detail-card-title">Program Chair</h3>
              <p className="program-detail-card-text">{program.chair}</p>
            </div>
          )}
        </div>

        {program.description && (
          <div className="program-detail-card program-detail-card--wide">
            <h3 className="program-detail-card-title">Program Description</h3>
            <p className="program-detail-desc">{program.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProgramDetail;

