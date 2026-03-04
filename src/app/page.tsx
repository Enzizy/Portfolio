import Image from "next/image";
import Link from "next/link";
import CopyEmailButton from "@/components/copy-email-button";
import ProjectVisualsSection from "@/components/project-visuals-section";
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

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8 md:py-14">
      <section
        id="top"
        className="glass-card hover-lift reveal-up overflow-hidden rounded-3xl p-6 md:p-10"
      >
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#7d4e3f]">
              {profile.displayName} / {profile.githubUsername}
            </p>
            <h1 className="headline mt-4 text-4xl font-semibold md:text-6xl">
              {profile.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#493f39] md:text-lg">
              {profile.heroValueStatement}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#5d514a]">
              Focused on building real-world apps, dashboards, and backend-powered
              systems that improve workflows and user experience.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="btn-pop btn-solid rounded-full px-5 py-2.5 text-sm font-medium transition"
              >
                View Projects
              </a>
              <a
                href={profile.resumeFile}
                download
                className="btn-pop rounded-full border border-[#1f1c1a]/35 px-5 py-2.5 text-sm font-medium hover:bg-[#f8f0e3]"
              >
                Download CV
              </a>
              <a
                href="#contact"
                className="btn-pop hover-dark-invert rounded-full border border-[#1f1c1a] px-5 py-2.5 text-sm font-medium text-[#1f1c1a] transition"
              >
                Contact Me
              </a>
            </div>
          </div>

          <aside className="rounded-2xl border border-[#1f1c1a]/15 bg-[#fff6e9] p-5">
            <div className="mb-4 flex items-center gap-3 rounded-xl bg-white/70 p-3">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-[#1f1c1a]/20 bg-[#f6eee4]">
                <Image
                  src={profile.profileImage}
                  alt={`${profile.fullName} profile image`}
                  fill
                  className="object-cover"
                  sizes="64px"
                  priority
                />
              </div>
              <div>
                <p className="text-sm font-semibold">{profile.fullName}</p>
                <p className="text-xs text-[#6c5f58]">Replace with your actual photo</p>
              </div>
            </div>
            <p className="font-mono text-xs tracking-[0.22em] uppercase text-[#8a5a45]">
              Snapshot
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/75 p-3">
                <p className="font-mono text-xs text-[#6c5f58]">Active Since</p>
                <p className="mt-1 text-xl font-semibold">{profile.activeSince}</p>
              </div>
              <div className="rounded-xl bg-white/75 p-3">
                <p className="font-mono text-xs text-[#6c5f58]">Featured Repos</p>
                <p className="mt-1 text-xl font-semibold">{repoCount}</p>
              </div>
              <div className="col-span-2 rounded-xl bg-white/75 p-3">
                <p className="font-mono text-xs text-[#6c5f58]">Main Focus</p>
                <p className="mt-1 text-lg font-semibold">{profile.mainFocus}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section
        id="about"
        className="reveal-up-delay mt-8 grid gap-6 md:grid-cols-[1.25fr_0.75fr]"
      >
        <article className="glass-card hover-lift rounded-3xl p-6">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#7d4e3f]">
            About
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#3b332f]">{profile.bio}</p>
        </article>
        <article className="glass-card hover-lift rounded-3xl p-6">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#7d4e3f]">
            Quick Info
          </p>
          <ul className="mt-4 space-y-3 text-sm text-[#3b332f]">
            <li>
              Location: <span className="font-medium">{profile.location}</span>
            </li>
            <li>
              Status: <span className="font-medium">{profile.status}</span>
            </li>
            <li>
              Availability: <span className="font-medium">{profile.availability}</span>
            </li>
            <li>
              Email:{" "}
              <a
                href={`mailto:${profile.email}`}
                className="font-medium underline decoration-[#d9653b] decoration-2 underline-offset-3"
              >
                {profile.email}
              </a>
            </li>
            <li>
              GitHub:{" "}
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline decoration-[#d9653b] decoration-2 underline-offset-3"
              >
                github.com/{profile.githubUsername}
              </a>
            </li>
          </ul>
        </article>
      </section>

      <section id="skills" className="reveal-up mt-12" style={{ animationDelay: "130ms" }}>
        <div className="mb-4">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#7d4e3f]">
            Skills
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((group, index) => (
            <article
              key={group.category}
              className="glass-card hover-lift reveal-up rounded-2xl p-5"
              style={{ animationDelay: `${180 + index * 70}ms` }}
            >
              <h3 className="text-base font-semibold">{group.category}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#1f1c1a]/15 bg-[#fffdf8] px-3 py-1.5 text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="reveal-up mt-12" style={{ animationDelay: "180ms" }}>
        <div className="mb-4">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#7d4e3f]">
            Experience
          </p>
        </div>
        <div className="grid gap-4">
          {experienceItems.map((item, index) => (
            <article
              key={`${item.company}-${item.role}`}
              className="glass-card hover-lift reveal-up rounded-2xl p-6"
              style={{ animationDelay: `${240 + index * 90}ms` }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl font-semibold">{item.company}</h3>
                <span className="rounded-full bg-[#fff] px-3 py-1 text-xs">{item.period}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-[#5a4f48]">{item.role}</p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#3b332f]">
                {item.achievements.map((achievement) => (
                  <li key={achievement}>- {achievement}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="metrics" className="reveal-up mt-12" style={{ animationDelay: "240ms" }}>
        <div className="mb-4">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#7d4e3f]">
            Metrics & Achievements
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {metrics.map((item, index) => (
            <article
              key={item.value}
              className="glass-card hover-lift reveal-up rounded-2xl p-5"
              style={{ animationDelay: `${300 + index * 70}ms` }}
            >
              <p className="text-lg font-semibold">{item.value}</p>
              <p className="mt-1 text-sm text-[#5f544d]">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="reveal-up mt-12" style={{ animationDelay: "300ms" }}>
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#7d4e3f]">
            Featured Projects
          </p>
          <a
            href={`${profile.githubUrl}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium underline decoration-[#d9653b] decoration-2 underline-offset-3"
          >
            See all repositories
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <article
              key={project.id}
              className="glass-card hover-lift reveal-up rounded-2xl p-5"
              style={{ animationDelay: `${360 + index * 90}ms` }}
            >
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4e4540]">
                {project.shortDescription}
              </p>
              <p className="mt-3 rounded-xl bg-[#fff8ee] px-3 py-2 text-xs text-[#584c45]">
                Highlight: {project.highlights[0]}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={`${project.id}-${tech}`}
                    className="rounded-full border border-[#1f1c1a]/15 bg-[#fff] px-2.5 py-1 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-pop btn-solid rounded-full px-3.5 py-1.5 text-xs font-medium"
                  >
                    Live Demo
                  </a>
                ) : (
                  <span className="rounded-full border border-[#1f1c1a]/20 px-3.5 py-1.5 text-xs text-[#6b5e57]">
                    Live Demo (Soon)
                  </span>
                )}
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pop rounded-full border border-[#1f1c1a]/40 px-3.5 py-1.5 text-xs font-medium"
                >
                  GitHub Repo
                </a>
                <Link
                  href={`/projects/${project.id}`}
                  className="btn-pop rounded-full border border-[#1f1c1a]/40 px-3.5 py-1.5 text-xs font-medium"
                >
                  View Case Study
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ProjectVisualsSection projects={featuredProjects} />

      {currentlyBuildingItems.length > 0 && (
        <section
          id="currently-building"
          className="reveal-up mt-12"
          style={{ animationDelay: "520ms" }}
        >
          <div className="mb-4">
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#7d4e3f]">
              Currently Building
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {currentlyBuildingItems.map((item) => (
              <article key={item.title} className="glass-card hover-lift rounded-2xl p-5">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-[#4e4540]">{item.description}</p>
                <p className="mt-3 text-xs text-[#6b5e57]">ETA: {item.eta}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section id="testimonials" className="reveal-up mt-12" style={{ animationDelay: "580ms" }}>
          <div className="mb-4">
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#7d4e3f]">
              Testimonials
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {testimonials.map((item) => (
              <article key={item.name} className="glass-card hover-lift rounded-2xl p-5">
                <p className="text-sm leading-relaxed text-[#3b332f]">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="mt-3 text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-[#6c5f58]">
                  {item.role}
                  {item.company ? `, ${item.company}` : ""}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section id="contact" className="reveal-up mt-12 pb-8" style={{ animationDelay: "620ms" }}>
        <article className="glass-card hover-lift rounded-3xl p-6">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#7d4e3f]">
            Contact
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#4d433e]">
            Open to internship and entry-level roles where I can contribute to mobile,
            web, and backend-focused product teams.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-[#1f1c1a]/40 px-4 py-2 font-medium"
            >
              {profile.email}
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#1f1c1a]/40 px-4 py-2 font-medium"
            >
              GitHub
            </a>
            <CopyEmailButton email={profile.email} />
            <a
              href={`mailto:${profile.email}`}
              className="btn-pop btn-solid rounded-full px-4 py-2 font-medium"
            >
              Contact Me
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}
