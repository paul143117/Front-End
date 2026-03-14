import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import "../App.css";
import "./Dashboard.css";

const COURSE_COLORS = ["#e74c3c", "#f1c40f", "#1abc9c", "#3498db", "#9b59b6"];

function Dashboard({ programs, subjects }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const timeout = setTimeout(() => {
      if (!isMounted) return;

      try {
        const enrollmentByMonth = [
          { month: "Jan", students: 120 },
          { month: "Feb", students: 150 },
          { month: "Mar", students: 180 },
          { month: "Apr", students: 160 },
          { month: "May", students: 200 },
          { month: "Jun", students: 190 },
          { month: "Jul", students: 210 },
          { month: "Aug", students: 230 },
          { month: "Sep", students: 260 },
          { month: "Oct", students: 240 },
          { month: "Nov", students: 220 },
          { month: "Dec", students: 180 },
        ];

        const courseDistribution = programs.map((program, index) => ({
          name: program.name,
          value: subjects.filter((s) => s.program === program.name).length || 0,
          color: COURSE_COLORS[index % COURSE_COLORS.length],
        }));

        const attendancePattern = [
          { day: "Mon", attendance: 92 },
          { day: "Tue", attendance: 88 },
          { day: "Wed", attendance: 95 },
          { day: "Thu", attendance: 90 },
          { day: "Fri", attendance: 85 },
        ];

        setChartData({
          enrollmentByMonth,
          courseDistribution,
          attendancePattern,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard data.");
        setLoading(false);
      }
    }, 800);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [programs, subjects]);

  const totalPrograms = programs.length;
  const totalSubjects = subjects.length;
  const activePrograms = programs.filter((p) => p.status === "active").length;
  const inactivePrograms = programs.length - activePrograms;
  const subjectsWithPrereq = subjects.filter(
    (s) => s.prerequisites && s.prerequisites.length > 0,
  ).length;

  return (
    <div className="portal-dashboard">
      <header className="portal-header">
        <div>
          <div className="student-id">123712837</div>
          <h1 className="student-name">Pol</h1>
          <p className="student-email">example@gmail.com</p>
          <p className="student-meta">
            Second Semester 2025-26 • 1st Year Bachelor Of Science In
            Information Technology
          </p>
        </div>
        <div className="badge-pill">ENROLLED</div>
      </header>

      <section className="alert-strip">
        <span>All Students</span>
        <strong>Data Privacy Policy</strong>
      </section>
      <section className="alert-strip secondary">
        <span>All Students</span>
        <strong>Online Classroom Learning Environment Survey</strong>
      </section>

      <section className="stats-row">
        <div className="stat-card">
          <h4>Programs</h4>
          <p className="stat-value">{totalPrograms}</p>
          <span className="stat-sub">Total Programs</span>
        </div>
        <div className="stat-card">
          <h4>Subjects</h4>
          <p className="stat-value">{totalSubjects}</p>
          <span className="stat-sub">Total Subjects</span>
        </div>
        <div className="stat-card">
          <h4>Active Programs</h4>
          <p className="stat-value">{activePrograms}</p>
          <span className="stat-sub">Currently Offered</span>
        </div>
        <div className="stat-card">
          <h4>With Pre‑requisites</h4>
          <p className="stat-value">{subjectsWithPrereq}</p>
          <span className="stat-sub">Subjects</span>
        </div>
      </section>

      <section className="charts-section">
        {loading && (
          <div className="data-state loading">Loading dashboard data…</div>
        )}
        {error && !loading && (
          <div className="data-state error">{error}</div>
        )}
        {!loading && !error && chartData && (
          <div className="charts-grid">
            <div className="chart-card wide">
              <h3>Monthly Enrollment Trends</h3>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.enrollmentByMonth}>
                    <XAxis dataKey="month" stroke="#9e6a6a" />
                    <YAxis stroke="#9e6a6a" />
                    <Tooltip />
                    <Bar dataKey="students" fill="#e57373" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card">
              <h3>Students per Program</h3>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData.courseDistribution}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={80}
                      label
                    >
                      {chartData.courseDistribution.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={COURSE_COLORS[index % COURSE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card">
              <h3>Attendance Pattern</h3>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData.attendancePattern}>
                    <XAxis dataKey="day" stroke="#9e6a6a" />
                    <YAxis unit="%" stroke="#9e6a6a" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      stroke="#e57373"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;