const programs = [
  {
    id: 1,
    code: "BSIT",
    name: "Bachelor of Science in Information Technology",
    type: "Bachelor",
    duration: "4 years",
    totalUnits: 150,
    status: "Active",
    description: "Focuses on IT systems and development.",
    yearLevels: {
      "1st Year": ["IT101", "IT102"],
      "2nd Year": ["IT201"],
      "3rd Year": ["IT301"],
      "4th Year": ["IT401"]
    },
    createdAt: "2025-01-01"
  },
  {
    id: 2,
    code: "BSCS",
    name: "Bachelor of Science in Computer Science",
    type: "Bachelor",
    duration: "4 years",
    totalUnits: 155,
    status: "Under Review",
    description: "Focuses on computing theory and algorithms.",
    yearLevels: {
      "1st Year": ["CS101"],
      "2nd Year": ["CS201"],
      "3rd Year": ["CS301"],
      "4th Year": ["CS401"]
    },
    createdAt: "2025-02-01"
  }
];

export default programs;