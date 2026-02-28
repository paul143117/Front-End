function Dashboard({ programs, subjects }) {
  const totalPrograms = programs.length;
  const totalSubjects = subjects.length;
  const activePrograms = programs.filter(p => p.status === "active").length;
  const inactivePrograms = programs.length - activePrograms;
  const subjectsWithPrereq = subjects.filter(s => s.prerequisites.length > 0).length;

  return (
    <>
      <h1>Dashboard</h1>
      <div className="grid">
        <div className="card">Total Programs: {totalPrograms}</div>
        <div className="card">Total Subjects: {totalSubjects}</div>
        <div className="card">Active Programs: {activePrograms}</div>
        <div className="card">Inactive Programs: {inactivePrograms}</div>
        <div className="card">Subjects with Pre-req: {subjectsWithPrereq}</div>
      </div>
    </>
  );
}

export default Dashboard;