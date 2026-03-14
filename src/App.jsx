import { useEffect, useState } from "react";
import Login from "./Login";
import Layout from "./components/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import ProgramList from "./components/ProgramList";
import SubjectList from "./components/SubjectList";
import Announcements from "./components/Announcements";
import ClassSchedule from "./components/ClassSchedule";
import OnlineDatabases from "./components/OnlineDatabases";
import ErrorBoundary from "./components/common/ErrorBoundary";
import WeatherPage from "./components/weather/WeatherPage";
import SubjectDetail from "./components/SubjectDetail";
import ProgramDetail from "./components/ProgramDetail";
import CalendarWidget from "./components/common/CalendarWidget";
import programs from "./data/programs";
import subjects from "./data/subjects";
import { fetchCurrentUser, getToken, logout as apiLogout } from "./services/api";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [selectedProgramCode, setSelectedProgramCode] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [user, setUser] = useState({
    id: "123712837",
    name: "Pol",
    email: "example@gmail.com",
    programCode: "bsit",
    yearLevel: "3rd Year",
    semester: "Second Semester 2025-26",
  });

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    fetchCurrentUser()
      .then((u) => {
        setIsAuthenticated(true);
        setUser((prev) => ({
          ...prev,
          id: String(u?.id ?? prev.id),
          name: u?.name ?? prev.name,
          email: u?.email ?? prev.email,
          programCode: u?.program_code ?? prev.programCode,
          yearLevel: u?.year_level ?? prev.yearLevel,
          semester: u?.semester ?? prev.semester,
        }));
      })
      .catch(() => {
        apiLogout();
        setIsAuthenticated(false);
      });
  }, []);

  const studentProgram = programs.find((p) => p.code === (user?.programCode || "bsit")) || programs[0];

  if (!isAuthenticated) {
    return (
      <>
        <Login
          onLogin={(nextUser) => {
            setIsAuthenticated(true);
            setPage("dashboard");
            if (nextUser?.id || nextUser?.email || nextUser?.name) {
              setUser((prev) => ({ ...prev, ...nextUser }));
            }
          }}
        />
      </>
    );
  }

  return (
    <>
      <ErrorBoundary>
        <Layout
          goTo={setPage}
          currentPage={page}
          userName={user.name}
          onLogout={() => {
            apiLogout();
            setIsAuthenticated(false);
          }}
        >
          {() => {
            if (page === "dashboard") {
              return (
                <>
                  <Dashboard user={{ ...user, programName: studentProgram?.name }} />
                  <div className="widgets-row">
                    <CalendarWidget />
                  </div>
                </>
              );
            }

            if (page === "programs") {
              return (
                <ProgramList
                  program={studentProgram}
                  onSelect={(program) => {
                    setSelectedProgram(program);
                    setSelectedProgramCode(program.code);
                    setPage("program-detail");
                  }}
                />
              );
            }

            if (page === "program-detail") {
              return (
                <ProgramDetail
                  program={selectedProgram || studentProgram}
                  onBack={() => setPage("programs")}
                  onViewSubjects={() => setPage("subjects")}
                />
              );
            }

            if (page === "subjects") {
              return (
                <SubjectList
                  subjects={subjects}
                  programs={programs}
                  initialProgramCode={user?.programCode || selectedProgramCode || "bsit"}
                  studentProgramCode={user?.programCode}
                  title="My Subjects"
                  onSelectSubject={(subject) => {
                    setSelectedSubject(subject);
                    setPage("subject-detail");
                  }}
                />
              );
            }

            if (page === "subject-detail") {
              return (
                <SubjectDetail
                  subject={selectedSubject}
                  onBack={() => setPage("subjects")}
                />
              );
            }

            if (page === "announcements") {
              return <Announcements />;
            }

            if (page === "schedule") {
              return <ClassSchedule user={user} subjects={subjects} />;
            }

            if (page === "databases") {
              return <OnlineDatabases />;
            }

            if (page === "weather") {
              return <WeatherPage />;
            }

            return null;
          }}
        </Layout>
      </ErrorBoundary>
    </>
  );
}

export default App;