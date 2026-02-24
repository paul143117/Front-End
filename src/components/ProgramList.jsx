import { useState } from "react";
import ProgramCard from "./ProgramCard";
import ProgramDetails from "./ProgramDetails";

const ProgramList = ({ programs, subjects, goTo }) => {
  const [selected, setSelected] = useState(null);

  if (selected)
    return (
      <ProgramDetails
        program={selected}
        subjects={subjects}
        goBack={() => setSelected(null)}
      />
    );

  return (
    <div style={{ padding: 40 }}>
      <h1>Programs</h1>
      <button onClick={() => goTo("dashboard")}>Back</button>

      {programs.map(program => (
        <ProgramCard
          key={program.id}
          program={program}
          onClick={() => setSelected(program)}
        />
      ))}
    </div>
  );
};

export default ProgramList;