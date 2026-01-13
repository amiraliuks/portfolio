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
    description: 'Primary OS for development & productivity',
    icon: <FaWindows className="text-blue-400 text-4xl" />,
  },
  {
    name: 'Linux',
    description: 'Versatile open-source system for development, automation, and server environments',
    icon: <FaLinux className="text-neutral-400 text-4xl" />,
  },
  {
    name: 'Kali Linux',
    description: 'Advanced Penetration Testing Linux distribution',
    icon: <SiKalilinux className=" text-4xl" />,
  },
]

export const webdev = [
  {
    name: 'C#',
    description: 'General-purpose, high-level programming Language',
    icon: <TbBrandCSharp className="text-blue-400 text-4xl" />,
  },
  {
    name: 'Python',
    description: 'General-purpose, high-level programming Language',
    icon: <FaPython className="text-blue-400 text-4xl" />,
  },
  {
    name: 'Bash Scripting',
    description: "Windows' ancient scripting format",
    icon: <SiGnubash className="text-neutral-50 text-4xl" />,
  },
  {
    name: 'Shell Scripting',
    description: 'Linux/Unix shell scripting',
    icon: <SiGnubash className="text-blue-50 text-4xl" />,
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
    description: 'A JavaScript Library',
    icon: <FaReact className="text-sky-400 text-4xl" />,
  },
  {
    name: 'NextJS',
    description: 'React Framework',
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
    description: 'Version Control',
    icon: <FaGithub className="text-gray-800 dark:text-gray-400 text-4xl" />,
  },
  {
    name: 'Postman',
    description: 'API Testing',
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
    description: 'Containerization',
    icon: <SiDocker className="text-blue-400 text-4xl" />,
  }
];