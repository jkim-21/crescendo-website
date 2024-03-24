import { 
  

  slideshowPic1,
  slideshowPic2,
  slideshowPic3,
  slideshowPic4,

  kiranMohan,
  jonathanRaymond,
  justinKim,
  
  colby,
  harvard,
  northwestern,
  ucsb,
  uiuc,
  stevenson,

  finance,
  wim,
  musubi, 
  heritage,
  trulee, 
  merion,
  colby2,
} from "../assets";

export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "donate",
    title: "Donate",
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

export const slideshows = [
  {
    id: "slideshow-1",
    picture: slideshowPic1,
    name: "Gathering",
    title: "C4C Organization",
    
  },
  {
    id: "slideshow-2",
    picture: slideshowPic2,
    name: "Gathering",
    title: "C4C Colby",
    
  },
  {
    id: "slideshow-3",
    picture: slideshowPic3, 
    name: "Instrument Drive",
    title: "C4C Nation",
    
  },
  {
    id: "slideshow-4",
    picture: slideshowPic4, 
    name: "Benefit Concert",
    title: "C4C UCSB",
  },
];

export const founders = [
  {
    id: "kiran-founder",
    img: kiranMohan,
    name: "Kiran Mohan",
    title: "Board Executive",
    content: {
      content1: "Kiran Mohan serves as Co-Founder and President of Crescendo for a Cause. He is a Senior undergraduate student at Harvard University, pursuing a Bachelor of Arts in History of Science with a secondary in Global Health & Health Policy. Kiran is particularly interested in how music can affect the brain and has conducted research at Northwestern University and Harvard University.",
      content2: "Kiran has played a variety of instruments, including the piano, oboe, English horn and alto saxophone. In addition to pursuing performance opportunities on campus, he has taken several courses at Harvard on how music can shape culture. Kiran has also completed music therapy courses from the Berklee College of Music that have inspired Crescendo for a Cause’s approach to conducting in-person and virtual therapeutic music performances. Some of Kiran’s favorite composers include Maurice Ravel and Johannes Brahms. His favorite musical memory has been organizing Crescendo for a Cause assisted living facility concerts and seeing the impact music has on the residents.",
    },
  },
  {
    id: "jonathan-founder",
    img: jonathanRaymond,
    name: "Jonathan Raymond",
    title: "Board Executive",
    content: {
      content1: "Jonathan Raymond co-founded and serves on the executive board for Crescendo for a Cause. He is a Senior undergraduate student at the University of Illinois Urbana-Champaign, pursuing a Bachelor of Science in Chemistry. When Jonathan isn’t at the bench in various research groups at school, he loves to time to play in jazz bands around campus and compose music.",
      content2: "Jonathan has studied the piano since age four and the trumpet since age ten. Some of his favorite musicians and composers consist of Chick Corea, Oscar Peterson, Tito Carrillo and Frédéric Chopin. The work of Clifford Brown is a notable inspiration for Jonathan. His favorite musical memories were during his two summers in the Birch Creek Music Performance Center, Summer Music Academy Jazz Program, and performing in the 2020 Illinois Music Education Association All-State Honors Jazz Ensemble.",
    },
  },
  {
    id: "justin-founder",
    img: justinKim,
    name: "Justin Kim",
    title: "Board Executive",
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
    link: "./chapters/colby"

  },
  {
    id: "chapter-2",
    img: harvard,
    name: "Harvard University",
    link: "./chapters/harvard"
  },
  {
    id: "chapter-3",
    img: northwestern,
    name: "Northwestern University",
    link: "./chapters/northwestern"
  },
  {
    id: "chapter-4",
    img: ucsb,
    name: "University of California, Santa Barbara",
    link: "./chapters/ucsb"
  },
  {
    id: "chapter-5",
    img: uiuc,
    name: "University of Illinois Urbana-Champaign",
    link: "./chapters/uiuc"
  },
  {
    id: "chapter-6",
    img: stevenson,
    name: "Stevenson High School",
    link: "./chapters/stevenson"
  },
];


export const stats = [
  {
    id: "stats-1",
    title: "K-12 Students in our Coast-to-Coast programs",
    value: "200+",
    img: 
  },
  {
    id: "stats-2",
    title: "of instruments donated to under-priviledged communities",
    value: "$35,000+",
  },
  {
    id: "stats-3",
    title: "live/virtual therapeutic performances",
    value: "100+",
    lastStat: true,
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

export const feedback = [
  {
    id: "feedback-1",
    picture: finance,
    name: "Finance Equity Presentation",
    title: "C4C Colby",
    img: colby2,
    
  },
  {
    id: "feedback-2",
    picture: trulee, 
    name: "Trulee Concert",
    title: "C4C Northwestern",
    img: northwestern,
    
  },
  {
    id: "feedback-3",
    picture: wim,
    name: "Women in Music Presentation",
    title: "C4C Colby",
    img: colby2,
   
  },

  {
    id: "feedback-4",
    picture: musubi, 
    name: "Spam Musubi Fundraiser",
    title: "C4C UCSB",
    img: ucsb,
   
  },

  {
    id: "feedback-5",
    picture: heritage,
    name: "Heritage Concert",
    title: "C4C UCSB",
    img: ucsb,
   
  },

  {
    id: "feedback-6",
    picture: merion, 
    name: "Merion Concert",
    title: "C4C Northwestern",
    img: northwestern,
   
  },

]