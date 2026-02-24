import { useState } from "react";
import SubjectCard from "./SubjectCard";
import SubjectDetails from "./SubjectDetails";
import "./SubjectList.css";

const SubjectList = ({ subjects, goTo }) => {
  const [selected, setSelected] = useState(null);

  if (selected)
    return (
      <SubjectDetails
        subject={selected}
        goBack={() => setSelected(null)}
      />
    );

  return (
    <div style={{ padding: 40 }}>
      <h1>Subjects</h1>
      <button onClick={() => goTo("dashboard")}>Back</button>

      {subjects.map(subject => (
        <SubjectCard
          key={subject.id}
          subject={subject}
          onClick={() => setSelected(subject)}
        />
      ))}
    </div>
  );
};

export default SubjectList;