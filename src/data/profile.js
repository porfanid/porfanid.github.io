// Edit this file to update the content shown on the site.
//
// NOTE: public repos/stars/followers, skill bars, projects, and the
// experience/education timeline are now fetched LIVE from the GitHub and
// ORCID public APIs (see src/hooks/useGithubData.js and useOrcidData.js).
// This file only holds things those APIs can't provide: your narrative bio,
// links, the quote, and the "what I do" cards. `githubUsername` and
// `orcidId` below are what drive the live data — change them if needed.

export const githubUsername = "porfanid";
export const orcidId = "0000-0002-7891-1977";

export const profile = {
  name: "Pavlos Orfanidis",
  handle: "porfanid",
  tagline: "Software Developer based in Ioannina, Greece",
  quote: "\u201CEverything is possible. The impossible just takes longer.\u201D \u2014 Dan Brown, Digital Fortress",
  location: "Ioannina, Greece",
  affiliation: "University of Ioannina",
  avatar: "https://avatars.githubusercontent.com/u/19299306?v=4",
  links: {
    github: "https://github.com/porfanid",
    linkedin: "https://www.linkedin.com/in/porfanid/",
    website: "https://orfanidis.net.gr",
    orcid: "https://orcid.org/0000-0002-7891-1977",
    stackoverflow: "https://stackoverflow.com/users/20788904/pavlos-orfanidis",
    kofi: "https://ko-fi.com/porfanid",
    cvEn: "https://porfanid.github.io/CV_EN.pdf",
    cvGr: "https://porfanid.github.io/CV_GR.pdf",
  },
  about: `I've worked across a lot of different languages over the years. I started with Fortran, because
    that's what my father could teach me, then moved into bash, HTML, CSS and JavaScript when I built my
    first website back in junior high — mostly because I wanted the server to update itself without me
    doing it by hand. From there I picked up building apps on .NET, and at the University of Ioannina I
    was taught Python, Java and C (with some C++ on the side), plus enough PHP to make university
    life a bit easier. I also learned Haskell and Prolog, though neither stuck the way the others did.`,

  // Short teaser shown in the hero — keep this to a line or two, the full story lives in `about` below.
  heroBlurb:
    "I build things end to end, from backend services to the interfaces on top, and I like picking things apart to see how they work.",

  // Used only if the live GitHub language stats can't be fetched (offline / rate-limited)
  // and there's no cached copy yet.
  fallbackSkills: [
    { name: "Python", value: 90 },
    { name: "Java", value: 85 },
    { name: "JavaScript", value: 80 },
    { name: "C / C++", value: 70 },
  ],

  // Used only if the live ORCID timeline can't be fetched and there's no cached copy yet.
  fallbackTimeline: [
    {
      type: "Education",
      title: "BSc Computer Science",
      org: "University of Ioannina",
      period: "",
      description:
        "Coursework spanning Python, Java, C/C++, PHP, Haskell and Prolog, alongside systems and applied projects.",
    },
  ],

  // "What I do" cards, replacing the template's agency service list
  services: [
    {
      icon: "mdi-language-python",
      color: "purple",
      title: "Backend & Tooling",
      text: "Python and Java services, automation, and scripts that remove manual, repetitive work.",
    },
    {
      icon: "mdi-web",
      color: "danger",
      title: "Web Development",
      text: "React front ends and full-stack apps, from static sites to interactive tools like QuestMatch.",
    },
    {
      icon: "mdi-source-branch",
      color: "warning",
      title: "Open Source",
      text: "Contributing to and maintaining public repositories, with an emphasis on clean, reproducible builds.",
    },
    {
      icon: "mdi-shield-key-outline",
      color: "blue",
      title: "Systems & Security",
      text: "Comfortable working close to the OS \u2014 bash, servers, and verifying things like commit signatures.",
    },
    {
      icon: "mdi-function-variant",
      color: "primary",
      title: "Algorithms",
      text: "Implementing classic algorithms from research, such as Hertel & Mehlhorn's fast polygon triangulation.",
    },
    {
      icon: "mdi-account-group-outline",
      color: "pink",
      title: "Community Projects",
      text: "Building tools for real communities \u2014 like the website for the Scouts of Ioannina.",
    },
  ],

  // Used only if the live GitHub repo list can't be fetched and there's no cached copy yet.
  fallbackProjects: [
    {
      name: "QuestMatch",
      tag: "JavaScript",
      description: "A Dungeons & Dragons group finder app for matching players and parties.",
      url: "https://github.com/porfanid/QuestMatch",
      stars: 4,
    },
    {
      name: "Scout-Website",
      tag: "JavaScript",
      description: "The website built for the Scouts of Ioannina.",
      url: "https://github.com/porfanid/Scout-Website",
      stars: 1,
    },
    {
      name: "Fast-Triangulation-Of-The-Plane",
      tag: "Python \u00b7 Archived",
      description:
        "Python implementation of Hertel & Mehlhorn's O(n + s log s) fast triangulation algorithm for simple polygons.",
      url: "https://github.com/porfanid/Fast-Triangulation-Of-The-Plane",
      stars: 1,
    },
  ],

  // Used only if the live GitHub stats can't be fetched and there's no cached copy yet.
  fallbackStats: [
    { label: "Public Repositories", value: "91+" },
    { label: "Followers", value: "20" },
    { label: "Stars Earned", value: "14" },
    { label: "Original Projects", value: "60+" },
  ],
};
