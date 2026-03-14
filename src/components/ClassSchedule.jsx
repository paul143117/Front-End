import { useMemo } from "react";

const seedSchedule = [
  { id: "s1", day: "Mon", time: "07:30–09:00", subject: "IT201", room: "Lab 2" },
  { id: "s2", day: "Mon", time: "09:00–10:30", subject: "IT101", room: "Rm 105" },
  { id: "s3", day: "Mon", time: "13:00–14:30", subject: "IT302", room: "Lab 1" },
  { id: "s4", day: "Mon", time: "14:30–16:00", subject: "IT301", room: "Rm 201" },
  { id: "s5", day: "Tue", time: "08:00–09:30", subject: "CS201", room: "Rm 102" },
  { id: "s6", day: "Tue", time: "10:00–11:30", subject: "IT202", room: "Lab 2" },
  { id: "s7", day: "Tue", time: "13:00–15:00", subject: "ED101", room: "Rm 305" },
  { id: "s8", day: "Wed", time: "08:00–10:00", subject: "CS101", room: "Rm 204" },
  { id: "s9", day: "Wed", time: "10:00–11:30", subject: "IT201", room: "Lab 2" },
  { id: "s10", day: "Wed", time: "13:00–14:30", subject: "BA101", room: "Rm 103" },
  { id: "s11", day: "Wed", time: "14:30–16:00", subject: "CS302", room: "Lab 3" },
  { id: "s12", day: "Thu", time: "07:30–09:00", subject: "IT401", room: "Rm 202" },
  { id: "s13", day: "Thu", time: "09:00–10:30", subject: "IT302", room: "Lab 1" },
  { id: "s14", day: "Thu", time: "10:30–12:00", subject: "EE101", room: "Rm 401" },
  { id: "s15", day: "Thu", time: "13:00–14:30", subject: "HM101", room: "Rm 210" },
  { id: "s16", day: "Fri", time: "08:00–09:30", subject: "IT101", room: "Rm 105" },
  { id: "s17", day: "Fri", time: "09:30–11:00", subject: "CS202", room: "Lab 2" },
  { id: "s18", day: "Fri", time: "11:00–12:30", subject: "BA201", room: "Rm 103" },
  { id: "s19", day: "Fri", time: "14:00–15:30", subject: "IT301", room: "Rm 201" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

// Build time slots from 7:00 to 17:00 every 30 min
const SLOT_START = 7;
const SLOT_END = 17;
const SLOT_INTERVAL = 30;

function buildTimeSlots() {
  const slots = [];
  for (let h = SLOT_START; h < SLOT_END; h++) {
    for (let m = 0; m < 60; m += SLOT_INTERVAL) {
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return slots;
}

const TIME_SLOTS = buildTimeSlots();

function parseTimeRange(timeStr) {
  const parts = (timeStr || "").split(/[–\-]/).map((s) => s.trim());
  if (parts.length < 2) return { startIndex: 0, span: 1 };
  const [start, end] = parts;
  const toMinutes = (t) => {
    const [h, m] = (t || "0:0").split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
  };
  const startMin = toMinutes(start);
  const endMin = toMinutes(end);
  const slotMinutes = SLOT_INTERVAL;
  const firstSlotMin = SLOT_START * 60;
  const startSlotIndex = Math.max(0, Math.floor((startMin - firstSlotMin) / slotMinutes));
  const endSlotIndex = Math.min(
    TIME_SLOTS.length,
    Math.ceil((endMin - firstSlotMin) / slotMinutes)
  );
  const span = Math.max(1, endSlotIndex - startSlotIndex);
  return { startIndex: startSlotIndex, span };
}

function ClassSchedule({ user = null, subjects = [] }) {
  const mySubjectCodes = useMemo(() => {
    const code = user?.programCode;
    if (!code || !subjects.length) return null;
    return new Set(subjects.filter((s) => s.programCode === code).map((s) => s.code));
  }, [user?.programCode, subjects]);

  const schedule = useMemo(() => {
    if (!mySubjectCodes) return seedSchedule;
    return seedSchedule.filter((s) => mySubjectCodes.has(s.subject));
  }, [mySubjectCodes]);

  // For each (slotIndex, dayIndex): item that starts here with span, or null
  const grid = useMemo(() => {
    const dayToIndex = Object.fromEntries(DAYS.map((d, i) => [d, i]));
    const cells = TIME_SLOTS.map(() => DAYS.map(() => null));
    schedule.forEach((item) => {
      const dayIdx = dayToIndex[item.day];
      if (dayIdx == null) return;
      const { startIndex, span } = parseTimeRange(item.time);
      if (startIndex < 0 || startIndex >= TIME_SLOTS.length) return;
      cells[startIndex][dayIdx] = { ...item, span };
    });
    return cells;
  }, [schedule]);

  // For row i, day d: covered by rowSpan from above iff some item has day d, startIndex < i < startIndex+span
  const isCovered = (rowIndex, dayIdx) => {
    return schedule.some((item) => {
      const dayIdxItem = DAYS.indexOf(item.day);
      if (dayIdxItem !== dayIdx) return false;
      const { startIndex, span } = parseTimeRange(item.time);
      return startIndex < rowIndex && rowIndex < startIndex + span;
    });
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Your Weekly Class Schedule</h1>
        {user?.programCode && (
          <p className="list-sub" style={{ marginTop: 4 }}>Your enrolled classes this term</p>
        )}
      </div>

      <div className="schedule-calendar-wrap">
        <table className="schedule-calendar">
          <thead>
            <tr>
              <th className="schedule-calendar-time-col">Time</th>
              {DAYS.map((d) => (
                <th key={d} className="schedule-calendar-day-col">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map((slot, rowIndex) => (
              <tr key={slot}>
                <td className="schedule-calendar-time-col">{slot}</td>
                {DAYS.map((d, dayIdx) => {
                  if (isCovered(rowIndex, dayIdx)) return null;
                  const cell = grid[rowIndex][dayIdx];
                  if (cell) {
                    return (
                      <td
                        key={d}
                        rowSpan={cell.span}
                        className="schedule-calendar-cell schedule-calendar-cell--filled"
                      >
                        <div className="schedule-calendar-cell-title">{cell.subject}</div>
                        <div className="schedule-calendar-cell-sub">{cell.time}</div>
                        <div className="schedule-calendar-cell-sub">{cell.room}</div>
                      </td>
                    );
                  }
                  return <td key={d} className="schedule-calendar-cell" />;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClassSchedule;

