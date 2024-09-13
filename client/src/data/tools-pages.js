import {
  projectImagePlaceholder,
  emailFinderSystemPreview,
  mentorMenteeSystemPreview,
  mentorMenteeInstructions1,
  mentorMenteeInstructions2,
  mentorMenteeInstructions3,
} from "../assets";

// General Tools Data

export const timeData = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};

export const projectDescriptions = [
  {
    id: "email-finder",
    number: "01",
    name: "Automated Email Finder System",
    description:
      "The AEFS (Automated Email Finder System) finds emails from websites of over 90,000 K-12 public schools across the United States. Filter by your state, city, steet, zipcode, or school, or all the above to find the emails of your desired schools.",
    subDescription:
      "For precise results, feel free to use the mile radius option based on the desired state, city, and street location.",
    image: emailFinderSystemPreview,
    link: "email-finder-system",
  },
  {
    id: "mentor-mentee-matchmaker",
    number: "02",
    name: "Mentor Mentee Matchmaking System",
    description:
      "The MMMS (Mentor Mentee Matchmaking System) takes the excel file response based on the google form sign-ups provided to you. Based on the availablity of the individuals of the two respective groups, you will receive two excel files: one pertaining all matched pairs and the other containing all unmatched mentees / available mentors.",
    subDescription:
      "For complete matching of all potential pairs between mentors and mentees, please utilize the system multiple times with the unmatched mentor/mentee excel file until no more matching possibilities are observed.",
    image: mentorMenteeSystemPreview,
    link: "mentor-mentee-matching-system",
  },
];

export const toolLinks = [
  {
    id: "home",
    name: "Home",
    pageLink: "/tools",
  },
  {
    id: "email-finder",
    name: "Email Finder",
    pageLink: "/tools/email-finder-system",
  },
  {
    id: "mentor-mentee",
    name: "Mentor Mentee Matcher",
    pageLink: "/tools/mentor-mentee-matching-system",
  },
  {
    id: "saved-information",
    name: "Saved Information",
    pageLink: "/tools/saved-information",
  },
];

export const dynamicToolLinks = (schoolName, urlPathname) => {
  const dynamicLink = [
    {
      id: "email-finder",
      name: "Email Finder",
      pageLink: "/tools/email-finder-system",
      dropdownParent: true,
    },
    {
      id: "school-information",
      name: `${schoolName} Information`,
      pageLink: `/tools/email-finder-system/school/${urlPathname}`,
      dropdown: true,
    },
  ];
  const insertIndex = toolLinks.findIndex((link) => link.id === "email-finder");
  return [
    ...toolLinks.slice(0, insertIndex),
    ...dynamicLink,
    ...toolLinks.slice(insertIndex + 1),
  ];
};

// Email Finder System Data

export const tableInputs = [
  {
    id: "city-input",
    type: "text",
    placeholder: "City",
    value: "city",
    setValue: "setCity",
    className: "light-gray-border p-2 border rounded",
  },
  {
    id: "state-input",
    type: "text",
    placeholder: "State",
    value: "locationState",
    setValue: "setLocationState",
    className: "light-gray-border p-2 border rounded",
  },
  {
    id: "city-input",
    type: "text",
    placeholder: "Street",
    value: "street",
    setValue: "setStreet",
    className: "light-gray-border p-2 border rounded",
  },
];

export const states = [
  {
    id: "illinois",
    value: "Illinois",
    label: "Illinois",
  },
  {
    id: "maine",
    value: "Maine",
    label: "Maine",
  },
  {
    id: "massachusetts",
    value: "Massachusetts",
    label: "Massachusetts",
  },
];

export const miles = [
  {
    id: "N/A-mile",
    value: "N/A",
    label: "N/A",
  },
  {
    id: "1-mile",
    value: 1,
    label: "1",
  },
  {
    id: "5-miles",
    value: 5,
    label: "5",
  },
  {
    id: "10-miles",
    value: 10,
    label: "10",
  },
  {
    id: "20-miles",
    value: 20,
    label: "20",
  },
  {
    id: "30-miles",
    value: 30,
    label: "30",
  },
];

export const schoolDetails = [
  {
    id: "school-name-detail",
    title: "School Name:",
    key: "SCH_NAME",
  },
  {
    id: "level-detail",
    title: "Level:",
    key: "LEVEL",
  },
  {
    id: "school-type-detail",
    title: "School Type:",
    key: "SCH_TYPE_TEXT",
  },
  {
    id: "street-detail",
    title: "Street:",
    key: "LSTREET1",
  },
  {
    id: "city-detail",
    title: "City:",
    key: "LCITY",
  },
  {
    id: "state-detail",
    title: "State:",
    key: "STATENAME",
  },
  {
    id: "zipcode-detail",
    title: "Zipcode:",
    key: "LZIP",
  },
  {
    id: "phone-number-detail",
    title: "Phone Number:",
    key: "PHONE",
  },
  {
    id: "general-website-detail",
    title: "General Website:",
    key: "SCRAPED_WEBSITE",
  },
];

// Mentor Mentee Data

export const tableHeaders = {
  matchedPairs: [
    "Mentor Name",
    "Mentor Contact",
    "Mentee Name",
    "Mentee Contact",
    "Mentor Instrument",
    "Mentee Instrument",
    "Time of Lesson (day, time)",
    "In-Person or Online",
  ],
  unmatched: [
    "Name",
    "Contact Info",
    "Instrument",
    "Preferred Lesson Mode",
    "Type",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Available Spots",
  ],
};

export const instructionPieces = [
  {
    id: "instruction-1",
    img: mentorMenteeInstructions1,
    alt: "First instruction",
    className: "",
  },
  {
    id: "instruction-2",
    img: mentorMenteeInstructions2,
    alt: "first instruction",
    className: "",
  },
  {
    id: "instruction-3",
    img: mentorMenteeInstructions3,
    alt: "first instruction",
    className: "",
  },
];
