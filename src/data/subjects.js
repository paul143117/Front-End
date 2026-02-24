const subjects = [
  {
    id: 1,
    code: "IT101",
    title: "Introduction to Computing",
    units: 3,
    semester: "Semester",
    program: "BSIT",
    description: "Basic computing concepts.",
    prerequisites: [],
    corequisites: []
  },
  {
    id: 2,
    code: "IT201",
    title: "Data Structures",
    units: 3,
    semester: "Both",
    program: "BSIT",
    description: "Study of data organization.",
    prerequisites: ["IT101"],
    corequisites: []
  }
];

export default subjects;