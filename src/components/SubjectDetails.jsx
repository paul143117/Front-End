const SubjectDetails = ({ subject, goBack }) => {
  return (
    <div style={{ padding: 40 }}>
      <button onClick={goBack}>Back</button>
      <h2>{subject.code} - {subject.title}</h2>
      <p>Units: {subject.units}</p>
      <p>Semester: {subject.semester}</p>
      <p>
        Pre-requisites:{" "}
        {subject.prerequisites.length > 0
          ? subject.prerequisites.join(", ")
          : "None"}
      </p>
      <p>
        Co-requisites:{" "}
        {subject.corequisites.length > 0
          ? subject.corequisites.join(", ")
          : "None"}
      </p>
      <p>{subject.description}</p>
    </div>
  );
};

export default SubjectDetails;