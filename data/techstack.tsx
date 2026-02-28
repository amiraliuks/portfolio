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
    description: 'Develop backend systems, game logic in Unity, and ASP.NET-based applications',
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
    description: 'Languages of the web',
    icon: <FaJs className="text-yellow-400 text-4xl" />,
  },
  {
    name: 'TypeScript',
    description: 'JavaScript with Types',
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
    description: 'CSS Frameworks',
    icon: <SiTailwindcss className="text-cyan-500 dark:text-cyan-400 text-4xl" />,
  },
  {
    name: 'Shadcn UI',
    description: 'CSS Frameworks',
    icon: <SiShadcnui className="text-cyan-500 dark:text-cyan-400 text-4xl" />,
  },
  {
    name: 'ExpressJS',
    description: 'Web Framework for Node.js',
    icon: <SiExpress className="text-gray-800 dark:text-gray-400 text-4xl" />,
  },
];

export const gamedev = [
  {
    name: 'Unity',
    description: 'Game Engine',
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
    description: 'Integrated Development Environment (IDE) ',
    icon: <DiVisualstudio className="text-purple-500 text-4xl" />,
  },
  {
    name: 'VS Code',
    description: 'Code Editor',
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
    description: 'Relational Database',
    icon: <SiMysql className="text-white-500 text-4xl" />,
  },
  {
    name: 'MongoDB',
    description: 'NoSQL Database',
    icon: <SiMongodb className="text-green-500 text-4xl" />,
  },
  {
    name: 'PostgreSQL',
    description: 'Relational Database',
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