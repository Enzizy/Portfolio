type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
};

const username = "Enzizy";
const githubProfileUrl = `https://github.com/${username}`;
const emailAddress = "rolexzhy@gmail.com";

const fallbackRepos: GitHubRepo[] = [
  {
    id: 1,
    name: "joyno-hr",
    html_url: "https://github.com/Enzizy/joyno-hr",
    description: "HR management dashboard with task assignment and notifications.",
    language: "Vue",
    stargazers_count: 0,
    updated_at: "2026-03-03T03:59:13Z",
  },
  {
    id: 2,
    name: "CRM",
    html_url: "https://github.com/Enzizy/CRM",
    description: "TypeScript-based customer relationship management system.",
    language: "TypeScript",
    stargazers_count: 0,
    updated_at: "2026-02-11T08:55:26Z",
  },
  {
    id: 3,
    name: "CCR",
    html_url: "https://github.com/Enzizy/CCR",
    description: "PHP backend handling core operations and data management.",
    language: "PHP",
    stargazers_count: 0,
    updated_at: "2026-02-27T08:04:25Z",
  },
  {
    id: 4,
    name: "LocalAid",
    html_url: "https://github.com/Enzizy/LocalAid",
    description: "Community-based platform that connects people who need local support.",
    language: "Kotlin",
    stargazers_count: 0,
    updated_at: "2025-11-14T03:46:02Z",
  },
];

async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      return fallbackRepos;
    }

    const data = (await response.json()) as GitHubRepo[];

    return data
      .filter((repo) => repo.name.toLowerCase() !== username.toLowerCase())
      .slice(0, 4);
  } catch {
    return fallbackRepos;
  }
}

function formatMonthYear(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function getTopLanguages(repos: GitHubRepo[]): string[] {
  const scoreMap = new Map<string, number>();

  for (const repo of repos) {
    if (!repo.language) {
      continue;
    }
    scoreMap.set(repo.language, (scoreMap.get(repo.language) ?? 0) + 1);
  }

  return [...scoreMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([language]) => language);
}

export default async function Home() {
  const repos = await getGitHubRepos();
  const topLanguages = getTopLanguages(repos).slice(0, 6);
  const activeSince = "June 2023";

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8 md:py-14">
      <section className="glass-card reveal-up overflow-hidden rounded-3xl p-6 md:p-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#7d4e3f]">
              Rolex / Enzizy
            </p>
            <h1 className="headline mt-4 text-4xl font-semibold md:text-6xl">
              Aspiring Mobile App Developer building useful products.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#493f39] md:text-lg">
              I focus on Flutter and Android, while actively building web
              systems with modern JavaScript frameworks. I enjoy turning
              practical ideas into apps people can use daily.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={githubProfileUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#1f1c1a] px-5 py-2.5 text-sm font-medium text-[#fdf8f1] transition hover:bg-[#000]"
              >
                View GitHub
              </a>
              <a
                href={`mailto:${emailAddress}`}
                className="rounded-full border border-[#1f1c1a] px-5 py-2.5 text-sm font-medium text-[#1f1c1a] transition hover:bg-[#1f1c1a] hover:text-[#fdf8f1]"
              >
                Contact Me
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-[#1f1c1a]/15 bg-[#fff6e9] p-5">
            <p className="font-mono text-xs tracking-[0.22em] uppercase text-[#8a5a45]">
              Snapshot
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/75 p-3">
                <p className="font-mono text-xs text-[#6c5f58]">Active Since</p>
                <p className="mt-1 text-xl font-semibold">{activeSince}</p>
              </div>
              <div className="rounded-xl bg-white/75 p-3">
                <p className="font-mono text-xs text-[#6c5f58]">Featured Repos</p>
                <p className="mt-1 text-xl font-semibold">{repos.length}</p>
              </div>
              <div className="col-span-2 rounded-xl bg-white/75 p-3">
                <p className="font-mono text-xs text-[#6c5f58]">Main Focus</p>
                <p className="mt-1 text-lg font-semibold">
                  Flutter, Android, and full-stack web development
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reveal-up-delay mt-8 grid gap-6 md:grid-cols-2">
        <article className="glass-card rounded-3xl p-6">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#7d4e3f]">
            Tech Stack
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Flutter",
              "Kotlin",
              "JavaScript",
              "TypeScript",
              "Vue.js",
              "Firebase",
              "PHP",
              "Git",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[#1f1c1a]/15 bg-[#fffdf8] px-3 py-1.5 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-[#5f544d]">
            Most-used languages recently:{" "}
            <span className="font-medium">{topLanguages.join(", ") || "N/A"}</span>
          </p>
        </article>

        <article className="glass-card rounded-3xl p-6">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#7d4e3f]">
            Connect
          </p>
          <ul className="mt-4 space-y-3 text-sm text-[#3b332f]">
            <li>
              Email:{" "}
              <a
                className="font-medium underline decoration-[#d9653b] decoration-2 underline-offset-3"
                href={`mailto:${emailAddress}`}
              >
                {emailAddress}
              </a>
            </li>
            <li>
              GitHub:{" "}
              <a
                className="font-medium underline decoration-[#d9653b] decoration-2 underline-offset-3"
                href={githubProfileUrl}
                target="_blank"
                rel="noreferrer"
              >
                github.com/{username}
              </a>
            </li>
            <li>
              Portfolio deployment target:{" "}
              <span className="font-medium">Vercel</span>
            </li>
          </ul>
        </article>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#7d4e3f]">
            Featured Projects
          </p>
          <a
            href={`${githubProfileUrl}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium underline decoration-[#d9653b] decoration-2 underline-offset-3"
          >
            See all repositories
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {repos.map((repo) => (
            <article key={repo.id} className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xl font-semibold">{repo.name}</h2>
                <span className="font-mono text-xs text-[#7b6d65]">
                  Updated {formatMonthYear(repo.updated_at)}
                </span>
              </div>
              <p className="mt-3 min-h-12 text-sm leading-relaxed text-[#4e4540]">
                {repo.description ?? "Project details available in the repository."}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-[#fff] px-2.5 py-1 text-xs">
                  {repo.language ?? "Mixed"}
                </span>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium underline decoration-[#d9653b] decoration-2 underline-offset-3"
                >
                  Open Repo
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
