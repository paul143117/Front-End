const subjects = [
  {
    id: 1,
    code: "IT101",
    title: "Introduction to IT",
    units: 3,
    programCode: "bsit",
    termType: "semester",
    prerequisites: [],
    description: "Basic IT concepts."
  },
  {
    id: 2,
    code: "IT201",
    title: "Programming 1",
    units: 5,
    programCode: "bsit",
    termType: "both",
    prerequisites: ["IT101"],
    description: "Introduction to programming."
  },
  {
    id: 3,
    code: "CS101",
    title: "Introduction to Computing",
    units: 3,
    programCode: "bscs",
    termType: "term",
    prerequisites: [],
    description: "Fundamentals of computing."
  }
];

export default subjects;