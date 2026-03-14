function ProgramList({ program, onSelect }) {
  if (!program) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>My Program</h1>
        </div>
        <div className="program-empty">
          <p>No program assigned. Please contact the registrar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <p className="list-sub">Enrolled program</p>
        <h1>My Program</h1>
      </div>

      <div
        className="program-card program-card--featured"
        onClick={() => onSelect(program)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onSelect(program)}
      >
        <div className="program-card-accent" />
        <div className="program-card-body">
          <div className="program-card-badge">{program.code.toUpperCase()}</div>
          <h2 className="program-card-title">{program.name}</h2>
          <div className="program-card-meta">
            <span className="program-card-meta-item">
              <span className="program-card-meta-label">Duration</span>
              {program.duration}
            </span>
            <span className="program-card-meta-item">
              <span className="program-card-meta-label">Total units</span>
              {program.totalUnits}
            </span>
            <span className="program-card-meta-item">
              <span className="program-card-meta-label">Status</span>
              <span className={`program-card-status program-card-status--${program.status}`}>
                {program.status}
              </span>
            </span>
          </div>
          {program.college && (
            <p className="program-card-college">{program.college}</p>
          )}
          <p className="program-card-hint">Click to view full program details</p>
        </div>
      </div>
    </div>
  );
}

export default ProgramList;