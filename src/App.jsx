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

  // LOGIN PAGE
  if (page === "login") {
    return <Login onLogin={() => setPage("dashboard")} />;
  }

  return (
    <Layout goTo={setPage} onLogout={handleLogout}>
      {(search) => {
        // DASHBOARD
        if (page === "dashboard") {
          return <Dashboard programs={programs} subjects={subjects} />;
        }

        // PROGRAM LIST
        if (page === "programs") {
          return (
            <ProgramList
              programs={programs}
              onSelectProgram={(programName) => {
                setSelectedProgram(programName);
                setPage("subjects");
              }}
            />
          );
        }

        // SUBJECT LIST
        if (page === "subjects") {
          const filteredSubjects = subjects
            .filter((s) =>
              selectedProgram ? s.program === selectedProgram : true
            )
            .filter((s) =>
              (s.title || "")
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

        return null;
      }}
    </Layout>
  );
}

export default App;