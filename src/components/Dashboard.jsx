import "./Dashboard.css";
import "./ProgramList.css";
import "./SubjectList.css";

const Dashboard = ({ programs, subjects, goTo }) => {
  const totalPrograms = programs.length;
  const totalSubjects = subjects.length;
  const activePrograms = programs.filter(p => p.status === "Active").length;
  const subjectsWithPrereq = subjects.filter(
    s => s.prerequisites.length > 0
  ).length;

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>

      <p>Total Programs: {totalPrograms}</p>
      <p>Total Subjects: {totalSubjects}</p>
      <p>Active Programs: {activePrograms}</p>
      <p>Subjects with Pre-requisites: {subjectsWithPrereq}</p>

      <button onClick={() => goTo("programs")}>Programs</button>
      <button onClick={() => goTo("subjects")}>Subjects</button>
    </div>
  );
};

export default Dashboard;