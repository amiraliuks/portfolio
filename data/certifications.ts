export interface Certification {
  id: number;
  title: string;
  href?: string;
  live?: string;
  course?: string;
  certificateOne?: string;
  certificateTwo?: string;
  badgeImage?: string;
  createdAt: string; // DD-MM-YYYY
  description: string;
  skills: string[];
  credlyBadge?: string;
  badge: string[];
}

const certifications: Certification[] = [
  {
    id: 1,
    title: 'NDG LINUX UNHATCHED ENGLISH 0723B CGA',
    course: 'https://www.netacad.com/courses/linux-unhatched?courseLang=en-US',
    certificateOne: '/certifications/pdfs/ndg-linux-unhatched-certificate-cisco.pdf',
    certificateTwo: '/certifications/pdfs/ndg-linux-unhatched-certificate-ndg.pdf',
    badgeImage: '/certifications/badges/ndg-linux-unhatched.jpg',
    createdAt: '30-07-2023', // DD-MM-YYYY
    description:
      'Introductory Linux course covering the fundamentals. Gained practical experience using the Linux terminal to perform system tasks and understand open-source operating systems.',
    skills: [
      'Linux basics & open-source concepts',
      'Terminal navigation',
      'File and directory operations',
      'User and group management',
      'Permissions and ownership',
      'Basic shell commands',
      'System information & monitoring tools'
    ],
    badge: [
      'Linux',
      'CLI',
      'File System Navigation',
      'User Management',
      'Permissions Management',
      'Shell Basics'
    ],
  },
  {
    id: 2,
    title: 'Introduction to Cybersecurity',
    course: 'https://www.netacad.com/courses/introduction-to-cybersecurity?courseLang=en-US',
    certificateOne: '/certifications/pdfs/introduction-to-cybersecurity-badge-cisco.pdf',
    credlyBadge: 'https://www.credly.com/badges/0af3c054-436a-4ad2-8d92-b0f821a9c982',
    badgeImage: '/certifications/badges/introduction-to-cybersecurity.png',
    createdAt: '15-06-2024', // DD-MM-YYYY
    description:
      'Introductory cybersecurity course covering foundational concepts such as threat types, attack vectors, security principles, and the importance of protecting data and systems in a connected world. Gained insight into cybersecurity careers, defensive strategies, and best practices for safeguarding devices, networks, and personal information.',
    skills: [
      'Understanding threat types & attack vectors',
      'Cybersecurity principles(CIA triad, risk, vulnerabilities)',
      'Identifying malware, phishing & social engineering attacks',
      'Fundamentals of network security & secure communication',
      'Data protection strategies & password best practices',
      'Basics of cryptography & authentication',
      'Security policies, compliance & personal digital safety',
      'Career paths & roles in cybersecurity'
    ],
    badge: [
      'Cybersecurity Fundamentals',
      'Threat Awareness',
      'Network Security Basics',
      'Social Engineering Awareness',
      'Data Protection',
      'Authentication',
      'Cryptography Basics',
      'Security Best Practices'
    ],
  },
  {
    id: 3,
    title: 'Python Essentials 1',
    course: 'https://www.netacad.com/courses/python-essentials-1?courseLang=en-US',
    certificateOne: '/certifications/pdfs/python-essentials-1-cisco.pdf',
    credlyBadge: 'https://www.credly.com/badges/1818d3e8-ed4c-4a1c-9912-658209271ec6',
    badgeImage: '/certifications/badges/python-essentials-i.png',
    createdAt: '01-01-2025', // DD-MM-YYYY
    description:
      'Introductory Python programming course covering core concepts such as syntax, control flow, functions, and fundamental data types. Completed hands-on exercises focused on writing clean, logical code and understanding how Python executes statements, handles errors, and structures programs.',
    skills: [
      'Python syntax & language fundamentals',
      'Variables, operators & data types',
      'Conditional statements & loops',
      'Functions & modular code structure',
      'Basic error handling & debugging',
      'Working with strings, lists, and dictionaries',
      'Algorithmic thinking & problem-solving',
      'Writing simple CLI-based programs'
    ],
    badge: [
      'Python',
      'Control Flow',
      'Functions',
      'Data Types',
      'Debugging',
      'Scripting',
      'Problem Solving',
      'CLI Programs'
    ],
  },
  {
    id: 4,
    title: 'IT Customer Support Basics',
    course: 'https://www.netacad.com/courses/it-customer-support-basics?courseLang=en-US',
    certificateOne: '/certifications/pdfs/IT-Customer-Support-Basics-Certificate.pdf',
    credlyBadge: 'https://www.credly.com/badges/326f59f3-0d8c-4cb1-8896-d95c7b6faf8e',
    badgeImage: '/certifications/badges/it-customer-support-basics.png',
    createdAt: '31-08-2025', // DD-MM-YYYY
    description:
      'Introductory course on IT Customer Support covering help desk operations, troubleshooting workflows, and effective customer communication. Gained hands-on experience using remote support tools, documenting issues, and resolving problems across diverse computing environments. Built foundational skills essential for delivering professional, reliable end-user support.',
    skills: [
      'Help desk operations & ticket management',
      'Remote support tools(screen sharing, diagnostics, logging)',
      'Troubleshooting user issues across OS and device types',
      'Professional communication & customer interaction',
      'Issue documentation & escalation procedures',
      'Basic hardware / software problem resolution',
      'Time management & prioritizing support tasks',
      'Service - level awareness & support best practices'
    ],
    badge: [
      'Help Desk',
      'Customer Support',
      'Remote Tools',
      'Troubleshooting',
      'Ticketing',
      'Communication',
      'Issue Management',
      'Support Workflow'
    ],
  },
  {
    id: 5,
    title: 'Operating Systems Support',
    course: 'https://www.netacad.com/courses/operating-systems-support?courseLang=en-US',
    certificateOne: '/certifications/pdfs/Operating-Systems-Support-Certificate.pdf',
    credlyBadge: 'https://www.credly.com/badges/0643c0dd-ef4e-4043-bd1c-c1693b0e7803',
    badgeImage: '/certifications/badges/operating-systems-support.png',
    createdAt: '09-09-2025', // DD-MM-YYYY
    description:
      'Foundational course on Operating Systems Support covering troubleshooting for Windows, macOS, and mobile platforms. Gained practical experience diagnosing software crashes, boot failures, performance issues, and connectivity problems. Built strong skills in software installation, system configuration, customer support, and ensuring cross-platform compatibility — preparing for entry-level IT support roles..',
    skills: [
      'Windows, macOS, and mobile OS troubleshooting',
      'Diagnosing software crashes & boot issues',
      'Network and application connectivity support',
      'Software installation, updates & system configuration',
      'Cross-platform compatibility awareness',
      'Performance tuning & system optimization',
      'User account & permissions management',
      'Customer service & helpdesk communication'
    ],
    badge: [
      'Windows Support',
      'macOS Support',
      'Mobile OS Support',
      'Software Troubleshooting',
      'System Configuration',
      'Connectivity Issues',
      'User Support',
      'OS Optimization'
    ],
  },
  {
    id: 6,
    title: 'Security and Connectivity Support',
    course: 'https://www.netacad.com/courses/security-connectivity-support?courseLang=en-US',
    certificateOne: '/certifications/pdfs/Security-and-Connectivity-Support-Certificate.pdf',
    credlyBadge: 'https://www.credly.com/badges/6daf4e9b-71a9-461e-87a7-bd86c59aedca',
    badgeImage: '/certifications/badges/security-and-connectivity-support.png',
    createdAt: '10-09-2025', // DD-MM-YYYY
    description:
      'Introductory course centered on troubleshooting network and device connectivity issues while applying essential cybersecurity practices. Gained experience identifying common security threats, recognizing social engineering attempts, and implementing basic data protection policies. Developed practical skills in securing network resources, supporting end users, and ensuring reliable, safe IT operations.',
    skills: [
      'Network connectivity troubleshooting',
      'Diagnosing device and resource access issues',
      'Identifying malware and common cyber threats',
      'Recognizing phishing & social engineering tactics',
      'Applying basic data protection & access control policies',
      'Securing user accounts and authentication processes',
      'Safe browsing, endpoint protection & password hygiene',
      'Supporting users while maintaining security best practices'
    ],
    badge: [
      'Networking',
      'Cybersecurity Basics',
      'Threat Identification',
      'Social Engineering Awareness',
      'Data Protection',
      'Access Control',
      'Endpoint Security',
      'Troubleshooting'
    ],
  },
  {
    id: 7,
    title: 'Hardware and Upgrade Support',
    course: 'https://www.netacad.com/courses/hardware-upgrade-support?courseLang=en-US',
    certificateOne: '/certifications/pdfs/Hardware-and-Upgrade-Support-Certificate.pdf',
    credlyBadge: 'https://www.credly.com/badges/f8e0b6e3-4ef0-4ae2-8652-870ba9a1dc17',
    badgeImage: '/certifications/badges/hardware-and-upgrade-support.png',
    createdAt: '11-09-2025', // DD-MM-YYYY
    description:
      'Focused on diagnosing, repairing, and upgrading computer components. Gained hands-on experience troubleshooting hardware issues such as power supply and hard drive failures, performing system upgrades including RAM and storage installations, and following proper safety procedures. Developed foundational skills in PC maintenance and hardware optimization for entry-level IT support roles.',
    skills: [
      'Identifying and diagnosing common hardware failures',
      'Power supply, motherboard, and storage troubleshooting',
      'RAM installation and configuration',
      'HDD/SSD installation, cloning, and data migration',
      'Peripheral and component compatibility checks',
      'System cleanup, thermal maintenance & cable management',
      'Safety procedures & ESD protection',
      'Basic hardware optimization and performance tuning'
    ],
    badge: [
      'Hardware Diagnostics',
      'PC Maintenance',
      'Troubleshooting',
      'RAM Installation',
      'Storage Installation',
      'ESD Safety',
      'System Upgrades',
      'Component Compatibility'
    ],
  },
];

export { certifications };