function ProgramList({ programs, onSelect }) {
  return (
    <>
      <h1>Program Offerings</h1>
      <div className="grid">
        {programs.map(program => (
          <div
            key={program.code}
            className="card clickable"
            onClick={() => onSelect(program)}
          >
            <h3>{program.code.toUpperCase()}</h3>
            <p>{program.name}</p>
            <p>{program.duration}</p>
            <p>Status: {program.status}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProgramList;