import {
  FaJs, FaReact, FaGithub, FaWindows, FaLinux, FaPython
} from 'react-icons/fa';
import { FaUnity } from "react-icons/fa6";
import { TbBrandCSharp } from "react-icons/tb";
import {
  SiGnubash,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,

  SiPostman,
  SiDocker,

  SiBlender,

  SiMysql,
  SiMongodb,
  SiPostgresql,

  SiShadcnui,

  SiKalilinux
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { DiVisualstudio } from "react-icons/di";

export const operatingSystems = [
  {
    name: 'Windows',
    description: 'Primary environment for pretty much everything',
    icon: <FaWindows className="text-blue-400 text-4xl" />,
  },
  {
    name: 'Linux',
    description: 'Used for server environments, scripting, automation, and penetration testing labs',
    icon: <FaLinux className="text-neutral-400 text-4xl" />,
  },
  {
    name: 'Kali Linux',
    description: 'Used for CTF challenges, vulnerability testing, and exploitation labs',
    icon: <SiKalilinux className=" text-4xl" />,
  },
]

export const webdev = [
  {
    name: 'C#',
    description: 'Build backend services, desktop tools, and Unity gameplay systems',
    icon: <TbBrandCSharp className="text-blue-400 text-4xl" />,
  },
  {
    name: 'Python',
    description: 'Build automation scripts, security tools, and backend logic for applications',
    icon: <FaPython className="text-blue-400 text-4xl" />,
  },
  {
    name: 'Bash',
    description: "Automate Linux tasks, reconnaissance workflows, and system operations",
    icon: <SiGnubash className="text-neutral-50 text-4xl" />,
  },
  {
    name: 'JavaScript',
    description: 'Build browser features, extension logic, and client-side interactions',
    icon: <FaJs className="text-yellow-400 text-4xl" />,
  },
  {
    name: 'TypeScript',
    description: 'Use type safety across full-stack apps to reduce runtime bugs',
    icon: <SiTypescript className="text-blue-400 text-3xl" />,
  },
  {
    name: 'ReactJS',
    description: 'Build modern, interactive frontends with reusable components and API integration',
    icon: <FaReact className="text-sky-400 text-4xl" />,
  },
  {
    name: 'NextJS',
    description: 'Develop full-stack applications with SSR, API routes, and dynamic content',
    icon: <SiNextdotjs className="text-foreground text-4xl" />,
  },
  {
    name: 'Tailwind CSS',
    description: 'Style interfaces quickly with utility-first patterns and consistent design',
    icon: <SiTailwindcss className="text-cyan-500 dark:text-cyan-400 text-4xl" />,
  },
  {
    name: 'Shadcn UI',
    description: 'Compose accessible UI primitives fast and customize them for production',
    icon: <SiShadcnui className="text-cyan-500 dark:text-cyan-400 text-4xl" />,
  },
  {
    name: 'ExpressJS',
    description: 'Build lightweight APIs, auth flows, and integration endpoints',
    icon: <SiExpress className="text-gray-800 dark:text-gray-400 text-4xl" />,
  },
];

export const gamedev = [
  {
    name: 'Unity',
    description: 'Prototype and build gameplay systems, mechanics, and game tooling',
    icon: <FaUnity className="text-gray-400 text-4xl" />,
  },
  {
    name: 'Blender',
    description: '3D modeling & asset rendering',
    icon: <SiBlender className="text-orange-400 text-3xl" />,
  }
];

export const tools = [
  {
    name: 'Visual Studio',
    description: 'Use for C# and Unity development with strong debugging workflows',
    icon: <DiVisualstudio className="text-purple-500 text-4xl" />,
  },
  {
    name: 'VS Code',
    description: 'Primary editor for web apps, scripts, and fast day-to-day iteration',
    icon: <VscVscode className="text-blue-500 text-4xl" />,
  },
  {
    name: 'Git & GitHub',
    description: 'Version control, collaboration, and CI/CD workflow management',
    icon: <FaGithub className="text-gray-800 dark:text-gray-400 text-4xl" />,
  },
  {
    name: 'Postman',
    description: 'Test and debug REST APIs during backend development',
    icon: <SiPostman className="text-orange-500 text-4xl" />,
  }
];

export const database = [
  {
    name: 'MySQL',
    description: 'Design relational schemas and query structured app data',
    icon: <SiMysql className="text-white-500 text-4xl" />,
  },
  {
    name: 'MongoDB',
    description: 'Store flexible document data for fast-moving application features',
    icon: <SiMongodb className="text-green-500 text-4xl" />,
  },
  {
    name: 'PostgreSQL',
    description: 'Run production backends with strong relational models and query performance',
    icon: <SiPostgresql className="text-blue-400 text-4xl" />,
  },
];

export const devops = [
  {
    name: 'Docker',
    description: 'Containerize applications and replicate development environments',
    icon: <SiDocker className="text-blue-400 text-4xl" />,
  }
];
