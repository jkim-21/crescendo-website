import { toolsLogo, logo, logoTitle, toolsLogo2 } from "../assets";

import {
  faFacebookF,
  faInstagram,
  faYoutube,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export const general = {
  name: "Crescendo for a Cause",
  phoneNumber: "1-847-383-6455",
  email: "crescendoforacause@gmail.com",
  location: "Buffalo Grove, IL 60089",
};

export const socialMedias = [
  {
    id: "instagram-icon",
    link: "https://www.instagram.com/crescendo_for_a_cause/",
    smIcon: faInstagram,
  },
  {
    id: "youtube-icon",
    link: "https://www.youtube.com/channel/UCaTDEpynGvYmYFW5r0c6Rhw",
    smIcon: faYoutube,
  },
  {
    id: "facebook-icon",
    link: "https://www.facebook.com/crescendoforacause/",
    smIcon: faFacebookF,
  },
  {
    id: "linkedin-icon",
    link: "https://www.linkedin.com/company/crescendo-for-a-cause/",
    smIcon: faLinkedin,
  },
];

export const logos = {
  navbarLogo: logo,
  sidebarLogo: toolsLogo,
  logoTitle: logoTitle,
  sidebarLogo2: toolsLogo2,
};
