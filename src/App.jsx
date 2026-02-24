import { useState } from "react";
import Login from "./Login";
import Dashboard from "./components/Dashboard";
import ProgramList from "./components/ProgramList";
import SubjectList from "./components/SubjectList";
import programs from "./data/programs";
import subjects from "./data/subjects";

function App() {
  const [page, setPage] = useState("login");

  if (page === "login") {
    return <Login onLogin={() => setPage("dashboard")} />;
  }

  if (page === "dashboard") {
    return (
      <Dashboard
        programs={programs}
        subjects={subjects}
        goTo={setPage}
      />
    );
  }

  if (page === "programs") {
    return (
      <ProgramList
        programs={programs}
        subjects={subjects}
        goTo={setPage}
      />
    );
  }

  if (page === "subjects") {
    return (
      <SubjectList
        subjects={subjects}
        goTo={setPage}
      />
    );
  }
}

export default App;