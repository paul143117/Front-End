const SubjectCard = ({ subject, onClick }) => {
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
      <h4>{subject.code} - {subject.title}</h4>
      <p>Units: {subject.units}</p>
      <p>Semester: {subject.semester}</p>
    </div>
  );
};

export default SubjectCard;