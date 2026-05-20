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

type CertificationCategory = 'professional' | 'ctf';

const CTF_CLASSIFICATION_REGEX = /ctf|capture the flag|advent of cyber|cybersecurity competition/i;

function getCertificationCategory(certification: Certification): CertificationCategory {
  const classificationBlob = [
    certification.title,
    certification.description,
    certification.course ?? '',
    ...certification.badge,
  ]
    .join(' ')
    .toLowerCase();

  return CTF_CLASSIFICATION_REGEX.test(classificationBlob) ? 'ctf' : 'professional';
}

const certifications: Certification[] = [
  {
    id: 1,
    title: 'NDG LINUX UNHATCHED ENGLISH 0723B CGA',
    course: 'https://www.netacad.com/courses/linux-unhatched?courseLang=en-US',
    certificateOne: '/certifications/pdfs/professional/ndg-linux-unhatched-certificate-cisco.pdf',
    certificateTwo: '/certifications/pdfs/professional/ndg-linux-unhatched-certificate-ndg.pdf',
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
    certificateOne: '/certifications/pdfs/professional/python-essentials-1-cisco.pdf',
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
    certificateOne: '/certifications/pdfs/professional/IT-Customer-Support-Basics-Certificate.pdf',
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
    certificateOne: '/certifications/pdfs/professional/Operating-Systems-Support-Certificate.pdf',
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
    certificateOne: '/certifications/pdfs/professional/Security-and-Connectivity-Support-Certificate.pdf',
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
    certificateOne: '/certifications/pdfs/professional/Hardware-and-Upgrade-Support-Certificate.pdf',
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

  {
    id: 8,
    title: 'Advent of Cyber 2025',
    course: 'https://tryhackme.com/adventofcyber25',
    certificateOne: '/certifications/pdfs/ctf/THM-1X8DNJ5GVX.pdf',
    credlyBadge: 'https://tryhackme.com/amiraliu/badges/advent-of-cyber-2025?utm_campaign=social_share&utm_medium=social&utm_content=badge&utm_source=copy&sharerId=614a3207b7ceea0048e4a172',
    badgeImage: '/certifications/badges/advent-of-cyber-2025.png',
    createdAt: '15-02-2026', // DD-MM-YYYY
    description:
      'Hands-on cybersecurity Capture The Flag (CTF) experience through TryHackMe Advent of Cyber 2025. Covered offensive and defensive security topics including web exploitation, malware analysis, SOC investigations, cloud security, and threat detection using real-world attack scenarios and practical labs.',
    skills: [
      'Exploitation with cURL',
      'Web Attack Forensics',
      'Phishing Detection',
      'Malware Analysis',
      'AWS Security',
      'Linux CLI',
      'SOC Alert Triage',
      'Password Cracking',
      'Splunk Basics',
      'Network Discovery',
      'Container Escape',
      'IDOR Exploitation',
      'Prompt Injection',
      'Web Log Analysis',
      'Registry Forensics',
      'Social Engineering',
      'AI in Security',
      'CyberChef',
      'ICS/Modbus',
      'YARA Rules',
      'Race Conditions',
      'C2 Detection',
      'Obfuscation'
    ],
    badge: [
      'Web Exploitation',
      'Digital Forensics',
      'Threat Detection',
      'Cloud Security',
      'SOC Analysis',
      'Malware Analysis',
      'Log Analysis',
      'CTF Challenges'
    ],
  },

  {
    id: 9,
    title: 'Pre Security (New)',
    course: 'https://tryhackme.com/path/outline/presecurity',
    certificateOne: '/certifications/pdfs/professional/THM-ZCJSNKYH7I.pdf',
    credlyBadge: 'https://tryhackme.com/certificate/THM-ZCJSNKYH7I',
    badgeImage: '/certifications/badges/presecuritynew.svg',
    createdAt: '22-02-2026', // DD-MM-YYYY
    description:
      'Foundational cybersecurity learning path by TryHackMe covering how computers, networking, operating systems, and the web work from the ground up. Built core knowledge in offensive and defensive security concepts, including the CIA triad, cryptography fundamentals, and attacker vs defender methodologies through guided hands-on labs.',
    skills: [
      'Cybersecurity Fundamentals',
      'Offensive vs Defensive Security',
      'Networking Basics',
      'OSI Model',
      'LAN & Packet Fundamentals',
      'DNS & HTTP',
      'How the Web Works',
      'Computer Hardware Basics',
      'Client-Server Architecture',
      'Virtualisation Fundamentals',
      'Cloud Computing Basics',
      'Windows Fundamentals',
      'Linux CLI Basics',
      'Windows CLI Basics',
      'Operating System Security',
      'Data Encoding & Representation',
      'SQL Basics',
      'Python Basics',
      'JavaScript Basics',
      'CIA Triad',
      'Cryptography Concepts',
      'Attacks vs Defenses Overview'
    ],
    badge: [
      'Cybersecurity Foundations',
      'Networking Fundamentals',
      'Operating Systems Basics',
      'Web Fundamentals',
      'Security Principles',
      'Cryptography Basics',
      'Beginner Security Path'
    ],
  },

  {
    id: 10,
    title: 'Love at First Breach – CTF 2026 (Participation)',
    course: 'https://tryhackme.com/module/lafbctf2026',
    certificateOne: '/certifications/pdfs/ctf/THM-2M2WXJZGB9.pdf',
    credlyBadge: 'https://tryhackme.com/certificate/THM-2M2WXJZGB9',
    badgeImage: '/certifications/badges/love-at-first-breach-ctf.png',
    createdAt: '25-02-2026', // DD-MM-YYYY
    description:
      'Participated in the Love at First Breach 2026 Capture The Flag (CTF) event on TryHackMe, completing challenges across web exploitation, cryptography, and application security. Demonstrated practical vulnerability discovery and exploitation skills in a competitive, real-world scenario format.',
    skills: [
      'Web Application Enumeration',
      'IDOR Exploitation',
      'Local File Inclusion (LFI)',
      'Prompt Injection',
      'Business Logic Vulnerabilities',
      'Hash Manipulation (MD5)',
      'HTTP Parameter Tampering',
      'Basic Cryptography Analysis',
      'Attack Surface Analysis',
      'CTF Methodology'
    ],
    badge: [
      'CTF Competition',
      'CTF Participation',
      'Cybersecurity Competition',
      'Web Exploitation',
      'Application Security',
      'Hands-on Security Labs'
    ],
  },

  {
    id: 11,
    title: 'Love at First Breach – Advanced Track (Completion)',
    course: 'https://tryhackme.com/room/lafbctf2026-advanced',
    certificateOne: '/certifications/pdfs/ctf/THM-ENZIZNKVP1.pdf',
    credlyBadge: 'https://tryhackme.com/certificate/THM-ADV-LAFB-2026',
    badgeImage: '/certifications/badges/love-at-first-breach-ctf.png',
    createdAt: '24-02-2026', // DD-MM-YYYY
    description:
      'Completed the Advanced Track of the Love at First Breach 2026 CTF, solving complex, multi-stage challenges across forensics, red teaming, cloud security, boot2root exploitation, and mobile application analysis. Demonstrated advanced privilege escalation, attack chain reconstruction, and system compromise techniques under constrained conditions.',
    skills: [
      // Forensics
      'Email & Payload Forensics',
      'Malware Analysis',
      'Multi-Stage Attack Chain Investigation',

      // System / Red Team
      'Boot2Root Exploitation',
      'Privilege Escalation (Windows)',
      'RDP Access & Lateral Movement',
      'Restricted Egress Bypass',

      // Web
      'Chained Web Exploits',
      'Advanced Input Manipulation',

      // Cloud
      'Cloud Misconfiguration Exploitation',
      'Cloud Privilege Abuse',

      // Mobile
      'APK Reverse Engineering',
      'API Security Testing'
    ],
    badge: [
      'CTF Competition',
      'CTF Participation',
      'Cybersecurity Competition',
      'Advanced CTF Completion',
      'Red Teaming',
      'Forensics',
      'Cloud Security',
      'Boot2Root',
      'Mobile Security'
    ],
  },

  {
    id: 12,
    title: 'THJCC CTF 2026',
    course: 'https://ctf2026.thjcc.org/',
    certificateOne: '/certifications/pdfs/ctf/THJCCCTF2026.pdf',
    badgeImage: '/certifications/badges/thjcc-2026.png',
    createdAt: '27-02-2026', // DD-MM-YYYY
    description:
      'THJCC CTF 2026 was the first CTF I ever participated in. In this event, I focused only on forensics and steganography challenges to build a practical foundation in those areas.',
    skills: [
      'Forensics',
      'Steganography',
      'First CTF Participation'
    ],
    badge: [
      'CTF Competition',
      'CTF Participation',
      'Cybersecurity Competition'
    ],
  },

  {
    id: 13,
    title: 'ApoorvCTF 2026',
    course: 'https://apoorvctf.iiitkottayam.ac.in/',
    certificateOne: '/certifications/pdfs/ctf/ApoorvCTF2026.pdf',
    badgeImage: '/certifications/badges/ApoorvCTF2026.png',
    createdAt: '06-03-2026', // DD-MM-YYYY
    description:
      'Participated in ApoorvCTF 2026, a Jeopardy-style cybersecurity competition. Worked through challenges across web exploitation, reverse engineering, cryptography, binary analysis, and miscellaneous categories, strengthening practical CTF methodology under time constraints.',
    skills: [
      'Web Exploitation',
      'Cryptography Challenges',
      'Binary Analysis (Pwn)',
      'Reverse Engineering',
      'CTF Methodology',
      'Flag Hunting',
      'Scoreboard Strategy'
    ],
    badge: [
      'CTF Competition',
      'CTF Participation',
      'Cybersecurity Competition'
    ],
  },

  {
    id: 14,
    title: 'VishwaCTF 2026',
    course: 'https://play.vishwactf.com/',
    certificateOne: '/certifications/pdfs/ctf/VishwaCTF2026.pdf',
    badgeImage: '/certifications/badges/VishwaCTF2026.png',
    createdAt: '06-03-2026', // DD-MM-YYYY
    description:
      'Participated in VishwaCTF 2026 as a solo player with a dedicated focus on reverse engineering challenges. This participation followed my Kosovo Cyber Team coach\'s reverse engineering syllabus guidance, with the event used as targeted hands-on practice.',
    skills: [
      'Reverse Engineering',
      'Solo CTF Participation',
      'Challenge Triage',
      'Static and Dynamic Analysis'
    ],
    badge: [
      'CTF Competition',
      'CTF Participation',
      'Cybersecurity Competition'
    ],
  },

  {
    id: 15,
    title: 'BlueHens CTF 2026 (University of Delaware)',
    course: 'https://bluehens.ctfd.io/',
    certificateOne: '/certifications/pdfs/ctf/bluehens_ctf_certificate.pdf',
    badgeImage: '/certifications/badges/BlueHensCTF2026.png',
    createdAt: '19-04-2026', // DD-MM-YYYY
    description:
      'BlueHens CTF 2026 was the first time KSAL Cyber Team got together live at FLOSSK Hacker Space and solved challenges collaboratively in person. We finished in 6th place with 3839 points.',
    skills: [
      'Team Collaboration',
      'Live CTF Coordination',
      'CTF Problem Solving',
      'On-site Communication'
    ],
    badge: [
      'CTF Competition',
      'CTF Participation',
      'Cybersecurity Competition'
    ],
  },

  {
    id: 16,
    title: 'Introduction to Cybersecurity (A.U.K Training and Development Institute)',
    course: 'https://www.netacad.com/courses/introduction-to-cybersecurity?courseLang=en-US',
    certificateOne: '/certifications/pdfs/professional/Introduction_to_Cybersecurity_RIT-AUK.pdf',
    badgeImage: '/certifications/badges/Introduction_to_Cybersecurity_RIT-AUK.png',
    createdAt: '14-04-2026', // DD-MM-YYYY
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
    id: 17,
    title: 'Kosova Cyber Team (CTF Attack/Defense with Kosovo & Luxembourg)',
    course: 'https://www.linkedin.com/feed/update/urn:li:activity:7459510111787655168/',
    certificateOne: '/certifications/pdfs/ctf/KOSOVA-AD.pdf',
    badgeImage: '/certifications/badges/KOSOVA-AD.png',
    createdAt: '09-05-2026',
    description:
      'Competed in an international Attack/Defense CTF representing Kosovo alongside a joint team with Luxembourg. Took on a blue team role — focused on defending live services under active attack while simultaneously exploiting opponent infrastructure. Wrote automated scripts to streamline flag submission, monitor service availability, and patch vulnerabilities faster than manual workflows allowed. The team secured a winning result through coordinated defense, quick patching cycles, and consistent offensive pressure.',
    skills: [
      'Attack/Defense CTF methodology',
      'Blue team defense under live attack conditions',
      'Service hardening & rapid vulnerability patching',
      'Automated flag submission scripting',
      'Service availability monitoring',
      'Offensive exploitation of opponent services',
      'Team coordination under time pressure',
      'Incident response & triage',
    ],
    badge: [
      'Attack/Defense CTF',
      'Blue Teaming',
      'Offensive Security',
      'Automation & Scripting',
      'Service Hardening',
      'Incident Response',
      'Team Collaboration',
      'Competitive Cybersecurity',
    ],
  },

];

function countCertificationsByCategory(items: Certification[]) {
  const counts: Record<CertificationCategory, number> = {
    professional: 0,
    ctf: 0,
  };

  items.forEach((certification) => {
    counts[getCertificationCategory(certification)] += 1;
  });

  return counts;
}

export {
  certifications,
  getCertificationCategory,
  countCertificationsByCategory,
  type CertificationCategory,
};