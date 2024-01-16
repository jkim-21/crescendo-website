import { 
  facebook, 
  instagram, 
  linkedin, 
  twitter, 
  send, 
  shield, 
  star,

  allenBeckwith,
  kiranMohan,
  jonathanRaymond,
  justinKim,
  
  colby,
  harvard,
  northwestern,
  ucsb,
  uiuc,
  stevenson
} from "../assets";

import pic1 from '../assets/pic1.png';
import pic2 from '../assets/pic2.png';
import pic3 from '../assets/pic3.png';

export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "features",
    title: "Features",
  },
  {
    id: "about-us",
    title: "About Us",
  },
  {
    id: "chapters",
    title: "Chapters",
  },
];

export const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Rewards",
    content:
      "The best credit cards offer some tantalizing combinations of promotions and prizes",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "100% Secured",
    content:
      "We take proactive steps make sure your information and transactions are secure.",
  },
  {
    id: "feature-3",
    icon: send,
    title: "Balance Transfer",
    content:
      "A balance transfer credit card can save you a lot of money in interest charges.",
  },
];

export const founders = [
  {
    id: "founder-1",
    img: allenBeckwith,
    name: "Allen Beckwith",
    title: "Co-Founder and President",
    content: {
      content1: "Allen Beckwith serves as Co-Founder and President of Crescendo for a Cause. He is a Senior undergraduate student at Northwestern University, Robert R. McCormick School of Engineering and Applied Science, pursuing a Bachelor of Science in Electrical Engineering. He is also the Principal Clarinetist of the Northwestern Philharmonia Orchestra.",
      content2: "Allen has studied the piano since age four and the clarinet since age ten. His favorite composer is Sergei Rachmaninoff, and he is also an avid fan of jazz artists such as Count Basie, Stan Kenton, Roy Hargrove, and many others. His favorite musical memories are from his time as Drum Major of the 2018-2019 and 2019-2020 Adlai E. Stevenson High School Marching and Pep Bands, serving as Principal Clarinetist of the 2017 Macy’s Great American Marching Band, and performing in the 2018 and 2020 Illinois Music Education Association All-State Honor Bands",
    },
  },
  {
    id: "founder-2",
    img: kiranMohan,
    name: "Kiran Mohan",
    title: "Co-Founder and President",
    content: {
      content1: "Kiran Mohan serves as Co-Founder and President of Crescendo for a Cause. He is a Senior undergraduate student at Harvard University, pursuing a Bachelor of Arts in History of Science with a secondary in Global Health & Health Policy. Kiran is particularly interested in how music can affect the brain and has conducted research at Northwestern University and Harvard University.",
      content2: "Kiran has played a variety of instruments, including the piano, oboe, English horn and alto saxophone. In addition to pursuing performance opportunities on campus, he has taken several courses at Harvard on how music can shape culture. Kiran has also completed music therapy courses from the Berklee College of Music that have inspired Crescendo for a Cause’s approach to conducting in-person and virtual therapeutic music performances. Some of Kiran’s favorite composers include Maurice Ravel and Johannes Brahms. His favorite musical memory has been organizing Crescendo for a Cause assisted living facility concerts and seeing the impact music has on the residents.",
    },
  },
  {
    id: "founder-3",
    img: jonathanRaymond,
    name: "Jonathan Raymond",
    title: "Co-Founder and President",
    content: {
      content1: "Jonathan Raymond co-founded and serves on the executive board for Crescendo for a Cause. He is a Senior undergraduate student at the University of Illinois Urbana-Champaign, pursuing a Bachelor of Science in Chemistry. When Jonathan isn’t at the bench in various research groups at school, he loves to time to play in jazz bands around campus and compose music.",
      content2: "Jonathan has studied the piano since age four and the trumpet since age ten. Some of his favorite musicians and composers consist of Chick Corea, Oscar Peterson, Tito Carrillo and Frédéric Chopin. The work of Clifford Brown is a notable inspiration for Jonathan. His favorite musical memories were during his two summers in the Birch Creek Music Performance Center, Summer Music Academy Jazz Program, and performing in the 2020 Illinois Music Education Association All-State Honors Jazz Ensemble.",
    },
  },
  {
    id: "founder-4",
    img: justinKim,
    name: "Justin Kim",
    title: "President",
    content: {
      content1: "Justin Kim is an undergraduate student at Colby College studying neuroscience. He plays classical piano and jazz saxophone, and loves to play in ensembles. At C4C, Justin is particularly interested in the mentorship aspect of music education, eager to give back the same inspiring guidance that he once received from his mentors.",
    },
  },
];


export const chapters = [
  {
    id: "chapter-1",
    img: colby,
    name: "Colby College",
    link: "./colby"

  },
  {
    id: "chapter-2",
    img: harvard,
    name: "Harvard University",

  },
  {
    id: "chapter-3",
    img: northwestern,
    name: "Northwestern University",

  },
  {
    id: "chapter-4",
    img: ucsb,
    name: "University of California, Santa Barbara",

  },
  {
    id: "chapter-5",
    img: uiuc,
    name: "University of Illinois Urbana-Champaign",

  },
  {
    id: "chapter-6",
    img: stevenson,
    name: "Stevenson High School",
  },
];







export const stats = [
  {
    id: "stats-1",
    title: "K-12 Students in our Coast-to-Coast programs",
    value: "200+",
  },
  {
    id: "stats-2",
    title: "of instruments donated to under-priviledged communities",
    value: "$30,000+",
  },
  {
    id: "stats-3",
    title: "live/virtual therapeutic performances",
    value: "100+",
  },
];


export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        name: "Content",
        link: "https://www.hoobank.com/content/",
      },
      {
        name: "How it Works",
        link: "https://www.hoobank.com/how-it-works/",
      },
      {
        name: "Create",
        link: "https://www.hoobank.com/create/",
      },
      {
        name: "Explore",
        link: "https://www.hoobank.com/explore/",
      },
      {
        name: "Terms & Services",
        link: "https://www.hoobank.com/terms-and-services/",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Help Center",
        link: "https://www.hoobank.com/help-center/",
      },
      {
        name: "Partners",
        link: "https://www.hoobank.com/partners/",
      },
      {
        name: "Suggestions",
        link: "https://www.hoobank.com/suggestions/",
      },
      {
        name: "Blog",
        link: "https://www.hoobank.com/blog/",
      },
      {
        name: "Newsletters",
        link: "https://www.hoobank.com/newsletters/",
      },
    ],
  },
  {
    title: "Partner",
    links: [
      {
        name: "Our Partner",
        link: "https://www.hoobank.com/our-partner/",
      },
      {
        name: "Become a Partner",
        link: "https://www.hoobank.com/become-a-partner/",
      },
    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];

export const feedback = [
  {
    id: "feedback-1",
    picture: pic1, // replace with your picture import or URL
    name: "Gathering",
    title: "C4C Colby",
    
  },
  {
    id: "feedback-2",
    picture: pic2, // replace with your picture import or URL
    name: "Instrument Drive",
    title: "C4C Nation",
    
  },
  {
    id: "feedback-3",
    picture: pic3, // replace with your picture import or URL
    name: "Benefit Concert",
    title: "C4C UCSB",
    
  },
];