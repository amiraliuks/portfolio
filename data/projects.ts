import { type ComponentType, type SVGProps } from "react";

import { FaGithub, FaLinux } from "react-icons/fa";
import { PiMicrosoftWordLogoFill } from "react-icons/pi";
import { FaRegFilePowerpoint, FaAndroid, FaFirefox } from "react-icons/fa";
import { SiVercel } from "react-icons/si";
import { FaWindows } from "react-icons/fa";

export interface Project {
  id: number;
  title: string;
  slug: string;
  href?: string;
  live?: string;
  createdAt: string;
  description: string;
  features: string[];
  badge: string[];
  image?: string;
  video?: string;
  postImages?: {
    src: string;
    alt: string;
    caption: string;
  }[];
  links?: {
    type: string;
    href: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
  }[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Snapchat Usernames",
    slug: "snapchat-usernames",
    createdAt: "2021-04-12",
    description:
      "A Python tool to check if Snapchat usernames are available or not.",
    features: [
      "Checks Snapchat username availability",
      "Simple PySimpleGUI interface",
      "Fast requests using the Requests library",
      "Easy to run and lightweight",
      "Headers can be updated if Snapchat changes things"
    ],

    badge: ["Python", "Requests", "PySimpleGUI"],

    image: "/projects/snapchat-usernames/snapchat-logo.png",

    postImages: [
      {
        src: "/projects/snapchat-usernames/su-start.png",
        alt: "Snapchat Username Checker Screenshot",
        caption: "Tool preview",
      },
      {
        src: "/projects/snapchat-usernames/su-result.png",
        alt: "Snapchat Username Checker Screenshot",
        caption: "Tool preview",
      },
    ],

    links: [
      {
        type: "Source",
        href: "https://github.com/amiraliuks/snapchat-username",
        icon: FaGithub,
      },
    ],
  },

  {
    id: 2,
    title: "Login Form",
    slug: "login-form",
    createdAt: "2021-04-13",
    description:
      "Final assignment given by the university professor during C# training class before enrolling to college.",
    features: [
      "Clean login interface with proper validation and error feedback",
      "Role-based access logic (admin/user separation)",
      "Database-driven user management (add, edit, remove users)",
    ],

    badge: ["C#", "Winforms", "Microsoft SQL Server 2019"],

    image: "/projects/login-form/c-sharp-logo.png",

    postImages: [
      {
        src: "/projects/login-form/login-screen.png",
        alt: "Clean login interface with validation and error handling",
        caption: "Clean login interface with validation and error handling",
      },
      {
        src: "/projects/login-form/wrong-password.png",
        alt: "Clean login interface with validation and error handling",
        caption: "Clean login interface with validation and error handling",
      },
      {
        src: "/projects/login-form/users-list.png",
        alt: "SQL Server integration for user authentication and data management",
        caption: "SQL Server integration for user authentication and data management",
      },
      {
        src: "/projects/login-form/fetched-users-list.png",
        alt: "SQL Server integration for user authentication and data management",
        caption: "SQL Server integration for user authentication and data management",
      },
    ],

    links: [
      {
        type: "Source",
        href: "https://github.com/amiraliuks/loginform_amiraliu",
        icon: FaGithub,
      },
    ],
  },

  {
    id: 3,
    title: "E-Commerce Web Application",
    slug: "e-commerce-web-application",
    createdAt: "2021-12-22",
    description:
      "Led a team of 6 to build a full-stack e-commerce app with Next.js and PayPal integration during a university bootcamp, earning a perfect score of 100/100.",
    features: [
      "Responsive design across desktop and mobile devices",
      "User authentication system with login and logout flows",
      "Product discovery via search, sorting, and filtering by category, price, brand, and ratings",
      "Cart supports multiple quantities with checkout flow and persisted cookie data",
      "Order history and shipping-status visibility for users",
      "Admin tooling for managing products/users and viewing platform-level stats"
    ],

    badge: ["Nextjs", "MongoDB", "PayPal SDK"],

    video: "/projects/ecommerce-web-application/homepage-view.mp4",

    postImages: [
      {
        src: "/projects/ecommerce-web-application/eCommerce-logo.png",
        alt: "Showcasing the e-commerce logo",
        caption: "Showcasing the e-commerce logo",
      },
      {
        src: "/projects/ecommerce-web-application/home.png",
        alt: "Homepage View",
        caption: "Homepage View",
      },
      {
        src: "/projects/ecommerce-web-application/products-main-screen.png",
        alt: "The main screen, showcasing the products and categories",
        caption: "The main screen, showcasing the products and categories",
      },
      {
        src: "/projects/ecommerce-web-application/product-screen.png",
        alt: "Product screen showcasing the product details",
        caption: "Product screen showcasing the product details",
      },
      {
        src: "/projects/ecommerce-web-application/homepage-view.mp4",
        alt: "Video showcasing the homepage view",
        caption: "Video showcasing the homepage view",
      },
    ],

    links: [
      {
        type: "Word Document",
        href: "/projects/ecommerce-web-application/ecommerce-word.pdf",
        icon: PiMicrosoftWordLogoFill,
      },
      {
        type: "Powerpoint Document",
        href: "/projects/ecommerce-web-application/powerpoint-presentation.pdf",
        icon: FaRegFilePowerpoint,
      },
    ],
  },

  {
    id: 4,
    title: "Arduino Uno Traffic Lights",
    slug: "arduino-uno-traffic-lights",
    createdAt: "2022-01-01",
    description:
      "A very basic traffic light project in Arduino Uno for a University Assignment.",
    features: [
      "LEDs controlled with basic C++ logic",
      "Timed light cycle (red -> yellow -> green)",
    ],

    badge: ["C++", "Arduino Uno"],

    image: "/projects/arduino-project/arduino.png",

    postImages: [
      {
        src: "/projects/arduino-project/animated-arduino.gif",
        alt: "Animated view of the Arduino Traffic Light System",
        caption: "Animated view of the Arduino Traffic Light System",
      },
      {
        src: "/projects/arduino-project/circuit-design.png",
        alt: "Circuit Design of the Traffic Light System",
        caption: "Circuit Design of the Traffic Light System",
      },
    ],

    links: [
      {
        type: "Source Code",
        href: "/projects/ecommerce-web-application/ecommerce-word.pdf",
        icon: FaGithub,
      },
    ],
  },

  {
    id: 5,
    title: "Billing System",
    slug: "billing-system",
    createdAt: "2022-03-11",
    description:
      "A simple Billing System written for a University Assignment.",
    features: [
      "Straightforward and easy-to-navigate UI",
      "User dashboard displaying account and billing details",
      "Admin dashboard for managing users, products, and categories",
      "Product and category management interfaces",
    ],

    badge: ["C#", "Tier 3 Architecture", "Winforms", "Microsoft SQL Server 2018"],

    image: "/projects/billing-system/c-sharp-logo.png",

    postImages: [
      {
        src: "/projects/billing-system/login-dashboard.png",
        alt: "Showcasing the admin dashboard",
        caption: "Showcasing the admin dashboard",
      },
      {
        src: "/projects/billing-system/admin-dashboard.png",
        alt: "Showcasing the admin dashboard",
        caption: "Showcasing the admin dashboard",
      },
      {
        src: "/projects/billing-system/users-dashboard.png",
        alt: "Showcasing the users dashboard and their information",
        caption: "Showcasing the users dashboard and their information",
      },
      {
        src: "/projects/billing-system/products-dashboard.png",
        alt: "Showcasing the products dashboard",
        caption: "Showcasing the products dashboard",
      },
      {
        src: "/projects/billing-system/categories-dashboard.png",
        alt: "Showcasing the categories dashboard",
        caption: "Showcasing the categories dashboard",
      },
    ],

    links: [
      {
        type: "Source Code",
        href: "https://github.com/amiraliuks/billing-system",
        icon: FaGithub,
      },
    ],
  },

  {
    id: 6,
    title: "AI Language Detection",
    slug: "ai-language-detection",
    createdAt: "2024-05-28",
    description:
      "This code is a language detection model that uses the Naive Bayes algorithm to classify a given text into one of the 22 languages present in the dataset.",
    features: [
      "Naive Bayes based language detection model",
      "Classifies text into 22 supported languages",
      "Simple flowchart showing model logic",
      "Lightweight and easy to run on small datasets",
    ],

    badge: ["Python", "Pandas", "Numpy", "Sci-Kit Learn", "Tabulate"],

    image: "/projects/ai-language-detection/python-logo.png",

    postImages: [
      {
        src: "/projects/ai-language-detection/flowchart.png",
        alt: "Flowchart showing the model logic",
        caption: "Flowchart showing the model logic",
      },
      {
        src: "/projects/ai-language-detection/dataset-1-language-count.png",
        alt: "Dataset 1 language count",
        caption: "Dataset 1 language count",
      },
      {
        src: "/projects/ai-language-detection/dataset-2-language-count.png",
        alt: "Dataset 2 language count",
        caption: "Dataset 2 language count",
      },
      {
        src: "/projects/ai-language-detection/language-prediction.png",
        alt: "Language Prediction",
        caption: "Language Prediction",
      },
    ],

    links: [
      {
        type: "Source Code",
        href: "https://github.com/amiraliuks/ai-language-detection",
        icon: FaGithub,
      },
    ],
  },

  {
    id: 7,
    title: "Banking App",
    slug: "banking-app",
    createdAt: "2024-05-28",
    description:
      "This C# program is a simple banking application that follows the Interpreter Pattern.",
    features: [
      "Console-based banking app built in C#",
      "Uses the Interpreter design pattern",
      "Supports deposits, withdrawals, and balance checks",
      "Simple command-style input system",
    ],

    badge: ["C#", "XUnit", "Interpreted Pattern Design"],

    image: "/projects/banking-app/c-sharp-logo.png",

    postImages: [
      {
        src: "/projects/banking-app/console-banking-app.png",
        alt: "Flowchart showing the model logic",
        caption: "Flowchart showing the model logic",
      },
    ],

    links: [
      {
        type: "Source Code",
        href: "https://github.com/amiraliuks/banking-app",
        icon: FaGithub,
      },
    ],
  },

  {
    id: 8,
    title: "Snake Game",
    slug: "snake-game",
    createdAt: "2024-08-23",
    description:
      "A classic snake game built in Java.",
    features: [
      "Classic Snake game built in Java with Swing",
      "Arrow-key controls with smooth, continuous movement",
      "Growing snake, random food spawning, and score tracking",
      "Collision detection with walls and the snake's body",
      "600x600 tile-based game board with simple graphics",
      "Timer-driven game loop for consistent updates"
    ],

    badge: ["Java", "JFrame", "JPanel"],

    image: "/projects/snake-game/logo.png",

    postImages: [
      {
        src: "/projects/snake-game/snake-demo.png",
        alt: "Snake Game Demo Screenshot",
        caption: "Snake Game Demo Screenshot",
      },
    ],

    links: [
      {
        type: "Source Code",
        href: "https://github.com/amiraliuks/snake-game",
        icon: FaGithub,
      },
      {
        type: "Download Release",
        href: "https://github.com/amiraliuks/snake-game/releases/tag/1.0",
        icon: FaGithub,
      },
    ],
  },

  {
    id: 9,
    title: "Doom Clone",
    slug: "doom-clone",
    createdAt: "2025-01-01",
    description:
      "A faithful remake of the classic DOOM built in Unity, recreating core mechanics, level design, and visuals with modern development tools.",
    features: [
      "Classic DOOM game remake built in Unity",
      "Core mechanics including shooting, enemy AI, and item pickups",
      "Modern visuals while retaining retro aesthetic",
    ],

    badge: ["C#", "Unity"],

    image: "/projects/doom-clone/doom-logo.png",

    links: [
      {
        type: "Source Code",
        href: "https://github.com/amiraliuks/doom-unity",
        icon: FaGithub,
      },
    ],
  },

  {
    id: 10,
    title: "Medtime Mobile Application",
    slug: "medtime-mobile-application",
    createdAt: "2025-05-29",
    description:
      "Medtime reminds you when to take your meds, how much, and when to refill - keeping your medication routine easy and on time.",
    features: [
      "Reminder to take your meds on time",
      "Reminder to refill your meds before you run out",
      "Reminder to take the correct dosage",
    ],

    badge: ["Typescript", "React Native", "Expo", "Async Storage", "Expo Notifications"],

    image: "/projects/medtime/react-native-icon.png",

    links: [
      {
        type: "Download APK",
        href: "",
        icon: FaAndroid,
      },
    ],
  },

  {
    id: 11,
    title: "Steam Kosovo Flag",
    slug: "steam-kosovo-flag",
    createdAt: "2024-06-12",
    description:
      "A browser extension that fixes the missing Kosovo flag on Steam community profile.",
    features: [
      "Detects Steam Community profile pages automatically",
      "Replaces the missing Kosovo flag placeholder with the correct asset",
      "Runs with no setup once installed and applies the fix in-page",
      "Available as a Firefox add-on with source-based install option",
    ],

    badge: ["Javascript", "Browser Extension", "Firefox Add-on"],

    image: "/projects/steam-kosovo-flag-fixer-extension/steam-logo.png",

    postImages: [
      {
        src: "/projects/steam-kosovo-flag-fixer-extension/firefox-addon-store.png",
        alt: "Screenshot of the Firefox Addon Store page for the Kosovo Flag Fixer extension",
        caption: "Screenshot of the Firefox Addon Store page for the Kosovo Flag Fixer extension",
      },
      {
        src: "/projects/steam-kosovo-flag-fixer-extension/result.png",
        alt: "Result when using the extension on a Steam profile",
        caption: "Result when using the extension on a Steam profile",
      },
    ],

    links: [
      {
        type: "Download for Firefox",
        href: "https://addons.mozilla.org/en-US/firefox/addon/kosovo-flag-fixer-for-steam/",
        icon: FaFirefox,
      },
      {
        type: "Source Code",
        href: "https://github.com/amiraliuks/steam-kosovo-flag",
        icon: FaGithub,
      },
    ],
  },

  {
    id: 12,
    title: "InvoMate - Invoice Platform",
    slug: "invomate-invoice-platform",
    createdAt: "2025-05-30",
    description:
      "Built a professional invoice platform that generates and sends PDF invoices via email, with secure payment tracking to simplify billing for freelancers and small businesses.",
    features: [
      "Generates and emails professional PDF invoices",
      "Dashboard for tracking clients, invoices, and payments",
      "Secure payment status management (paid/unpaid)",
      "Built with Nextjs and TypeScript",
    ],

    badge: ["Nextjs", "Typescript", "Prisma", "Auth.js", "Magic Link", "Shadcn UI", "Tailwind CSS", "Magic UI", "Mailtrap", "Nodemailer", "PDFjs", "Zod"],

    video: "/projects/invoice-platform/capture.mp4",

    postImages: [
      {
        src: "/projects/invoice-platform/landing-page-dark-theme.png",
        alt: "Showcasing the landing page in dark theme",
        caption: "Showcasing the landing page in dark theme",
      },
      {
        src: "/projects/invoice-platform/landing-page-light-theme.png",
        alt: "Showcasing the landing page in light theme",
        caption: "Showcasing the landing page in light theme",
      },
      {
        src: "/projects/invoice-platform/login-page.png",
        alt: "Showcasing the login page",
        caption: "Showcasing the login page",
      },
      {
        src: "/projects/invoice-platform/onboarding-page.png",
        alt: "Showcasing the onboarding page",
        caption: "Showcasing the onboarding page",
      },
      {
        src: "/projects/invoice-platform/email-confirmation.png",
        alt: "Showcasing the email confirmation page",
        caption: "Showcasing the email confirmation page",
      },
      {
        src: "/projects/invoice-platform/users-page.png",
        alt: "Showcasing the users page",
        caption: "Showcasing the users page",
      },
      {
        src: "/projects/invoice-platform/invoices-hasinvoices.png",
        alt: "Showcasing the dashboard with invoices",
        caption: "Showcasing the dashboard with invoices",
      },
      {
        src: "/projects/invoice-platform/dashboard-noinvoices.png",
        alt: "Showcasing the dashboard with no invoices",
        caption: "Showcasing the dashboard with no invoices",
      },
      {
        src: "/projects/invoice-platform/dashboard-invoices.png",
        alt: "Showcasing the dashboard with invoices",
        caption: "Showcasing the dashboard with invoices",
      },

      {
        src: "/projects/invoice-platform/invoices-actions.png",
        alt: "Showcasing the available invoice actions",
        caption: "Showcasing the available invoice actions",
      },
      {
        src: "/projects/invoice-platform/delete-invoice.png",
        alt: "Showcasing the delete invoice modal",
        caption: "Showcasing the delete invoice modal",
      },
      {
        src: "/projects/invoice-platform/create-invoice.png",
        alt: "Showcasing the create invoice page",
        caption: "Showcasing the create invoice page",
      },
      {
        src: "/projects/invoice-platform/invoice-email.png",
        alt: "Showcasing the invoice email sent to the client",
        caption: "Showcasing the invoice email sent to the client",
      },
      {
        src: "/projects/invoice-platform/invoice-pdf.png",
        alt: "Showcasing the invoice PDF generated by the platform",
        caption: "Showcasing the invoice PDF generated by the platform",
      },
      {
        src: "/projects/invoice-platform/mark-invoice-as-paid.png",
        alt: "Marking the Invoice as Paid",
        caption: "Marking the Invoice as Paid",
      },
    ],
  },

  {
    id: 13,
    title: "Artist Portfolio",
    slug: "artist-portfolio",
    createdAt: "2025-06-01",
    description:
      "Built an artist portfolio site featuring artwork and an embedded Spotify profile to showcase both visual and musical projects in a unified, responsive design.",
    features: [
      "Responsive artist portfolio showcasing visual work",
      "Embedded Spotify profile for music integration",
      "Clean, unified layout for art and audio projects",
      "Fast, lightweight, and mobile-friendly design",
    ],

    badge: ["Nextjs", "Typescript", "Shadcn UI", "Tailwind CSS", "Spotify API"],

    video: "/projects/artist-portfolio/capture.mp4",

    postImages: [
      {
        src: "/projects/artist-portfolio/homepage.png",
        alt: "Showcasing the homepage",
        caption: "Showcasing the homepage",
      },
      {
        src: "/projects/artist-portfolio/contact.png",
        alt: "Showcasing the contact page",
        caption: "Showcasing the contact page",
      },
      {
        src: "/projects/artist-portfolio/tour.png",
        alt: "Showcasing the tour page",
        caption: "Showcasing the tour page",
      },
    ],

    links: [
      {
        type: "Live Site",
        href: "https://artist-page-iota.vercel.app/",
        icon: SiVercel,
      },
    ],
  },

  {
    id: 14,
    title: "NASA APOD Explorer",
    slug: "nasa-apod-explorer",
    createdAt: "2025-06-02",
    description:
      "A sleek and responsive web app for discovering [NASA's Astronomy Picture of the Day archive](https://apod.nasa.gov/apod) - from today back to 1995.",
    features: [
      "Responsive web app for browsing NASA's APOD archive",
      "View daily images from 1995 to today",
      "Light and dark theme support",
      "Clean UI with accessible, modern layout",
    ],

    badge: ["Next.js", "Typescript", "Shadcn UI", "TailwindCSS", "Magic UI", "REST API"],

    video: "/projects/nasa-apod-api/capture.mp4",
    image: "/projects/nasa-apod-api/dark-theme.jpeg",

    postImages: [
      {
        src: "/projects/nasa-apod-api/capture.gif",
        alt: "Showcasing the homepage",
        caption: "Showcasing the homepage",
      },
      {
        src: "/projects/nasa-apod-api/dark-theme.jpeg",
        alt: "Showcasing the page in dark theme",
        caption: "Showcasing the page in dark theme",
      },
      {
        src: "/projects/nasa-apod-api/light-theme.jpeg",
        alt: "Showcasing the page in light theme",
        caption: "Showcasing the page in light theme",
      },
    ],

    links: [
      {
        type: "Live Site",
        href: "https://v0-next-js15-with-nasa-api.vercel.app/",
        icon: SiVercel,
      },
      {
        type: "Source Code",
        href: "https://github.com/amiraliuks/nasa-apod-api/",
        icon: FaGithub,
      },
    ],
  },

  {
    id: 15,
    title: "GTA SA Fixer",
    slug: "gta-sa-fixer",
    createdAt: "2025-10-19",
    description:
      "This tool is designed to restore and preserve the vanilla experience of Grand Theft Auto: San Andreas, while applying only the essential fixes and enhancements needed for stability, compatibility, and visual accuracy.",
    features: [
      "Restores the original GTA: San Andreas experience",
      "Applies essential fixes for stability and compatibility",
      "Improves visual accuracy without altering core gameplay",
      "Focused, lightweight enhancement tool",
    ],

    badge: ["C#", ".NET 8", "Winforms"],

    image: "/projects/gta-sa-fixer/logo.png",

    postImages: [
      {
        src: "/projects/gta-sa-fixer/demo.png",
        alt: "Showcasing the application",
        caption: "Showcasing the application",
      },
    ],

    links: [
      {
        type: "Download",
        href: "https://github.com/amiraliuks/GTA-SA-Fixer/releases",
        icon: FaGithub,
      },
      {
        type: "Source Code",
        href: "https://github.com/amiraliuks/GTA-SA-Fixer/",
        icon: FaGithub,
      },
    ],
  },

  {
    id: 17,
    title: "Silent Hill Archive",
    slug: "silent-hill-archive",
    createdAt: "2025-11-17",
    description:
      "Open-source Silent Hill encyclopedia built with Next.js.",
    features: [
      "Complete Game Coverage",
      "Walkthroughs & Guides",
      "Lore Encyclopedia",
      "Media Archive",
    ],

    badge: ["Nextjs", "Typescript", "TailwindCSS", "Shadcn UI"],

    image: "/projects/silent-hill-archive/halo_of_the_sun_02.png",

    postImages: [
      {
        src: "/projects/silent-hill-archive/demo.png",
        alt: "Showcasing the application",
        caption: "Showcasing the application",
      },
    ],

    links: [
      {
        type: "Live Site",
        href: "https://silent-hill-archive.vercel.app/",
        icon: SiVercel,
      },
      {
        type: "Source Code",
        href: "https://github.com/amiraliuks/silent-hill-archive/",
        icon: FaGithub,
      },
    ],
  },

  {
    id: 18,
    title: "Kosovo Government Domain Checker",
    slug: "kosovo-gov-site-verification",
    createdAt: "2025-12-02",
    description:
      "A lightweight browser extension that verifies whether the website you are visiting belongs to an official government domain of the Republic of Kosovo.",
    features: [
      "Checks against a built-in list of official domains",
      "Simple banner with Kosovo flag and icon set",
      "Automatic language detection (EN / SQ / SR)",
      "Popup page with manual check button",
      "Fully offline, no analytics, no network requests",
      "Runs on <all_urls>",
    ],

    badge: ["Javascript", "HTML", "CSS"],

    image: "/projects/kosovo-gov-site-verification/emblem.png",

    postImages: [
      {
        src: "/projects/kosovo-gov-site-verification/extension-result-en.png",
        alt: "Showcasing the extension result in English language",
        caption: "Showcasing the extension result in English language",
      },
      {
        src: "/projects/kosovo-gov-site-verification/extension-result-al.png",
        alt: "Showcasing the extension result in Albanian language",
        caption: "Showcasing the extension result in Albanian language",
      },
      {
        src: "/projects/kosovo-gov-site-verification/extension-result-sr.png",
        alt: "Showcasing the extension result in Serbian language",
        caption: "Showcasing the extension result in Serbian language",
      },
      {
        src: "/projects/kosovo-gov-site-verification/extension-popup.png",
        alt: "Showcasing the extension popup",
        caption: "Showcasing the extension popup",
      },
    ],

    links: [
      {
        type: "Source Code",
        href: "https://github.com/amiraliuks/kosovo-gov-site-verification/releases",
        icon: FaGithub,
      },
    ],
  },

  {
    id: 20,
    title: "Leotrim Selmanaj Financial Planning",
    slug: "leotrim-selmanaj-financial-planning",
    createdAt: "2026-01-10",
    description:
      "This is a premium financial planning and retirement services platform built with Next.js 16, React 19, and TypeScript. I was contracted to handle the backend development, migrate the database from SQLite to Prisma with PostgreSQL, and build the administrative dashboard frontend with a fully responsive, production-ready UI.",
    features: [
      "Lead Intake System - public contact forms feed directly into a secure backend, creating structured leads for financial advisors",
      "Lead Status Pipeline - leads move through New, Contacted, Meeting Scheduled, and Client stages to track the sales funnel",
      "Admin Dashboard - custom-built interface for viewing, filtering, and managing incoming financial service inquiries",
      "Lead Detail View - advisors can review client info, interests (insurance, pension, retirement, etc.), and messages in one place",
      "Internal Notes System - staff can attach private notes to each lead for follow-ups and case tracking",
      "Prisma + PostgreSQL Backend - migrated from SQLite to a scalable, production-grade database built for financial data",
      "Next.js 16 App Router - server & client components for fast, secure, and SEO-friendly financial service pages",
      "Fully Responsive Admin UI - works cleanly across desktop, tablet, and mobile for advisors on the go",
    ],

    badge: ["Nextjs 16", "React 19", "Prisma", "PostgreSQL", "TypeScript", "Tailwind CSS"],

    image: "/projects/leotrim-selmanaj/logo-full-light.png",

    postImages: [
      {
        src: "/projects/leotrim-selmanaj/admin-login-page.png",
        alt: "Admin login screen for the Leotrim Selmanaj dashboard",
        caption: "Secure admin login page used to access the CRM dashboard",
      },
      {
        src: "/projects/leotrim-selmanaj/leads-page.png",
        alt: "Leads overview page with filters and lead list",
        caption: "Main leads dashboard showing all incoming leads with status filters and search",
      },
      {
        src: "/projects/leotrim-selmanaj/leads-details.png",
        alt: "Lead details page showing customer information and status",
        caption: "Detailed view of a single lead with contact info, interest, and current status",
      },
      {
        src: "/projects/leotrim-selmanaj/editing-leads.png",
        alt: "Lead status and notes editor in the admin dashboard",
        caption: "Interface for updating a lead's status and adding internal notes",
      },
      {
        src: "/projects/leotrim-selmanaj/profile-page.png",
        alt: "Admin profile and account settings page",
        caption: "Profile page where the admin can manage account details and change password",
      },
    ],

    links: [
      {
        type: "Live Site",
        href: "https://visionfinance.ch/",
        icon: SiVercel,
      },
    ],
  },

  {
    id: 21,
    title: "Medusa Artist Portfolio",
    slug: "medusa-artist-portfolio",
    createdAt: "2026-01-13",
    description:
      "Medusa Music is a modern personal musician website built with Nextjs 16 and shadcn/ui, designed to showcase an artist's music, identity, and presence across streaming platforms. The site connects directly to the Spotify API to display real-time data such as tracks, albums, and playlists.",
    features: [
      "Spotify-Powered Music - displays the artist's tracks, albums, and playlists using live Spotify data",
      "Artist-Focused Layout - built specifically for a single musician or band to present their work professionally",
      "Modern UI (shadcn/ui) -clean components with smooth transitions and full light/dark theme support",
      "Next.js 16 App Router -uses server & client components for fast navigation, SEO, and scalability",
      "Dynamic Artist Pages - automatically renders albums, tracks, and previews with optimized metadata",
      "Fully Responsive - looks great on desktop, tablet, and mobile",
    ],

    badge: ["Nextjs 16", "shadcn/ui", "Tailwind CSS", "TypeScript", "Spotify API"],

    image: "/projects/medusa-artist-portfolio/homepage-music-section.png",

    postImages: [
      {
        src: "/projects/medusa-artist-portfolio/main-page-full.png",
        alt: "Full Medusa artist homepage with hero, music highlights, and footer",
        caption: "Complete homepage layout showcasing the brand, music, and navigation structure.",
      },
      {
        src: "/projects/medusa-artist-portfolio/music-page-full.png",
        alt: "Medusa artist discography page with albums, singles, and most played tracks",
        caption: "The full music library view with albums, singles, and most-played tracks.",
      },
      {
        src: "/projects/medusa-artist-portfolio/hero-section.png",
        alt: "Medusa artist website hero section with neon purple lighting and social media icons",
        caption: "The immersive hero section introducing Medusa with a neon-lit visual identity.",
      },
      {
        src: "/projects/medusa-artist-portfolio/homepage-music-section.png",
        alt: "Medusa music homepage showing featured track and Spotify integration",
        caption: "Homepage music section featuring highlighted releases and direct Spotify playback.",
      },
      {
        src: "/projects/medusa-artist-portfolio/footer.png",
        alt: "Medusa website footer with social links, merch navigation, and copyright",
        caption: "Footer section containing social media links, merch access, and legal information.",
      },
    ],

    links: [
      {
        type: "Live Site",
        href: "https://medusa-artist-website.vercel.app/",
        icon: SiVercel,
      },
    ],
  },

  {
    id: 22,
    title: "Rubik's Cube Unity Game",
    slug: "unity-rubiks-cube",
    createdAt: "2026-08-02",
    description:
      "A Rubik's Cube game built in Unity using C#, featuring a fully interactive 3D cube with realistic rotations, scramble logic, and solve-state validation. Designed as both a puzzle game and a foundation for experimenting with cube algorithms and solvers.",

    features: [
      "Procedurally generated 3D Rubik's Cube built entirely via code (no premade 3D models)",
      "Fully interactive cube with smooth, realistic face rotations",
      "Built in Unity using C#, with accurate cubie-based logic and full state tracking",
      "Scramble system with validation to prevent impossible cube configurations",
      "Solve-state detection that reliably identifies completed faces",
      "Integrated audio manager handling background music and responsive sound effects",
      "Smooth, customizable orbit camera with intuitive controls for rotating and inspecting the cube",
      "Designed as a foundation for future solving algorithms and auto-solver integration",
    ],

    badge: ["Unity", "C#", "3D Game Development", "Algorithm Design", "Open Source"],

    image: "/projects/unity-rubiks-cube/prototype.png",

    postImages: [
      {
        src: "/projects/unity-rubiks-cube/prototype.png",
        alt: "Unity Rubik's Cube prototype with interactive controls",
        caption: "The initial prototype showing the interactive 3D Rubik's Cube in Unity.",
      },
    ],

    links: [
      {
        type: "Source Code",
        href: "https://github.com/amiraliuks/unity-rubiks-cube/",
        icon: FaGithub,
      },
      {
        type: "Windows Release",
        href: "https://github.com/amiraliuks/unity-rubiks-cube/releases",
        icon: FaWindows,
      },
      {
        type: "Linux Release",
        href: "https://github.com/amiraliuks/unity-rubiks-cube/releases",
        icon: FaLinux,
      },
    ],
  },
];

export { projects };
