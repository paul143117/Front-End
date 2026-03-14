import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = [
  "#e57373", "#c62828", "#f48fb1", "#ad1457",
  "#f97316", "#ef6c00", "#16a34a", "#0891b2",
  "#2563eb", "#7c3aed", "#4f46e5", "#0d9488",
];

function normalizeChartData(raw) {
  if (!raw || !Array.isArray(raw) || raw.length === 0) return null;
  return raw
    .map((item) => ({
      name: item.name ?? item.course_code ?? item.course ?? "—",
      value: Number(item.value ?? item.count ?? item.enrollment ?? 0) || 0,
    }))
    .filter((d) => d.value > 0);
}

const FALLBACK_DATA = [
  { name: "BSIT", value: 120 },
  { name: "BSED", value: 80 },
  { name: "BSBA", value: 60 },
  { name: "BSCS", value: 95 },
  { name: "BSEE", value: 55 },
  { name: "BSHM", value: 70 },
];

function CourseDistributionChart({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const normalized = normalizeChartData(data);
  const chartData = normalized?.length ? normalized : FALLBACK_DATA;
  const total = chartData.reduce((sum, d) => sum + d.value, 0);
  const hasRealData = normalized?.length > 0;

  return (
    <div className="chart-card chart-card--course-distribution">
      <h3>Course Distribution</h3>
      <p className="chart-card-sub">Enrollment by program</p>
      <div className="chart-wrapper">
        {chartData.length === 0 ? (
          <div className="chart-empty">No course data available.</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                innerRadius={36}
                stroke="#fff"
                strokeWidth={2}
                paddingAngle={1}
                activeIndex={activeIndex}
                activeShape={{
                  stroke: "#b71c1c",
                  strokeWidth: 2,
                  filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.15))",
                }}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                label={({ name, value, percent }) => {
                  const pct = (percent * 100).toFixed(0);
                  if (percent < 0.05) return null;
                  return `${name}: ${value} (${pct}%)`;
                }}
                labelLine={{ stroke: "#6b7280", strokeWidth: 1 }}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`${entry.name}-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const item = payload[0].payload;
                  const pct = total ? ((item.value / total) * 100).toFixed(1) : "0";
                  return (
                    <div className="chart-tooltip chart-tooltip--pie">
                      <div className="chart-tooltip-title">{item.name}</div>
                      <div className="chart-tooltip-value">
                        {item.value} enrolled ({pct}%)
                      </div>
                    </div>
                  );
                }}
              />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                formatter={(value, entry) => (
                  <span className="chart-legend-item" style={{ color: entry?.color ?? "#374151" }}>
                    {value}
                  </span>
                )}
                wrapperStyle={{ paddingLeft: "12px" }}
                iconType="circle"
                iconSize={10}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      {!hasRealData && chartData.length > 0 && (
        <p className="chart-fallback-note">Showing sample data.</p>
      )}
    </div>
  );
}

export default CourseDistributionChart;

