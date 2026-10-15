import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa'

// ─────────────────────────────────────────────────────────────
//  ALL portfolio content lives here. Edit once, both the 3D tour
//  and the 2D version update.
// ─────────────────────────────────────────────────────────────

export const PROFILE = {
  name: 'Jagdish Chandra Belwal',
  shortName: 'Jagdish Belwal',
  role: 'Frontend Developer',
  tagline:
    'A Passionate Frontend Developer crafting high-performance web & mobile applications using React.js and React Native.',
  resume:
    'https://drive.google.com/file/d/1sg01yAtdSV0ftqA0uSJpUH7ommP80dc9/view?usp=drivesdk',
}

export const ABOUT = {
  before:
    "I'm a Frontend Developer based in Gurgaon, India, currently working at ",
  company: 'Unbullishable',
  after:
    '. I specialize in modern UI/UX development using React and React Native for both web and mobile platforms.',
  second:
    'With a B.Tech degree in Computer Science and a passion for intuitive interfaces, I aim to build fast, scalable, and accessible applications.',
}

export const SKILLS = [
  {
    title: 'Frontend',
    color: '#ea580c',
    skills: ['React.js', 'React Native', 'HTML5 / CSS3', 'JavaScript', 'Backend Integration'],
  },
  {
    title: 'Development Tools',
    color: '#0284c7',
    skills: ['Visual Studio Code', 'Android Studio', 'XCode'],
  },
  {
    title: 'Relevant Skills',
    color: '#15803d',
    skills: ['Git / GitHub', 'SEO Basics', 'Code Debugging'],
  },
]

export const EXPERIENCE = [
  {
    title: 'Frontend Developer – Unbullishable',
    period: 'Aug 2024 – Present',
    tasks: [
      'Developed License Manager UI using React.js',
      'Created cross-platform shopping app using React Native',
      'Integrated REST APIs and built reusable UI modules',
    ],
  },
  {
    title: 'Software Development Intern – Cairovision',
    period: 'Jul 2023 – Aug 2023',
    tasks: [
      'Built responsive websites with HTML, CSS, JavaScript',
      'Worked with Node.js, Express.js, and MongoDB',
    ],
  },
]

export const PROJECTS = [
  {
    title: '🛒 ScannyCloset Shopping Website',
    description:
      'MERN stack shopping platform with cart, authentication, MongoDB backend.',
  },
  {
    title: '💃 Dance Learning Website',
    description:
      'HTML, CSS, JS based responsive site for interactive dance tutorials.',
  },
]

export const EDUCATION = [
  {
    degree: 'B.Tech – Computer Science',
    institution: 'GRD Institute of Management and Technology – 75% (2024)',
  },
  {
    degree: 'Intermediate',
    institution: 'Board of School Education Uttarakhand – 75% (2019)',
  },
]

export const CONTACT_INTRO =
  "I'm always open to discussing new projects, freelance work, or joining creative teams."

export const CONTACT = [
  {
    key: 'email',
    label: 'Email',
    value: 'jaggibelwal2002@gmail.com',
    href: 'mailto:jaggibelwal2002@gmail.com',
    Icon: FaEnvelope,
    color: '#ea580c',
  },
  {
    key: 'phone',
    label: 'Phone',
    value: '+91 96673 09616',
    href: 'tel:+919667309616',
    Icon: FaPhone,
    color: '#16a34a',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    value: 'Jagdish Chandra Belwal',
    href: 'https://www.linkedin.com/in/jagdish-chandra-belwal-76981929b',
    Icon: FaLinkedin,
    color: '#0a66c2',
  },
  {
    key: 'github',
    label: 'GitHub',
    value: 'github.com',
    href: 'https://github.com/',
    Icon: FaGithub,
    color: '#24292f',
  },
]

// ─────────────────────────────────────────────────────────────
//  The tour: one stop per room. Aria says `line` when she arrives.
// ─────────────────────────────────────────────────────────────

export const ROOM_SPACING = 18

const RAW_STOPS = [
  {
    id: 'intro',
    label: 'Reception',
    line: "Welcome to Jagdish's studio! He's a frontend developer who builds fast React and React Native apps. Let me show you around.",
  },
  {
    id: 'about',
    label: 'Meeting Room',
    line: "This is our meeting room. Jagdish is based in Gurgaon and loves building intuitive, accessible interfaces. Here's a little about him.",
  },
  {
    id: 'skills',
    label: 'Skills Lab',
    line: "Welcome to the Skills Lab! These are the tools and technologies he works with every day.",
  },
  {
    id: 'experience',
    label: 'Office Floor',
    line: "This is where the real work happens. Here's a look at where Jagdish has worked and what he's built.",
  },
  {
    id: 'projects',
    label: 'Gallery',
    line: "Our gallery! A couple of the projects Jagdish has built, hung up for you to see.",
  },
  {
    id: 'education',
    label: 'Library',
    line: "And the library, where it all started. This is Jagdish's education.",
  },
  {
    id: 'contact',
    label: 'Contact Desk',
    line: "That's the end of the tour! Jagdish would love to hear from you, so say hi using any of these.",
  },
]

export const STOPS = RAW_STOPS.map((s, i) => ({
  ...s,
  pos: [i * ROOM_SPACING, 0, i % 2 === 1 ? -7 : 0],
}))

// Where Aria stands inside a room (relative to the room centre)
export const HOST_OFFSET = [-4.4, 0, 1.5]
