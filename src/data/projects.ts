import type { PortfolioProject } from "@/types/portfolio";

export const projects: PortfolioProject[] = [
  {
    id: "joyno-hr",
    name: "Joyno HR System",
    shortDescription:
      "An internal HR platform for managing tasks, updates, and team communication in one dashboard.",
    longDescription:
      "Joyno HR System centralizes task management, role-based tracking, and team communication so HR and admin staff can execute operations faster with fewer manual follow-ups.",
    tech: ["Vue", "TypeScript", "Firebase", "MySQL"],
    repoUrl: "https://github.com/Enzizy/joyno-hr",
    highlights: [
      "Multi-role dashboard for Admin and HR users",
      "Task ownership and status visibility across teams",
    ],
    problem:
      "HR workflows were fragmented across messages and spreadsheets, making deadlines and accountability difficult to track.",
    solution:
      "Built a unified HR dashboard with role-aware views, task assignment workflows, and automated notifications to keep teams aligned.",
    features: [
      "Admin and HR dashboards with role-based permissions",
      "Task assignment and progress status pipeline",
      "Email notification integration for updates and reminders",
      "Activity overview for pending and completed actions",
    ],
    challenges: [
      {
        challenge:
          "Coordinating task updates across different users caused status mismatch.",
        solution:
          "Introduced a single source of truth for task state and clear transition actions.",
      },
      {
        challenge:
          "Users missed important updates when relying on manual communication.",
        solution:
          "Added automated notification triggers for key task events.",
      },
    ],
    screenshots: [
      { src: "", alt: "Joyno HR dashboard overview" },
      { src: "", alt: "Joyno HR task management panel" },
      { src: "", alt: "Joyno HR assignment and notifications view" },
    ],
    videoUrl: "",
    isFeatured: true,
  },
  {
    id: "crm",
    name: "CRM System",
    shortDescription:
      "A customer workflow system that helps teams track leads, interactions, and relationship progress.",
    longDescription:
      "CRM System is focused on improving customer follow-through by providing clear lead management, activity tracking, and status progression for sales and operations teams.",
    tech: ["TypeScript", "JavaScript", "MySQL"],
    repoUrl: "https://github.com/Enzizy/CRM",
    highlights: [
      "Lead pipeline visibility from first contact to closure",
      "Cleaner handoff between team members",
    ],
    problem:
      "Customer details and follow-ups were inconsistent, leading to missed opportunities and poor visibility.",
    solution:
      "Implemented structured records and pipeline stages so teams can consistently track relationships and next actions.",
    features: [
      "Lead and customer profile management",
      "Pipeline stage tracking and activity logs",
      "Search and filter tools for quick retrieval",
      "Basic reporting-ready data structure",
    ],
    challenges: [
      {
        challenge:
          "Different users recorded customer updates in inconsistent formats.",
        solution:
          "Standardized entry forms and stage-based workflow transitions.",
      },
      {
        challenge: "Finding active opportunities took too much time.",
        solution:
          "Added streamlined filter and sorting options around lead status and recency.",
      },
    ],
    screenshots: [
      { src: "", alt: "CRM pipeline dashboard" },
      { src: "", alt: "CRM customer profile page" },
      { src: "", alt: "CRM activity timeline and updates" },
    ],
    videoUrl: "",
    isFeatured: true,
  },
  {
    id: "ccr",
    name: "CCR System",
    shortDescription:
      "A PHP-based backend system that handles core records and operational data flow.",
    longDescription:
      "CCR System focuses on backend-heavy operations, helping teams manage data processes with more consistent structure and reduced manual bottlenecks.",
    tech: ["PHP", "MySQL", "Git"],
    repoUrl: "https://github.com/Enzizy/CCR",
    highlights: [
      "Reliable backend operations and data handling",
      "Structured processing flow for core records",
    ],
    problem:
      "Core operational data tasks were manually processed, introducing delay and consistency issues.",
    solution:
      "Created a backend workflow in PHP that standardizes record handling and reduces repetitive admin tasks.",
    features: [
      "Core record processing endpoints and logic",
      "Database-backed CRUD operations",
      "Validation flow for safer updates",
      "Modular code organization for maintainability",
    ],
    challenges: [
      {
        challenge:
          "Existing logic paths were difficult to trace when debugging data issues.",
        solution:
          "Refactored backend flows into smaller modules with clearer responsibilities.",
      },
      {
        challenge:
          "Record updates could introduce inconsistency when validation was weak.",
        solution:
          "Implemented stronger input validation before processing writes.",
      },
    ],
    screenshots: [
      { src: "", alt: "CCR backend operations panel" },
      { src: "", alt: "CCR record processing flow" },
      { src: "", alt: "CCR data management table view" },
    ],
    videoUrl: "",
    isFeatured: true,
  },
  {
    id: "localaid-admin",
    name: "LocalAid Admin",
    shortDescription:
      "An admin dashboard for a community-help platform used to manage requests, activity, and support flow.",
    longDescription:
      "LocalAid Admin provides administrators with a centralized interface to monitor requests, coordinate responses, and manage community support operations in real time.",
    tech: ["JavaScript", "Firebase", "Render", "Vercel"],
    repoUrl: "https://github.com/Enzizy/LocalAid-Admin",
    liveUrl: "https://local-aid-admin.vercel.app",
    highlights: [
      "Real-time request monitoring for community support",
      "Operational dashboard designed for faster response decisions",
    ],
    problem:
      "Community support requests needed a clear control center to reduce response delays and improve coordination.",
    solution:
      "Built an admin dashboard with real-time visibility and management actions for request triage and tracking.",
    features: [
      "Central request overview and status updates",
      "Admin controls for request handling",
      "Data-backed activity visibility",
      "Deployment-ready dashboard architecture",
    ],
    challenges: [
      {
        challenge:
          "High-volume request views can become difficult to scan quickly.",
        solution:
          "Designed layout with prioritization cues and cleaner grouping for actionable items.",
      },
      {
        challenge:
          "Keeping dashboard state in sync across updates required careful handling.",
        solution:
          "Used backend-driven refresh patterns with predictable state updates.",
      },
    ],
    screenshots: [
      { src: "", alt: "LocalAid Admin dashboard home" },
      { src: "", alt: "LocalAid Admin request management screen" },
      { src: "", alt: "LocalAid Admin status tracking panel" },
    ],
    videoUrl: "",
    isFeatured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.isFeatured);
