import { useMemo, useState } from "react";

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function addMonths(date, delta) {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

function formatMonthYear(date) {
  return date.toLocaleString(undefined, { month: "long", year: "numeric" });
}

function CalendarWidget() {
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()));

  const { days, leadingBlanks, trailingBlanks, todayKey } = useMemo(() => {
    const start = startOfMonth(cursor);
    const end = endOfMonth(cursor);
    const startWeekday = start.getDay(); // 0=Sun
    const totalDays = end.getDate();

    const today = new Date();
    const todayKeyLocal = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

    const daysArr = Array.from({ length: totalDays }, (_, i) => {
      const d = new Date(cursor.getFullYear(), cursor.getMonth(), i + 1);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      return { day: i + 1, key };
    });

    const blanksBefore = Array.from({ length: startWeekday }, (_, i) => ({
      key: `b-${i}`,
    }));

    const cellsSoFar = blanksBefore.length + daysArr.length;
    const blanksAfterCount = (7 - (cellsSoFar % 7)) % 7;
    const blanksAfter = Array.from({ length: blanksAfterCount }, (_, i) => ({
      key: `a-${i}`,
    }));

    return {
      days: daysArr,
      leadingBlanks: blanksBefore,
      trailingBlanks: blanksAfter,
      todayKey: todayKeyLocal,
    };
  }, [cursor]);

  return (
    <div className="calendar-card">
      <div className="calendar-header">
        <div className="calendar-title">{formatMonthYear(cursor)}</div>
        <div className="calendar-nav">
          <button type="button" onClick={() => setCursor(addMonths(cursor, -1))}>
            Prev
          </button>
          <button type="button" onClick={() => setCursor(startOfMonth(new Date()))}>
            Today
          </button>
          <button type="button" onClick={() => setCursor(addMonths(cursor, 1))}>
            Next
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="calendar-cell muted">
            {d}
          </div>
        ))}

        {leadingBlanks.map((b) => (
          <div key={b.key} className="calendar-cell muted" />
        ))}

        {days.map((d) => (
          <div
            key={d.key}
            className={`calendar-cell ${d.key === todayKey ? "today" : ""}`}
          >
            {d.day}
          </div>
        ))}

        {trailingBlanks.map((b) => (
          <div key={b.key} className="calendar-cell muted" />
        ))}
      </div>
    </div>
  );
}

export default CalendarWidget;

