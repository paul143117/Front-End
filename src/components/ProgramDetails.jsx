function ProgramDetails({ program, subjects }) {
  const relatedSubjects = subjects.filter(
    s => s.programCode === program.code
  );

  return (
    <>
      <h1>{program.name}</h1>
      <p>{program.description}</p>
      <p>Duration: {program.duration}</p>
      <p>Total Units: {program.totalUnits}</p>

      <h2>Subjects</h2>
      <div className="grid">
        {relatedSubjects.map(subject => (
          <div key={subject.code} className="card">
            <h4>{subject.code}</h4>
            <p>{subject.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProgramDetails;