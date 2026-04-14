import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import CopyEmailButton from "@/components/copy-email-button";
import ProjectVisualsSection from "@/components/project-visuals-section";
import ScreenshotPlaceholder from "@/components/screenshot-placeholder";
import { currentlyBuildingItems } from "@/data/currently-building";
import { experienceItems } from "@/data/experience";
import { metrics } from "@/data/metrics";
import { profile } from "@/data/profile";
import { featuredProjects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { testimonials } from "@/data/testimonials";

type GitHubProfile = {
  public_repos?: number;
};

type Capability = {
  title: string;
  summary: string;
  tag: string;
};

const capabilities: Capability[] = [
  {
    title: "Product-Minded Development",
    summary:
      "I map technical decisions to user outcomes so every feature serves real workflow value.",
    tag: "Strategy + Build",
  },
  {
    title: "Cross-Platform Execution",
    summary:
      "From mobile to web dashboards, I ship consistent experiences with practical backend support.",
    tag: "Flutter + Web",
  },
  {
    title: "Operational Reliability",
    summary:
      "I design systems that reduce manual bottlenecks and make data states easier to manage.",
    tag: "System Design",
  },
];

const processSteps = [
  "Discover workflow pain points with stakeholders",
  "Design usable flows before writing core logic",
  "Build fast, validate early, and iterate with feedback",
  "Polish UX details and deploy with monitoring in place",
];

async function getFeaturedRepoCount(): Promise<number> {
  try {
    const response = await fetch(`https://api.github.com/users/${profile.githubUsername}`, {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return featuredProjects.length;
    }

    const data = (await response.json()) as GitHubProfile;
    return data.public_repos ?? featuredProjects.length;
  } catch {
    return featuredProjects.length;
  }
}

export default async function Home() {
  const repoCount = await getFeaturedRepoCount();
  const reviewAnchor = testimonials.length > 0 ? "reviews" : "about";
  const leadProject = featuredProjects[0];
  const remainingProjects = featuredProjects.slice(1);

  return (
    <main className="page-shell portfolio-canvas mx-auto w-full max-w-7xl px-5 pb-14 pt-6 md:px-8 md:pt-10">
      <header data-reveal style={{ "--reveal-delay": "40ms" } as CSSProperties} className="sticky top-4 z-40 mb-8">
        <div className="nav-pill mx-auto flex w-full max-w-4xl items-center justify-between rounded-full px-3 py-2 shadow-[0_16px_36px_rgba(0,0,0,0.12)]">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[var(--card-border)]">
              <Image
                src={profile.profileImage}
                alt={`${profile.fullName} profile image`}
                fill
                className="theme-profile-image theme-profile-image-light object-cover"
                sizes="40px"
                priority
              />
              <Image
                src={profile.darkProfileImage}
                alt={`${profile.fullName} dark mode profile image`}
                fill
                className="theme-profile-image theme-profile-image-dark object-cover"
                sizes="40px"
                priority
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-main">{profile.fullName}</p>
              <p className="truncate text-xs text-subtle">{profile.status}</p>
            </div>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            <a data-magnetic href="#projects" className="nav-link rounded-full px-4 py-2 text-sm">
              Projects
            </a>
            <a data-magnetic href="#capabilities" className="nav-link rounded-full px-4 py-2 text-sm">
              Capabilities
            </a>
            <a data-magnetic href={`#${reviewAnchor}`} className="nav-link rounded-full px-4 py-2 text-sm">
              {testimonials.length > 0 ? "Reviews" : "About"}
            </a>
            <a data-magnetic href="#contact" className="nav-link rounded-full px-4 py-2 text-sm">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section data-reveal style={{ "--reveal-delay": "80ms" } as CSSProperties} className="glass-card hover-lift rounded-[2.25rem] p-6 md:p-10">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="soft-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium">
              <span className="h-2 w-2 rounded-full bg-[#68b65a]" />
              Building real systems, not demos
            </div>
            <h1 className="headline type-display max-w-3xl font-semibold">
              Crafting
              <br />
              useful software
              <br />
              for real teams.
            </h1>
            <p className="text-body type-body max-w-2xl">
              I design and develop mobile apps, admin dashboards, and backend-powered
              workflows. My focus is practical delivery: clearer operations, better data
              visibility, and smoother user flow.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                data-magnetic
                href="#projects"
                className="btn-pop btn-solid rounded-full px-5 py-2.5 text-sm font-medium"
              >
                Start a Conversation
              </a>
              <a
                data-magnetic
                href={profile.resumeFile}
                download
                className="btn-pop hover-dark-invert rounded-full border border-[var(--card-border-strong)] px-5 py-2.5 text-sm font-medium"
              >
                Download CV
              </a>
              <a
                data-magnetic
                href="#contact"
                className="btn-pop hover-dark-invert rounded-full border border-[var(--card-border-strong)] px-5 py-2.5 text-sm font-medium"
              >
                Contact
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="metric-compact rounded-2xl p-3">
                <p className="text-subtle text-xs uppercase tracking-[0.15em]">Active</p>
                <p className="text-main mt-1 text-lg font-semibold">{profile.activeSince}</p>
              </div>
              <div className="metric-compact rounded-2xl p-3">
                <p className="text-subtle text-xs uppercase tracking-[0.15em]">Repositories</p>
                <p className="text-main mt-1 text-lg font-semibold">{repoCount}</p>
              </div>
              <div className="metric-compact rounded-2xl p-3">
                <p className="text-subtle text-xs uppercase tracking-[0.15em]">Location</p>
                <p className="text-main mt-1 text-sm font-semibold">{profile.location}</p>
              </div>
            </div>
          </div>

          <aside className="surface-soft rounded-[2rem] border border-[var(--card-border)] p-5 md:p-6">
            <div data-parallax data-parallax-intensity="7" className="portrait-stage relative overflow-hidden rounded-[1.6rem] border border-[var(--card-border)] p-4">
              <div className="portrait-ring mx-auto mb-4 flex h-72 w-72 items-center justify-center rounded-full md:h-[21rem] md:w-[21rem]">
                <div className="relative h-64 w-64 overflow-hidden rounded-full border border-[var(--card-border-strong)] md:h-[19rem] md:w-[19rem]">
                  <Image
                    src={profile.profileImage}
                    alt={`${profile.fullName} profile image`}
                    fill
                    className="theme-profile-image theme-profile-image-light object-cover"
                    sizes="(max-width: 768px) 256px, 304px"
                    priority
                  />
                  <Image
                    src={profile.darkProfileImage}
                    alt={`${profile.fullName} dark mode profile image`}
                    fill
                    className="theme-profile-image theme-profile-image-dark object-cover"
                    sizes="(max-width: 768px) 256px, 304px"
                    priority
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-8 left-1/2 h-24 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.16),transparent_72%)] blur-md" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="glass-card rounded-xl p-3">
                <p className="text-subtle font-mono text-[10px] uppercase">Core</p>
                <p className="text-main mt-1 text-xs font-semibold">Mobile + Web</p>
              </div>
              <div className="glass-card rounded-xl p-3">
                <p className="text-subtle font-mono text-[10px] uppercase">Focus</p>
                <p className="text-main mt-1 text-xs font-semibold">Product Workflows</p>
              </div>
              <div className="glass-card rounded-xl p-3">
                <p className="text-subtle font-mono text-[10px] uppercase">Target</p>
                <p className="text-main mt-1 text-xs font-semibold">Real Impact</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="capabilities" data-reveal style={{ "--reveal-delay": "120ms" } as CSSProperties} className="section-gap">
        <div className="mb-5 flex items-center gap-3">
          <p className="section-kicker font-mono text-xs tracking-[0.25em] uppercase">
            What I Bring
          </p>
          <span className="eyebrow-line" />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {capabilities.map((item, index) => (
            <article
              data-reveal
              key={item.title}
              className="glass-card hover-lift rounded-[1.75rem] p-5"
              style={{ "--reveal-delay": `${180 + index * 70}ms` } as CSSProperties}
            >
              <span className="soft-chip inline-flex rounded-full px-3 py-1 text-xs">{item.tag}</span>
              <h2 className="text-main mt-4 text-xl font-semibold">{item.title}</h2>
              <p className="text-body mt-3 text-sm leading-relaxed">{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="craft" data-reveal style={{ "--reveal-delay": "160ms" } as CSSProperties} className="section-gap">
        <div className="mb-5 flex items-center gap-3">
          <p className="section-kicker font-mono text-xs tracking-[0.25em] uppercase">
            Craft Stack
          </p>
          <span className="eyebrow-line" />
        </div>
        <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
          <article className="glass-card hover-lift rounded-[1.9rem] p-6">
            <h2 className="text-main text-2xl font-semibold">Tools I Build With</h2>
            <div className="mt-4 space-y-4">
              {skillCategories.map((group) => (
                <div key={group.category} className="rounded-2xl border border-[var(--card-border)] p-3">
                  <p className="text-subtle text-xs uppercase tracking-[0.15em]">{group.category}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="soft-chip rounded-full px-3 py-1 text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
          <article className="glass-card hover-lift rounded-[1.9rem] p-6">
            <h2 className="text-main text-2xl font-semibold">Experience Highlights</h2>
            <div className="mt-4 space-y-3">
              {experienceItems.map((item) => (
                <div key={item.company} className="rounded-2xl border border-[var(--card-border)] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-main text-base font-semibold">{item.role}</p>
                    <span className="soft-chip rounded-full px-3 py-1 text-xs">{item.period}</span>
                  </div>
                  <p className="text-subtle mt-1 text-sm">{item.company}</p>
                  <ul className="text-body mt-3 space-y-2 text-sm leading-relaxed">
                    {item.achievements.slice(0, 3).map((achievement) => (
                      <li key={achievement}>- {achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="projects" data-reveal style={{ "--reveal-delay": "180ms" } as CSSProperties} className="section-gap">
        <div className="mb-5 flex items-center gap-3">
          <p className="section-kicker font-mono text-xs tracking-[0.25em] uppercase">
            Signature Work
          </p>
          <span className="eyebrow-line" />
        </div>

        {leadProject ? (
          <article className="glass-card hover-lift mb-6 rounded-[2rem] p-5 md:p-6">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div data-parallax data-parallax-intensity="5" className="project-frame rounded-[1.5rem] p-3">
                <ScreenshotPlaceholder
                  screenshot={leadProject.screenshots[0]}
                  title={leadProject.name}
                  note="Flagship project focus"
                  className="aspect-[16/10]"
                />
              </div>
              <div>
                <p className="section-kicker font-mono text-xs tracking-[0.2em] uppercase">
                  Featured Case Study
                </p>
                <h2 className="text-main mt-3 text-3xl font-semibold">{leadProject.name}</h2>
                <p className="text-body mt-3 text-sm leading-relaxed">{leadProject.longDescription}</p>
                <p className="text-main mt-4 rounded-xl border border-[var(--card-border)] px-3 py-2 text-sm font-medium">
                  Highlight: {leadProject.highlights[0]}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {leadProject.tech.map((tech) => (
                    <span key={`${leadProject.id}-${tech}`} className="soft-chip rounded-full px-3 py-1 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {leadProject.liveUrl ? (
                    <a
                      data-magnetic
                      href={leadProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-pop btn-solid rounded-full px-4 py-2 text-sm font-medium"
                    >
                      Live Demo
                    </a>
                  ) : null}
                  <a
                    data-magnetic
                    href={leadProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-pop hover-dark-invert rounded-full border border-[var(--card-border-strong)] px-4 py-2 text-sm font-medium"
                  >
                    GitHub Repo
                  </a>
                  <Link
                    data-magnetic
                    href={`/projects/${leadProject.id}`}
                    className="btn-pop hover-dark-invert rounded-full border border-[var(--card-border-strong)] px-4 py-2 text-sm font-medium"
                  >
                    View Case Study
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {remainingProjects.map((project, index) => (
            <article
              key={project.id}
              className="glass-card hover-lift reveal-up rounded-[1.75rem] p-5"
              style={{ animationDelay: `${240 + index * 90}ms` }}
            >
              <div className="project-frame rounded-[1.25rem] p-2.5">
                <ScreenshotPlaceholder
                  screenshot={project.screenshots[0]}
                  title={project.name}
                  note={project.highlights[0]}
                  className="aspect-[4/3]"
                />
              </div>
              <h3 className="text-main mt-4 text-xl font-semibold">{project.name}</h3>
              <p className="text-body mt-2 text-sm leading-relaxed">{project.shortDescription}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((tech) => (
                  <span key={`${project.id}-${tech}`} className="soft-chip rounded-full px-3 py-1 text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  data-magnetic
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pop hover-dark-invert rounded-full border border-[var(--card-border-strong)] px-4 py-2 text-sm font-medium"
                >
                  Repo
                </a>
                <Link
                  data-magnetic
                  href={`/projects/${project.id}`}
                  className="btn-pop hover-dark-invert rounded-full border border-[var(--card-border-strong)] px-4 py-2 text-sm font-medium"
                >
                  Case Study
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ProjectVisualsSection projects={featuredProjects} />

      <section id="about" data-reveal style={{ "--reveal-delay": "220ms" } as CSSProperties} className="section-gap">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="glass-card hover-lift rounded-[2rem] p-6 md:p-8">
            <p className="section-kicker font-mono text-xs tracking-[0.25em] uppercase">
              About Me
            </p>
            <p className="text-body mt-4 text-base leading-relaxed md:text-lg">
              {profile.bio} I care about turning technical work into tangible value for
              people who use the product every day. My approach prioritizes clarity,
              usability, and stable delivery over unnecessary complexity.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="metric-compact rounded-2xl p-3">
                <p className="text-subtle text-xs uppercase tracking-[0.15em]">Status</p>
                <p className="text-main mt-1 text-sm font-semibold">{profile.status}</p>
              </div>
              <div className="metric-compact rounded-2xl p-3">
                <p className="text-subtle text-xs uppercase tracking-[0.15em]">Availability</p>
                <p className="text-main mt-1 text-sm font-semibold">{profile.availability}</p>
              </div>
            </div>
          </article>

          <article className="glass-card hover-lift rounded-[2rem] p-6 md:p-8">
            <p className="section-kicker font-mono text-xs tracking-[0.25em] uppercase">
              Working Process
            </p>
            <ol className="mt-4 space-y-3">
              {processSteps.map((step, index) => (
                <li key={step} className="process-item flex gap-3 rounded-2xl p-3">
                  <span className="process-index flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                    {index + 1}
                  </span>
                  <p className="text-body text-sm leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </article>
        </div>
      </section>

      <section data-reveal style={{ "--reveal-delay": "260ms" } as CSSProperties} className="section-gap">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((item) => (
            <article key={item.value} className="glass-card hover-lift rounded-[1.5rem] p-4">
              <p className="text-main text-lg font-semibold">{item.value}</p>
              <p className="text-subtle mt-2 text-sm">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      {currentlyBuildingItems.length > 0 && (
        <section data-reveal style={{ "--reveal-delay": "300ms" } as CSSProperties} className="section-gap">
          <div className="mb-4 flex items-center gap-3">
            <p className="section-kicker font-mono text-xs tracking-[0.25em] uppercase">
              Currently Building
            </p>
            <span className="eyebrow-line" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {currentlyBuildingItems.map((item) => (
              <article key={item.title} className="glass-card hover-lift rounded-[1.75rem] p-5">
                <h3 className="text-main text-lg font-semibold">{item.title}</h3>
                <p className="text-body mt-2 text-sm leading-relaxed">{item.description}</p>
                <p className="text-subtle mt-4 text-xs">ETA: {item.eta}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section id="reviews" data-reveal style={{ "--reveal-delay": "340ms" } as CSSProperties} className="section-gap">
          <div className="mb-4 flex items-center gap-3">
            <p className="section-kicker font-mono text-xs tracking-[0.25em] uppercase">
              Testimonials
            </p>
            <span className="eyebrow-line" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {testimonials.map((item) => (
              <article key={item.name} className="glass-card hover-lift rounded-[1.75rem] p-5">
                <p className="text-body text-sm leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                <p className="text-main mt-4 text-sm font-semibold">{item.name}</p>
                <p className="text-subtle text-xs">
                  {item.role}
                  {item.company ? `, ${item.company}` : ""}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section id="contact" data-reveal style={{ "--reveal-delay": "380ms" } as CSSProperties} className="section-gap pb-10">
        <article className="glass-card hover-lift rounded-[2rem] p-6 md:p-8">
          <p className="section-kicker font-mono text-xs tracking-[0.25em] uppercase">
            Contact
          </p>
          <h2 className="text-main mt-3 text-3xl font-semibold md:text-4xl">
            Build something useful together.
          </h2>
          <p className="text-body mt-3 max-w-2xl text-sm leading-relaxed md:text-base">
            I&apos;m open to internship and entry-level opportunities where I can ship
            meaningful product work across mobile and web.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="soft-chip rounded-full px-4 py-2 text-sm font-medium"
            >
              {profile.email}
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="soft-chip rounded-full px-4 py-2 text-sm font-medium"
            >
              github.com/{profile.githubUsername}
            </a>
            <CopyEmailButton email={profile.email} />
            <a
              data-magnetic
              href={`mailto:${profile.email}`}
              className="btn-pop btn-solid rounded-full px-5 py-2.5 text-sm font-medium"
            >
              Start a Conversation
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}
