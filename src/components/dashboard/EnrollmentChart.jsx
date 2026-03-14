import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SEMESTERS = [
  { label: "1st Semester", key: "first", fallback: 480 },
  { label: "2nd Semester", key: "second", fallback: 520 },
];

const FIRST_SEM_MONTHS = ["jan", "feb", "mar", "apr", "may", "jun"];
const SECOND_SEM_MONTHS = ["jul", "aug", "sep", "oct", "nov", "dec"];

const defaultData = SEMESTERS.map((s) => ({
  semester: s.label,
  students: s.fallback,
}));

function normalizeSemesterKey(name) {
  const n = String(name ?? "").toLowerCase();
  if (n.includes("1st") || n.includes("first") || n.includes("1") || n.includes("one")) return "first";
  if (n.includes("2nd") || n.includes("second") || n.includes("2") || n.includes("two")) return "second";
  return null;
}

function isFirstSemMonth(month) {
  const m = String(month ?? "").toLowerCase().slice(0, 3);
  return FIRST_SEM_MONTHS.some((x) => x.startsWith(m) || m.startsWith(x));
}

function isSecondSemMonth(month) {
  const m = String(month ?? "").toLowerCase().slice(0, 3);
  return SECOND_SEM_MONTHS.some((x) => x.startsWith(m) || m.startsWith(x));
}

function EnrollmentChart({ data }) {
  const raw = Array.isArray(data) && data.length > 0 ? data : null;
  const bySemester = { first: 0, second: 0 };
  const hasSemesterKeys = raw && raw.some((d) => normalizeSemesterKey(d.semester ?? d.term ?? d.label ?? d.name) != null);
  if (raw && raw.length > 0) {
    if (hasSemesterKeys) {
      raw.forEach((d) => {
        const key = normalizeSemesterKey(d.semester ?? d.term ?? d.label ?? d.name);
        const val = Number(d.students ?? d.value ?? d.count ?? 0) || 0;
        if (key) bySemester[key] = (bySemester[key] ?? 0) + val;
      });
    } else {
      raw.forEach((d) => {
        const month = d.month ?? d.label ?? d.name ?? "";
        const val = Number(d.students ?? d.value ?? d.count ?? 0) || 0;
        if (isFirstSemMonth(month)) bySemester.first += val;
        else if (isSecondSemMonth(month)) bySemester.second += val;
      });
    }
  }
  const hasAggregated = bySemester.first > 0 || bySemester.second > 0;
  const chartData = SEMESTERS.map((s) => ({
    semester: s.label,
    students: hasAggregated ? (bySemester[s.key] || 0) || s.fallback : s.fallback,
  }));
  return (
    <div className="chart-card wide chart-card--enrollment">
      <h3>Enrollment by Semester</h3>
      <div className="chart-wrapper chart-wrapper--enrollment">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 8, left: 0, bottom: 4 }}
          >
            <XAxis
              dataKey="semester"
              stroke="#9e6a6a"
              tick={{ fontSize: 12 }}
              interval={0}
            />
            <YAxis stroke="#9e6a6a" tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar
              dataKey="students"
              fill="#e57373"
              radius={[6, 6, 0, 0]}
              maxBarSize={80}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EnrollmentChart;

