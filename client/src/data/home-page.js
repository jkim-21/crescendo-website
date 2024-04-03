import { 
  instrumentDonation,
  nursingPerformance,
  donationRecipient,
  c4cDonation,

  connection,
  instrument,
  performance,

  financeEvent,
  wimEvent,
  merionEvent, 
  truleeEvent,
  musubiEvent, 
  heritageEvent,
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
    id: "instrument-donation-slide",
    picture: instrumentDonation,
    name: "Instrument Drive",
  },
  {
    id: "nursing-performance-slide",
    picture: nursingPerformance,
    name: "Nursing Concert",    
  },
  {
    id: "donation-recipient-slide",
    picture: donationRecipient, 
    name: "Donation Recipient",    
  },
  {
    id: "instrument-funding-slide",
    picture: c4cDonation, 
    name: "C4C Donation",
  },
];

export const stats = [
  {
    id: "stats-1",
    title: "K-12 Students in our coast-to-coast programs",
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
    id: "finance-equity-event",
    picture: financeEvent,
    name: "Finance Equity Presentation",
    title: "C4C Colby",
    schoolLogo: colby2,
    instagramUrl: "https://www.instagram.com/colbyideas/",
    
  },
  {
    id: "trulee-event",
    picture: truleeEvent, 
    name: "Trulee Concert",
    title: "C4C Northwestern",
    schoolLogo: northwestern,
    instagramUrl: "https://www.instagram.com/northwestern.c4c/",
    
  },
  {
    id: "wic-presentation-event",
    picture: wimEvent,
    name: "Women in Music Presentation",
    title: "C4C Colby",
    schoolLogo: colby2,
    instagramUrl: "https://www.instagram.com/colbyideas/",
   
  },

  {
    id: "spam-fundraiser-event",
    picture: musubiEvent, 
    name: "Spam Musubi Fundraiser",
    title: "C4C UCSB",
    schoolLogo: ucsb,
    instagramUrl: "https://www.instagram.com/crescendo.ucsb/",
   
  },

  {
    id: "heritage-event",
    picture: heritageEvent,
    name: "Heritage Concert",
    title: "C4C UCSB",
    schoolLogo: ucsb,
    instragramUrl: "https://www.instagram.com/crescendo.ucsb/",
  },

  {
    id: "merion-event",
    picture: merionEvent, 
    name: "Merion Concert",
    title: "C4C Northwestern",
    schoolLogo: northwestern,
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
      content1: "Jonathan Raymond co-founded and serves on the executive board for Crescendo for a Cause. He is a senior undergraduate student at the University of Illinois Urbana-Champaign, pursuing a Bachelor of Science in Chemistry. When Jonathan isn’t at the bench in various research groups at school, he loves to time to play in jazz bands around campus and compose music.",
      content2: "Jonathan has studied the piano since age four and the trumpet since age ten. Some of his favorite musicians and composers consist of Chick Corea, Oscar Peterson, Tito Carrillo and Frédéric Chopin. The work of Clifford Brown is a notable inspiration for Jonathan. His favorite musical memories were during his two summers in the Birch Creek Music Performance Center, Summer Music Academy Jazz Program, and performing in the 2020 Illinois Music Education Association All-State Honors Jazz Ensemble.",
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
    id: "colby-chapter",
    picture: colby,
    name: "Colby College",
    link: "./chapters/colby"

  },
  {
    id: "harvard-chapter",
    picture: harvard,
    name: "Harvard University",
    link: "./chapters/harvard"
  },
  {
    id: "northwestern-chapter",
    picture: northwestern,
    name: "Northwestern University",
    link: "./chapters/northwestern"
  },
  {
    id: "ucsb-chapter",
    picture: ucsb,
    name: "University of California, Santa Barbara",
    link: "./chapters/ucsb"
  },
  {
    id: "uiuc-chapter",
    picture: uiuc,
    name: "University of Illinois Urbana-Champaign",
    link: "./chapters/uiuc"
  },
  {
    id: "stevenson-chapter",
    picture: stevenson,
    name: "Stevenson High School",
    link: "./chapters/stevenson"
  },
];