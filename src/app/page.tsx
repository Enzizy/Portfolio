import Image from "next/image";
import Link from "next/link";
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

  return (
    <main className="page-shell mx-auto w-full max-w-6xl px-5 py-6 md:px-8 md:py-10">
      <header className="reveal-up sticky top-4 z-40 mb-8">
        <div className="nav-pill mx-auto flex w-full max-w-3xl items-center justify-between rounded-full px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-2">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-[var(--card-border)]">
              <Image
                src={profile.profileImage}
                alt={`${profile.fullName} profile image`}
                fill
                className="theme-profile-image theme-profile-image-light object-cover"
                sizes="36px"
                priority
              />
              <Image
                src={profile.darkProfileImage}
                alt={`${profile.fullName} dark mode profile image`}
                fill
                className="theme-profile-image theme-profile-image-dark object-cover"
                sizes="36px"
                priority
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-main">{profile.displayName}</p>
              <p className="truncate text-xs text-subtle">{profile.status}</p>
            </div>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            <a href="#projects" className="nav-link rounded-full px-4 py-2 text-sm">
              Projects
            </a>
            <a href={`#${reviewAnchor}`} className="nav-link rounded-full px-4 py-2 text-sm">
              {testimonials.length > 0 ? "Reviews" : "About"}
            </a>
            <a href="#contact" className="nav-link rounded-full px-4 py-2 text-sm">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section className="glass-card hover-lift reveal-up rounded-[2rem] p-6 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="soft-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium">
              <span className="h-2 w-2 rounded-full bg-[#68b65a]" />
              Available for work
            </div>
            <h1 className="headline mt-5 max-w-3xl text-5xl font-semibold leading-[0.95] md:text-7xl">
              Rolex
              <br />
              Zhyronne
              <br />
              Batican
            </h1>
            <p className="text-body mt-5 max-w-2xl text-base leading-relaxed md:text-lg">
              Developer focused on mobile apps, admin systems, and backend-powered web
              products. I build tools that make day-to-day operations clearer, faster,
              and easier to manage.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="btn-pop btn-solid rounded-full px-5 py-2.5 text-sm font-medium"
              >
                View Projects
              </a>
              <a
                href={profile.resumeFile}
                download
                className="btn-pop hover-dark-invert rounded-full border border-[var(--card-border-strong)] px-5 py-2.5 text-sm font-medium"
              >
                Download CV
              </a>
              <a
                href="#contact"
                className="btn-pop hover-dark-invert rounded-full border border-[var(--card-border-strong)] px-5 py-2.5 text-sm font-medium"
              >
                Contact Me
              </a>
            </div>
          </div>

          <aside className="surface-soft rounded-[1.75rem] border border-[var(--card-border)] p-5">
            <div className="mb-5 flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-[1.5rem] border border-[var(--card-border)]">
                <Image
                  src={profile.profileImage}
                  alt={`${profile.fullName} profile image`}
                  fill
                  className="theme-profile-image theme-profile-image-light object-cover"
                  sizes="80px"
                  priority
                />
                <Image
                  src={profile.darkProfileImage}
                  alt={`${profile.fullName} dark mode profile image`}
                  fill
                  className="theme-profile-image theme-profile-image-dark object-cover"
                  sizes="80px"
                  priority
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-main">{profile.fullName}</p>
                <p className="text-subtle text-xs">{profile.location}</p>
              </div>
            </div>
            <p className="section-kicker font-mono text-xs tracking-[0.25em] uppercase">
              Snapshot
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="glass-card rounded-2xl p-4">
                <p className="text-subtle font-mono text-xs">Active Since</p>
                <p className="mt-1 text-xl font-semibold text-main">{profile.activeSince}</p>
              </div>
              <div className="glass-card rounded-2xl p-4">
                <p className="text-subtle font-mono text-xs">Featured Repos</p>
                <p className="mt-1 text-xl font-semibold text-main">{repoCount}</p>
              </div>
              <div className="glass-card rounded-2xl p-4 sm:col-span-2">
                <p className="text-subtle font-mono text-xs">Main Focus</p>
                <p className="mt-1 text-lg font-semibold text-main">{profile.mainFocus}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="experience" className="reveal-up mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-card hover-lift rounded-[2rem] p-6 md:p-8">
          <div className="mb-5 flex items-center gap-3">
            <p className="section-kicker font-mono text-xs tracking-[0.25em] uppercase">
              Skills & Experience
            </p>
            <span className="eyebrow-line" />
          </div>
          <div className="space-y-5">
            {skillCategories.map((group) => (
              <div key={group.category}>
                <h2 className="text-main text-sm font-semibold">{group.category}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="soft-chip rounded-full px-3 py-1.5 text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {experienceItems.map((item, index) => (
            <article
              key={`${item.company}-${item.role}`}
              className="glass-card hover-lift reveal-up rounded-[2rem] p-6"
              style={{ animationDelay: `${120 + index * 80}ms` }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-main text-xl font-semibold">{item.role}</h2>
                  <p className="text-body mt-1 text-sm">
                    {item.company}
                  </p>
                </div>
                <span className="soft-chip rounded-full px-3 py-1 text-xs">{item.period}</span>
              </div>
              <ul className="text-body mt-4 space-y-2 text-sm leading-relaxed">
                {item.achievements.map((achievement) => (
                  <li key={achievement}>- {achievement}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="reveal-up mt-14" style={{ animationDelay: "180ms" }}>
        <div className="mb-5 flex items-center gap-3">
          <p className="section-kicker font-mono text-xs tracking-[0.25em] uppercase">
            Projects
          </p>
          <span className="eyebrow-line" />
        </div>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-main text-3xl font-semibold md:text-4xl">My Latest Projects</h2>
            <p className="text-body mt-2 max-w-2xl text-sm leading-relaxed">
              Product-focused work across HR, CRM, backend systems, and admin tools.
              Each project is documented with purpose, implementation details, and a
              case-study page.
            </p>
          </div>
          <a
            href={`${profile.githubUrl}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="text-main text-sm font-medium underline decoration-[var(--accent)] decoration-2 underline-offset-4"
          >
            See All
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <article
              key={project.id}
              className="glass-card hover-lift reveal-up rounded-[2rem] p-5"
              style={{ animationDelay: `${240 + index * 90}ms` }}
            >
              <div className="project-frame rounded-[1.5rem] p-3">
                <ScreenshotPlaceholder
                  screenshot={project.screenshots[0]}
                  title={project.name}
                  note={project.highlights[0]}
                  className="aspect-[16/10]"
                />
              </div>
              <div className="mt-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-main text-xl font-semibold">{project.name}</h3>
                    <p className="text-body mt-2 text-sm leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>
                  <span className="soft-chip rounded-full px-3 py-1 text-xs">
                    {project.tech[0]}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.slice(1).map((tech) => (
                    <span key={`${project.id}-${tech}`} className="soft-chip rounded-full px-3 py-1 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-pop btn-solid rounded-full px-4 py-2 text-sm font-medium"
                    >
                      Live Demo
                    </a>
                  ) : null}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-pop hover-dark-invert rounded-full border border-[var(--card-border-strong)] px-4 py-2 text-sm font-medium"
                  >
                    GitHub Repo
                  </a>
                  <Link
                    href={`/projects/${project.id}`}
                    className="btn-pop hover-dark-invert rounded-full border border-[var(--card-border-strong)] px-4 py-2 text-sm font-medium"
                  >
                    View Case Study
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ProjectVisualsSection projects={featuredProjects} />

      <section id="about" className="reveal-up mt-14" style={{ animationDelay: "220ms" }}>
        <div className="glass-card hover-lift rounded-[2rem] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <p className="section-kicker font-mono text-xs tracking-[0.25em] uppercase">
                  More About Myself
                </p>
                <span className="eyebrow-line" />
              </div>
              <p className="text-body max-w-3xl text-base leading-relaxed md:text-lg">
                {profile.bio} My work stays grounded in solving practical problems:
                reducing manual work, improving visibility, and building interfaces that
                people can actually navigate without friction. I am strongest when I can
                connect product thinking with implementation and turn messy workflows
                into something usable.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="btn-pop btn-solid rounded-full px-5 py-2.5 text-sm font-medium"
                >
                  Contact Me
                </a>
                <a
                  href={profile.resumeFile}
                  download
                  className="btn-pop hover-dark-invert rounded-full border border-[var(--card-border-strong)] px-5 py-2.5 text-sm font-medium"
                >
                  Download CV
                </a>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {metrics.map((item) => (
                <article key={item.value} className="surface-soft rounded-[1.5rem] border border-[var(--card-border)] p-4">
                  <p className="text-main text-lg font-semibold">{item.value}</p>
                  <p className="text-subtle mt-2 text-sm">{item.label}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {currentlyBuildingItems.length > 0 && (
        <section className="reveal-up mt-12" style={{ animationDelay: "260ms" }}>
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
        <section id="reviews" className="reveal-up mt-12" style={{ animationDelay: "300ms" }}>
          <div className="mb-4 flex items-center gap-3">
            <p className="section-kicker font-mono text-xs tracking-[0.25em] uppercase">
              Trusted by previous teammates
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

      <section id="contact" className="reveal-up mt-14 pb-10" style={{ animationDelay: "340ms" }}>
        <article className="glass-card hover-lift rounded-[2rem] p-6 md:p-8">
          <p className="section-kicker font-mono text-xs tracking-[0.25em] uppercase">
            Reach out anytime
          </p>
          <h2 className="text-main mt-3 text-3xl font-semibold md:text-4xl">
            Let&apos;s Stay Connected
          </h2>
          <p className="text-body mt-3 max-w-2xl text-sm leading-relaxed md:text-base">
            If you need someone who can contribute to mobile apps, dashboards, or
            backend-powered systems, I&apos;m open to internship and entry-level work.
            Reach out for collaborations, interviews, or project discussions.
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
              href={`mailto:${profile.email}`}
              className="btn-pop btn-solid rounded-full px-5 py-2.5 text-sm font-medium"
            >
              Contact Me
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}
