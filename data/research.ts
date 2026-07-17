export type CveStatus = "Published" | "Reserved" | "Disclosed" | "In Review";
export type VendorResponseStatus =
  | "Acknowledged"
  | "Fixed and credited"
  | "No vendor response"
  | "Awaiting response"
  | "Not contacted";

export interface CveEntry {
  id: string;
  product: string;
  vulnerabilityType: string;
  cvss: string;
  status: CveStatus;
  vendorResponse: VendorResponseStatus;
  vendorResponseHref?: string;
  href?: string;
}

export interface ResearchCard {
  id: number;
  title: string;
  date: string;
  description: string;
  tags: string[];
  href?: string;
}

export const cves: CveEntry[] = [
  {
    id: "CVE-2026-XXXX",
    product: "Camaleon CMS",
    vulnerabilityType: "Broken Access Control in Plugin Administration Routes",
    cvss: "6.3",
    status: "Reserved",
    vendorResponse: "Fixed and credited",
    vendorResponseHref: "https://github.com/owen2345/camaleon-cms/releases/tag/2.9.2",
    href: "/blog/camaleon-cms-cve",
  },
  {
    id: "CVE-2026-XXXX",
    product: "Camaleon CMS",
    vulnerabilityType: "Stored XSS via Draft Post Title",
    cvss: "8.7",
    status: "Reserved",
    vendorResponse: "Fixed and credited",
    vendorResponseHref: "https://github.com/owen2345/camaleon-cms/releases/tag/2.9.2",
    href: "/blog/camaleon-cms-cve",
  },
  {
    id: "CVE-2026-XXXX",
    product: "Camaleon CMS",
    vulnerabilityType: "Authenticated RCE via instance_eval in Select Eval Custom Fields",
    cvss: "7.2",
    status: "Reserved",
    vendorResponse: "Fixed and credited",
    vendorResponseHref: "https://github.com/owen2345/camaleon-cms/releases/tag/2.9.2",
    href: "/blog/camaleon-cms-cve",
  },
  {
    id: "CVE-2026-XXXX",
    product: "Camaleon CMS",
    vulnerabilityType: "Stored XSS via Contact Form previous_html Rendering",
    cvss: "8.7",
    status: "Reserved",
    vendorResponse: "Fixed and credited",
    vendorResponseHref: "https://github.com/owen2345/camaleon-cms/releases/tag/2.9.2",
    href: "/blog/camaleon-cms-cve",
  },
  {
    id: "CVE-2026-XXXX",
    product: "Camaleon CMS",
    vulnerabilityType: "Authenticated SQL Injection via Slug Translations",
    cvss: "6.5",
    status: "Reserved",
    vendorResponse: "Fixed and credited",
    vendorResponseHref: "https://github.com/owen2345/camaleon-cms/releases/tag/2.9.2",
    href: "/blog/camaleon-cms-cve",
  },
  {
    id: "CVE-2026-XXXX",
    product: "Camaleon CMS",
    vulnerabilityType: "Authenticated SSTI leading to RCE via render inline in test_email",
    cvss: "6.6",
    status: "Reserved",
    vendorResponse: "Fixed and credited",
    vendorResponseHref: "https://github.com/owen2345/camaleon-cms/releases/tag/2.9.2",
    href: "/blog/camaleon-cms-cve",
  },
  {
    id: "CVE-2026-51402",
    product: "Fullhan Microelectronics AJL30PG0803 IP Camera",
    vulnerabilityType: "Unauthenticated blind OS command injection via the custom SYSTEM protocol",
    cvss: "8.8",
    status: "Reserved",
    vendorResponse: "No vendor response",
    href: "/blog/breaking-into-my-own-camera",
  },
  {
    id: "CVE-2026-51403",
    product: "Fullhan Microelectronics AJL30PG0803 IP Camera",
    vulnerabilityType: "Unauthenticated read/write access to PSIA API endpoints",
    cvss: "8.8",
    status: "Reserved",
    vendorResponse: "No vendor response",
    href: "/blog/breaking-into-my-own-camera",
  },
  {
    id: "CVE-2026-51404",
    product: "Fullhan Microelectronics AJL30PG0803 IP Camera",
    vulnerabilityType: "Unauthenticated live camera snapshots on TCP port 6688",
    cvss: "6.5",
    status: "Reserved",
    vendorResponse: "No vendor response",
    href: "/blog/breaking-into-my-own-camera",
  },
  {
    id: "CVE-2026-51405",
    product: "Fullhan Microelectronics AJL30PG0803 IP Camera",
    vulnerabilityType: "BusyBox Telnet enabled by default with root shell exposure",
    cvss: "8.8",
    status: "Reserved",
    vendorResponse: "No vendor response",
    href: "/blog/breaking-into-my-own-camera",
  },
  {
    id: "CVE-2026-51406",
    product: "Fullhan Microelectronics AJL30PG0803 IP Camera",
    vulnerabilityType: "Unauthenticated disclosure of plaintext device credentials",
    cvss: "6.5",
    status: "Reserved",
    vendorResponse: "No vendor response",
    href: "/blog/breaking-into-my-own-camera",
  },
  {
    id: "CVE-2026-51407",
    product: "Fullhan Microelectronics AJL30PG0803 IP Camera",
    vulnerabilityType: "Plaintext storage of Wi-Fi credentials in ifcfg.wlan0",
    cvss: "7.4",
    status: "Reserved",
    vendorResponse: "No vendor response",
    href: "/blog/breaking-into-my-own-camera",
  },
];

export const researchCards: ResearchCard[] = [
  {
    id: 1,
    title: "Camaleon CMS Vulnerability Research",
    date: "2026-03-20",
    description:
      "Security review of Camaleon CMS 2.9.1 covering broken access control, stored XSS, authenticated RCE, SQL injection, and SSTI-to-RCE findings.",
    tags: ["CVE", "Broken Access Control", "Stored XSS", "RCE", "SQL Injection", "SSTI"],
    href: "/blog/camaleon-cms-cve",
  },
  {
    id: 2,
    title: "Breaking Into My Own Camera",
    date: "2026-03-10",
    description:
      "Six assigned CVEs covering unauthenticated PSIA access, plaintext credential exposure, exposed snapshots, blind command execution, default Telnet, and plaintext Wi-Fi credentials.",
    tags: ["CVE", "IoT Security", "Missing Authentication", "Command Execution"],
    href: "/blog/breaking-into-my-own-camera",
  },
  {
    id: 3,
    title: "Kosovo Government Domain Checker",
    date: "2025-12-02",
    description:
      "Browser extension research and tooling for identifying official Kosovo government domains and reducing phishing risk.",
    tags: ["Phishing", "Domain Verification", "Browser Extension"],
    href: "/blog/introducing-the-kosovo-government-domain-checker",
  },
  {
    id: 4,
    title: "Next.js App Router: Path Normalization Middleware Bypass",
    date: "2026-05-17",
    description:
      "Not public yet, to be disclosed.",
    tags: ["Web Security", "Next.js", "Information Disclosure"],
    href: "https://github.com/amiraliuks",
  },
];
