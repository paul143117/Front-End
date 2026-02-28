function SubjectDetails({ subject }) {
  return (
    <>
      <h2>{subject.code.toUpperCase()} - {subject.title}</h2>
      <p>Units: {subject.units}</p>
      <p>Program: {subject.programCode}</p>
      <p>Term: {subject.termType}</p>

      <p>
        Pre-requisites:
        {subject.prerequisites.length > 0
          ? subject.prerequisites.join(", ")
          : " none"}
      </p>

      <p>
        Co-requisites:
        {subject.corequisites.length > 0
          ? subject.corequisites.join(", ")
          : " none"}
      </p>

      <p>{subject.description}</p>
    </>
  );
}
export default SubjectDetails;