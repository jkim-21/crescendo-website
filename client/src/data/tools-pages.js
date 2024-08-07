import { projectImagePlaceholder } from "../assets";

export const projectDescriptions = [
  {
    id: "email-finder",
    number: "01",
    name: "Automated Email Finder System",
    description:
      "The AEFS (Automated Email Finder System) finds emails from websites of over 90,000 K-12 public schools across the United States. Filter by your state, city, steet, zipcode, or school, or all the above to find the emails of your desired schools.",
    subDescription:
      "For precise results, feel free to use the mile radius option based on the desired state, city, and street location.",
    image: projectImagePlaceholder,
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
    image: projectImagePlaceholder,
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
    pageLink: "/saved-schools",
  },
  {
    id: "school-finder",
    name: "Radius Lookup",
    pageLink: "/school-finder"
  },

  // MAKE SURE TO KEEP THIS OBJECT ELEMENT LAST AT ALL TIMES
  {
    id: "logout",
    name: "Logout",
    pageLink: "/",
  },
];

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
