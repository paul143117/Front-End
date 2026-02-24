import "./ProgramList.css";

const ProgramDetails = ({ program, goBack }) => {
  return (
    <div style={{ padding: 40 }}>
      <button onClick={goBack}>Back</button>
      <h2>{program.code}</h2>
      <p>{program.description}</p>
      <p>Duration: {program.duration}</p>
      <p>Total Units: {program.totalUnits}</p>

      {Object.entries(program.yearLevels).map(([year, subjects]) => (
        <div key={year}>
          <h4>{year}</h4>
          <ul>
            {subjects.map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProgramDetails;