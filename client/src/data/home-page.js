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
  stevenson,
  shslogo,
  ucsbcon1,
  ucsbcon2,
  nwcon1,
  colbycon1,
  nwcon2,
  nwcon3,

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
    title: "Leadership",
  },
  {
    id: "chapters",
    title: "Chapters",
    dropdown: true,
  },
  {
    id: "tools",
    title: "Tools",
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
    value: "500+",
    img: connection,
    firstStat: true,
  },
  {
    id: "stats-2",
    title: "of instruments donated to underserved communities",
    value: "$50,000+",
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
    id: "merion-event",
    picture: nwcon2, 
    name: "Pearl of Evanston Concert",
    title: "C4C Northwestern - June 5th, 2024",
    schoolLogo: northwestern,
    instagramUrl: "https://www.instagram.com/p/C72Ycjvv2Ta/?img_index=1",
  },
  {
    id: "heritage-ucsb",
    picture: ucsbcon1,
    name: "Heritage House Concert",
    title: "C4C UCSB - June 2nd, 2024",
    schoolLogo: ucsb,
    instagramUrl: "https://www.instagram.com/p/C7vIn28BoNl/?img_index=1",
    
  },
  {
    id: "pearl-event",
    picture: nwcon1, 
    name: "Merion Concert",
    title: "C4C Northwestern - May 27th, 2024",
    schoolLogo: northwestern,
    instagramUrl: "https://www.instagram.com/p/C7fQtd_vSHG/",
    
  },
  {
    id: "wic-presentation-event",
    picture: colbycon1,
    name: "Colby Student and Mentor Concert",
    title: "C4C Colby - May 10th, 2024",
    schoolLogo: colby2,
    instagramUrl: "https://www.instagram.com/colbyideas/",
   
  },

  {
    id: "blenders-fundraiser-event",
    picture: ucsbcon2, 
    name: "Blenders Fundraiser Event",
    title: "C4C UCSB - May 7th, 2024",
    schoolLogo: ucsb,
    instagramUrl: "https://www.instagram.com/p/C6rv5OmhHiD/",
   
  },

  {
    id: "pearl-event-2",
    picture: nwcon3, 
    name: "Pearl of Evanston Concert",
    title: "C4C Northwestern - May 5th, 2024",
    schoolLogo: northwestern,
    instagramUrl: "https://www.instagram.com/p/C7fQtd_vSHG/",
    
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

export const executiveBoard = [
  {
    id: "kiran-executive",
    img: kiranMohan,
    name: "Kiran Mohan",
    title: "",
    content: {
      content1: "Kiran Mohan is a senior undergraduate student at Harvard University, pursuing a Bachelor of Arts in History of Science with a secondary in Global Health & Health Policy. Kiran is particularly interested in how music can affect the brain and has conducted research at Northwestern University and Harvard University. Kiran has played a variety of instruments, including the piano, oboe, English horn and alto saxophone. In addition to pursuing performance opportunities on campus, he has taken several courses at Harvard on how music can shape culture. Kiran's favorite musical memory has been organizing Crescendo for a Cause assisted living facility concerts and seeing the impact music has on the residents.",
    },
  },
  {
    id: "jonathan-executive",
    img: jonathanRaymond,
    name: "Jonathan Raymond",
    title: "",
    content: {
      content1: "Jonathan Raymond is a recent graduate if the University of Illinois Urbana-Champaign, with a Bachelor of Science in Chemistry. He has played piano since the age of four and picked up trumpet at ten. When Jonathan isn’t at the bench doing research, he loves to take time to play in jazz bands around campus and compose music. Some of his favorite musicians and composers consist of Chick Corea, Oscar Peterson, Tito Carrillo and Frédéric Chopin. Jonathan's favorite musical memories are during his two summers in the Birch Creek Music Performance Center, Summer Music Academy Jazz Program, and performing in the 2020 Illinois Music Education Association All-State Honors Jazz Ensemble. Jonathan will shortly be joining the lab of Diana Bianchi as an IRTA Postbac at the National Institutes of Health.",
    },
  },
  {
    id: "justin-executive",
    img: justinKim,
    name: "Justin Kim",
    title: "",
    content: {
      content1: "Justin Kim is a senior undergraduate student at Colby College studying neuroscience. He plays classical piano and jazz saxophone, and loves to play in ensembles. He is currently a saxophonist in the Colby Wind Ensemble and a solo pianist at Colby. Justin is particularly interested in addressing the disparities in music education by working closely with local communities. Growing up as a low-income immigrant, he understands how difficult it can be to access music. Now, he is excited to provide the same inspiration he’s received throughout his musical journey to spread the joy of music.",
    },
    lastOfficer: true,
  },
];


// home-page.js
export const chapters = [
  {
    id: "colby-chapter",
    picture: colby,
    name: "Colby College",
    link: "/chapters/colby"
  },
  {
    id: "harvard-chapter",
    picture: harvard,
    name: "Harvard University",
    link: "/chapters/harvard"
  },
  {
    id: "northwestern-chapter",
    picture: northwestern,
    name: "Northwestern University",
    link: "/chapters/northwestern"
  },
  {
    id: "ucsb-chapter",
    picture: ucsb,
    name: "University of California, Santa Barbara",
    link: "/chapters/ucsb"
  },
  {
    id: "stevenson-chapter",
    picture: stevenson,
    name: "Stevenson High School",
    link: "/chapters/stevenson"
  },
];


export const tools = [
  {id: "matching", name: "Mentor-Mentee Matching", link: '/mentor-mentee-matching'},
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