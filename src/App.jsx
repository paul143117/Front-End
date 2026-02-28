import { useState } from "react";
import Login from "./Login";
import Dashboard from "./components/Dashboard";
import ProgramList from "./components/ProgramList";
import SubjectList from "./components/SubjectList";
import Layout from "./components/Layout";
import programs from "./data/programs";
import subjects from "./data/subjects";

function App() {
  const [page, setPage] = useState("login");
  const [selectedProgram, setSelectedProgram] = useState(null);

  const handleLogout = () => {
    setPage("login");
    setSelectedProgram(null);
  };

  if (page === "login") {
    return <Login onLogin={() => setPage("dashboard")} />;
  }

  return (
    <Layout goTo={setPage} onLogout={handleLogout}>
      {(search) => {
        if (page === "dashboard")
          return <Dashboard programs={programs} subjects={subjects} />;

        if (page === "programs")
          return (
            <ProgramList
              programs={programs}
              onSelectProgram={(programName) => {
                setSelectedProgram(programName);
                setPage("subjects");
              }}
            />
          );

        if (page === "subjects") {
          const filteredSubjects = subjects
            .filter((s) =>
              selectedProgram
                ? s.program === selectedProgram
                : true
            )
            .filter((s) =>
              (s.name || "")
                .toLowerCase()
                .includes(search.toLowerCase())
            );

          return (
            <SubjectList
              subjects={filteredSubjects}
              selectedProgram={selectedProgram}
            />
          );
        }
      }}
    </Layout>
  );
}

export default App;