import { useEffect, useState } from "react";
import TermBadge from "./TermBadge";

const PROGRAM_LABELS = {
  bsit: "BSIT",
  bscs: "BSCS",
  bsed: "BSED",
  bsba: "BSBA",
  bsee: "BSEE",
  bshm: "BSHM",
};

function SubjectList({
  subjects,
  programs = [],
  initialProgramCode = "",
  studentProgramCode = null,
  title = "Subject Offerings",
  onSelectSubject = null,
}) {
  const [selectedProgram, setSelectedProgram] = useState(initialProgramCode || studentProgramCode || "");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [withPrereq, setWithPrereq] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    if (initialProgramCode || studentProgramCode) {
      setSelectedProgram(initialProgramCode || studentProgramCode);
    }
  }, [initialProgramCode, studentProgramCode]);

  const filtered = subjects
    .filter(s => selectedProgram ? s.programCode === selectedProgram : true)
    .filter(s => selectedTerm ? s.termType === selectedTerm : true)
    .filter(s => selectedYear ? s.yearLevel === Number(selectedYear) : true)
    .filter(s => withPrereq ? s.prerequisites.length > 0 : true);

  const programOptions = programs.length
    ? programs
    : Object.entries(PROGRAM_LABELS).map(([code, name]) => ({ code, name: name }));

  const showSubjects = !!selectedProgram;
  const isMySubjectsOnly = studentProgramCode != null && studentProgramCode !== "";

  return (
    <>
      <h1>{title}</h1>

      {isMySubjectsOnly && (
        <p className="list-sub" style={{ marginBottom: 12 }}>
          Showing subjects for your program: {PROGRAM_LABELS[studentProgramCode] ?? studentProgramCode?.toUpperCase()}
        </p>
      )}

      <div className="filters">
        {!isMySubjectsOnly && (
          <select
            value={selectedProgram}
            onChange={e => setSelectedProgram(e.target.value)}
          >
            <option value="">Select a program…</option>
            {programOptions.map((p) => (
              <option key={p.code} value={p.code}>
                {PROGRAM_LABELS[p.code] ?? p.code?.toUpperCase() ?? p.name}
              </option>
            ))}
          </select>
        )}

        {showSubjects && (
          <>
            <select value={selectedTerm} onChange={e => setSelectedTerm(e.target.value)}>
              <option value="">All Terms</option>
              <option value="semester">Semester</option>
              <option value="term">Term</option>
              <option value="both">Both</option>
            </select>

            <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
              <option value="">All Year Levels</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>

            <label>
              <input
                type="checkbox"
                checked={withPrereq}
                onChange={e => setWithPrereq(e.target.checked)}
              />
              With Pre-requisites
            </label>
          </>
        )}
      </div>

      {!showSubjects ? (
        <p className="subject-placeholder">Select a program above to view its subjects.</p>
      ) : (
        <div className="grid">
          {filtered.map(subject => (
            <div
              key={subject.code}
              className="card clickable"
              onClick={() => {
                if (onSelectSubject) {
                  onSelectSubject(subject);
                }
              }}
              role="button"
            >
              <h3>{subject.code}</h3>
              <p>{subject.title}</p>
              <p>{subject.units} Units</p>

              <TermBadge type={subject.termType} />

              <p>
                Pre-req:
                {subject.prerequisites.length > 0
                  ? subject.prerequisites.join(", ")
                  : " None"}
              </p>
              {subject.yearLevel && (
                <p>
                  Year Level: {subject.yearLevel}
                  {" "}
                  {subject.yearLevel === 1 ? "Year" : "Years"}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SubjectList;