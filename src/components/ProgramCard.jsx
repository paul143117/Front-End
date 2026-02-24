const ProgramCard = ({ program, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid #ccc",
        padding: 20,
        margin: 10,
        cursor: "pointer"
      }}
    >
      <h3>{program.code}</h3>
      <p>{program.name}</p>
      <p>Status: {program.status}</p>
    </div>
  );
};

export default ProgramCard;