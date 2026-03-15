import { useEffect, useState } from "react";
import EnrollmentChart from "./EnrollmentChart";
import CourseDistributionChart from "./CourseDistributionChart";
import AttendanceChart from "./AttendanceChart";
import "../../components/Dashboard.css";
import { fetchDashboard } from "../../services/api";

function normalizeEnrollment(data) {
  const raw =
    data?.enrollmentByMonth ??
    data?.enrollment_by_month ??
    data?.enrollment ??
    data?.monthly_enrollment ??
    [];
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => ({
    month: item.month ?? item.label ?? item.name ?? "",
    students: Number(item.students ?? item.value ?? item.count ?? 0) || 0,
  }));
}

function normalizeCourseDistribution(data) {
  const raw =
    data?.courseDistribution ??
    data?.course_distribution ??
    data?.courses ??
    [];
  if (!Array.isArray(raw)) return [];
  return raw;
}

function normalizeAttendance(data) {
  const raw =
    data?.attendancePattern ??
    data?.attendance_pattern ??
    data?.attendance ??
    [];
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => ({
    day: item.day ?? item.label ?? "",
    attendance: Number(item.attendance ?? item.value ?? item.percent ?? 0) || 0,
  }));
}

function normalizeStats(data) {
  const stats = data?.stats ?? data;
  if (!stats || typeof stats !== "object") return null;
  return {
    students:
      stats.students ??
      stats.total_students ??
      stats.enrolled_students ??
      null,
    courses:
      stats.courses ??
      stats.total_courses ??
      stats.subjects ??
      stats.total_subjects ??
      null,
    school_days:
      stats.school_days ??
      stats.total_school_days ??
      stats.days ??
      null,
  };
}

function Dashboard({ user }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollmentByMonth, setEnrollmentByMonth] = useState([]);
  const [courseDistribution, setCourseDistribution] = useState([]);
  const [attendancePattern, setAttendancePattern] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchDashboard()
      .then((data) => {
        if (!isMounted) return;
        const normalizedStats = normalizeStats(data);
        const enrollment = normalizeEnrollment(data);
        const courseDist = normalizeCourseDistribution(data);
        const attendance = normalizeAttendance(data);

        setStats(normalizedStats);
        setEnrollmentByMonth(enrollment);
        setCourseDistribution(courseDist);
        setAttendancePattern(attendance);
        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Failed to load dashboard data.");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const totalStudents = stats?.students ?? "—";
  const totalCourses = stats?.courses ?? "—";
  const totalSchoolDays = stats?.school_days ?? "—";

  return (
    <div className="portal-dashboard">
      <header className="portal-header">
        <div>
          <div className="student-id">Student ID: {user?.id || "—"}</div>
          <h1 className="student-name">{user?.name || "—"}</h1>
          <p className="student-email">{user?.email || "—"}</p>
          <p className="student-meta">
            {user?.semester || "Second Semester 2025-26"} • {user?.yearLevel || "3rd Year"} • {user?.programName || "Bachelor of Science in Information Technology"}
          </p>
        </div>
        <div className="badge-pill">ENROLLED</div>
      </header>

      <section className="alert-strip">
        <span>FOR STUDENTS</span>
        <strong>Data Privacy Policy</strong>
      </section>
      <section className="alert-strip secondary">
        <span>FOR STUDENTS</span>
        <strong>Online Classroom Learning Environment Survey</strong>
      </section>

      <section className="stats-row">
        <div className="stat-card">
          <h4>Your program</h4>
          <p className="stat-value">{totalCourses}</p>
          <span className="stat-sub">Courses offered</span>
        </div>
        <div className="stat-card">
          <h4>School days</h4>
          <p className="stat-value">{totalSchoolDays}</p>
          <span className="stat-sub">This term</span>
        </div>
        <div className="stat-card">
          <h4>Campus</h4>
          <p className="stat-value">{totalStudents}</p>
          <span className="stat-sub">Enrolled students</span>
        </div>
        <div className="stat-card">
          <h4>Status</h4>
          <p className="stat-value">GOOD</p>
          <span className="stat-sub">In good standing</span>
        </div>
      </section>

      <section className="charts-section">
        {loading && (
          <div className="data-state loading">Loading dashboard data…</div>
        )}
        {error && !loading && (
          <div className="data-state error">{error}</div>
        )}
        {!loading && !error && (
          <div className="charts-grid">
            <EnrollmentChart data={enrollmentByMonth} />
            <CourseDistributionChart data={courseDistribution} />
            <AttendanceChart data={attendancePattern} />
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;

