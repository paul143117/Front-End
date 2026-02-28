import { useState } from "react";
import TermBadge from "./TermBadge";

function SubjectList({ subjects }) {
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [withPrereq, setWithPrereq] = useState(false);

  const filtered = subjects
    .filter(s => selectedProgram ? s.programCode === selectedProgram : true)
    .filter(s => selectedTerm ? s.termType === selectedTerm : true)
    .filter(s => withPrereq ? s.prerequisites.length > 0 : true);

  return (
    <>
      <h1>Subject Offerings</h1>

      <div className="filters">
        <select onChange={e => setSelectedProgram(e.target.value)}>
          <option value="">All Programs</option>
          <option value="bsit">BSIT</option>
          <option value="bscs">BSCS</option>
        </select>

        <select onChange={e => setSelectedTerm(e.target.value)}>
          <option value="">All Terms</option>
          <option value="semester">Semester</option>
          <option value="term">Term</option>
          <option value="both">Both</option>
        </select>

        <label>
          <input
            type="checkbox"
            onChange={e => setWithPrereq(e.target.checked)}
          />
          With Pre-requisites
        </label>
      </div>

      <div className="grid">
        {filtered.map(subject => (
          <div key={subject.code} className="card">
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
          </div>
        ))}
      </div>
    </>
  );
}

export default SubjectList;