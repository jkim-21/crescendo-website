import { 
  slideshowPic1,
  slideshowPic2,
  slideshowPic3,
  slideshowPic4,

  connection,
  instrument,
  performance,

  finance,
  wim,
  musubi, 
  heritage,
  trulee, 
  merion,
  colby2,

  chicagoTribune,
  dailyHerald,
  cwJam,

  kiranMohan,
  jonathanRaymond,
  justinKim,
  
  colby,
  harvard,
  northwestern,
  ucsb,
  uiuc,
  stevenson,
  middlebury,



} from "../assets";

export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "our-impact",
    title: "Our Impact",
  },
  {
    id: "events",
    title: "Events",
  },
  {
    id: "about-us",
    title: "About Us",
  },
  {
    id: "chapters",
    title: "Chapters",
    dropdown: true,
  },
  {
    id: "donate",
    title: "Donate",
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

export const stats = [
  {
    id: "stats-1",
    title: "K-12 Students in our Coast-to-Coast programs",
    value: "200+",
    img: connection,
    firstStat: true,
  },
  {
    id: "stats-2",
    title: "of instruments donated to under-priviledged communities",
    value: "$35,000+",
    img: instrument,
  },
  {
    id: "stats-3",
    title: "live/virtual therapeutic performances",
    value: "100+",
    img: performance,
    lastStat: true,
  },
];

export const events = [
  {
    id: "feedback-1",
    picture: finance,
    name: "Finance Equity Presentation",
    title: "C4C Colby",
    img: colby2,
    instagramUrl: "https://www.instagram.com/colbyideas/",
    
  },
  {
    id: "feedback-2",
    picture: trulee, 
    name: "Trulee Concert",
    title: "C4C Northwestern",
    img: northwestern,
    instagramUrl: "https://www.instagram.com/northwestern.c4c/",
    
  },
  {
    id: "feedback-3",
    picture: wim,
    name: "Women in Music Presentation",
    title: "C4C Colby",
    img: colby2,
    instagramUrl: "https://www.instagram.com/colbyideas/",
   
  },

  {
    id: "feedback-4",
    picture: musubi, 
    name: "Spam Musubi Fundraiser",
    title: "C4C UCSB",
    img: ucsb,
    instagramUrl: "https://www.instagram.com/crescendo.ucsb/",
   
  },

  {
    id: "feedback-5",
    picture: heritage,
    name: "Heritage Concert",
    title: "C4C UCSB",
    img: ucsb,
    instragramUrl: "https://www.instagram.com/crescendo.ucsb/",
  },

  {
    id: "feedback-6",
    picture: merion, 
    name: "Merion Concert",
    title: "C4C Northwestern",
    img: northwestern,
    instagramUrl: "https://www.instagram.com/northwestern.c4c/",
  },
];

export const news = [
  {
    id: "ChicagoTribune-News",
    picture: chicagoTribune,
    title: "Chicago Tribune",
    description: "C4C students ‘spread the joy of music’ through videos sent to elderly at facilities on lockdown due to the coronavirus.",
    link: "https://www.chicagotribune.com/2020/03/30/stevenson-students-spread-the-joy-of-music-through-videos-sent-to-elderly-at-facilities-on-lockdown-due-to-the-coronavirus/"
  },
  {
    id: "DailyHerald-News",
    picture: dailyHerald,
    title: "Daily Herald",
    description: "Crescendo for a Cause collects instruments, music stands and lesson books to be donated to programs that provide free music educational services to underserved children of inner-city Chicago.",
    link: "https://www.dailyherald.com/entlife/20190903/stevenson-seniors-create-crescendo-for-a-cause-for-community-service/"
  },
  {
    id: "CW-News",
    picture: cwJam,
    title: "The CW The Jam",
    description: "There's something about music that just motivates the soul. It's a universal language, a way to express, and has healing powers. C4C is using their love for music as a way to give back.",
    link: "https://www.wciu.com/videos/thejam/real-chicagoans-crescendo-for-a-cause",
    watch: true
  },
]

export const founders = [
  {
    id: "kiran-founder",
    img: kiranMohan,
    name: "Kiran Mohan",
    title: "Board Executive",
    content: {
      content1: "Kiran Mohan serves as Co-Founder and President of Crescendo for a Cause. He is a senior undergraduate student at Harvard University, pursuing a Bachelor of Arts in History of Science with a secondary in Global Health & Health Policy. Kiran is particularly interested in how music can affect the brain and has conducted research at Northwestern University and Harvard University.",
      content2: "Kiran has played a variety of instruments, including the piano, oboe, English horn and alto saxophone. In addition to pursuing performance opportunities on campus, he has taken several courses at Harvard on how music can shape culture. Kiran has also completed music therapy courses from the Berklee College of Music that have inspired Crescendo for a Cause’s approach to conducting in-person and virtual therapeutic music performances. Some of Kiran’s favorite composers include Maurice Ravel and Johannes Brahms. His favorite musical memory has been organizing Crescendo for a Cause assisted living facility concerts and seeing the impact music has on the residents.",
    },
  },
  {
    id: "jonathan-founder",
    img: jonathanRaymond,
    name: "Jonathan Raymond",
    title: "Board Executive",
    content: {
      content1: "Jonathan Raymond is a senior undergraduate student at the University of Illinois Urbana-Champaign, pursuing a Bachelor of Science in Chemistry. He has played piano since the age of four and picked up trumpet at ten. When Jonathan isn’t at the bench doing research, he loves to take time to play in jazz bands around campus and compose music.",
    },
  },
  {
    id: "justin-founder",
    img: justinKim,
    name: "Justin Kim",
    title: "Board Executive",
    content: {
      content1: "Justin Kim is a senior undergraduate student at Colby College studying neuroscience. He plays classical piano and jazz saxophone, and loves to play in ensembles. At C4C, Justin is particularly interested in the mentorship aspect of music education, eager to give back the same inspiring guidance that he once received from his mentors.",
    },
    lastOfficer: true,
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