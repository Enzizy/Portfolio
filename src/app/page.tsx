import Image from "next/image";
import Link from "next/link";
import Hero3DStage from "@/components/hero-3d-stage";
import CopyEmailButton from "@/components/copy-email-button";
import { profile } from "@/data/profile";
import { featuredProjects } from "@/data/projects";
import { skillCategories } from "@/data/skills";

const strengths = [
  {
    title: "Mobile and Web Delivery",
    body: "I build practical products across Flutter, Android, Vue, Next.js, and backend-supported web systems.",
    tags: ["Flutter", "Kotlin", "Vue", "Next.js"],
  },
  {
    title: "Architecture That Stays Deployable",
    body: "I prefer maintainable app structure, clear validation, predictable data flow, and changes that can survive real project growth.",
    tags: ["Scalable", "Maintainable", "Production-ready"],
  },
  {
    title: "Developer Mindset, Product Focus",
    body: "My work is centered on usability, reliability, and business value instead of flashy complexity with weak implementation.",
    tags: ["Usability", "Reliability", "Practical"],
  },
];

const workingPrinciples = [
  "Understand the workflow problem before designing the interface.",
  "Keep implementation small, reviewable, and maintainable.",
  "Use open-source and built-in tooling where it reduces real complexity.",
  "Design for responsive behavior, loading states, empty states, and edge cases.",
];

const stackSummary = [
  {
    title: "Frontend",
    body: "Vue.js, Next.js, TypeScript, HTML, CSS, and Tailwind for clean, responsive product interfaces.",
  },
  {
    title: "Mobile",
    body: "Flutter and Kotlin for Android-focused apps with practical feature structure and clear service boundaries.",
  },
  {
    title: "Backend",
    body: "Node.js, Firebase, Supabase, PHP, and MySQL with validation, auth checks, and predictable data models.",
  },
  {
    title: "Workflow",
    body: "Product-minded builds that ship fast, stay understandable, and are easy to extend in real client or school projects.",
  },
];

export default function Home() {
  return (
    <main className="portfolio-page">
      <header className="site-header">
        <div className="container shell-nav">
          <Link href="/" className="brand-mark" aria-label="Go to homepage">
            <span className="brand-mark__eyebrow">Portfolio</span>
            <span className="brand-mark__name">{profile.fullName}</span>
          </Link>

          <nav className="site-nav" aria-label="Primary">
            <a href="#projects">Work</a>
            <a href="#expertise">Expertise</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="header-actions">
            <a href={`mailto:${profile.email}`} className="button button--ghost">
              Get in Touch
            </a>
          </div>
        </div>
      </header>

      <section className="hero-section" id="top">
        <Hero3DStage />
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>
              I design and build software for real workflows, mobile products, and modern web
              systems.
            </h1>
            <p className="hero-copy__body">
              BSIT student from {profile.location} focused on Flutter, Android, Vue, Node.js,
              Firebase, Supabase, and deployable systems. I care about maintainable architecture,
              usable interfaces, and shipping features that solve real operational problems.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="button button--primary">
                View Projects
              </a>
              <a href={profile.resumeFile} download className="button button--secondary">
                Read CV
              </a>
            </div>

            <dl className="hero-metrics hero-metrics--featured">
              <div>
                <dt>Base</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>{profile.mainFocus}</dd>
              </div>
              <div>
                <dt>Open To</dt>
                <dd>{profile.availability}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section-shell section-shell--muted" id="expertise">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Expertise</p>
            <h2>Stack choices shaped by real implementation, not trend chasing.</h2>
            <p>
              The structure follows the Stitch light-mode direction, but the actual content is
              grounded in your existing profile, stack, and project history.
            </p>
          </div>

          <div className="bento-grid">
            <article className="bento-card bento-card--feature">
              <span className="bento-icon">▣</span>
              <h3>System Thinking</h3>
              <p>
                I design features around data flow, permissions, validation, and long-term
                maintainability so a project can grow without turning brittle.
              </p>
              <div className="tag-row">
                <span>Architecture</span>
                <span>Validation</span>
                <span>Deployment</span>
              </div>
            </article>

            {stackSummary.map((item) => (
              <article key={item.title} className="bento-card">
                <p className="card-label">{item.title}</p>
                <p className="card-body">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="strength-grid">
            {strengths.map((item) => (
              <article key={item.title} className="surface-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <div className="tag-row">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell" id="projects">
        <div className="container">
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">Selected Work</p>
              <h2>Projects built around workflow problems, admin systems, and usable interfaces.</h2>
            </div>
            <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="text-link">
              Explore GitHub
            </a>
          </div>

          <div className="project-grid">
            {featuredProjects.map((project, index) => (
              <article
                key={project.id}
                className={`project-card ${index === 0 ? "project-card--featured" : ""}`}
              >
                <div className="project-card__visual" aria-hidden="true">
                  <div className="project-card__mesh" />
                  <div className="project-card__wireframe">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <div className="project-card__content">
                  <p className="card-label">{project.name}</p>
                  <h3>{project.shortDescription}</h3>
                  <p>{project.longDescription}</p>

                  <ul className="feature-list">
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>

                  <div className="tag-row">
                    {project.tech.map((tech) => (
                      <span key={`${project.id}-${tech}`}>{tech}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <Link href={`/projects/${project.id}`} className="button button--primary">
                      Case Study
                    </Link>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="button button--secondary"
                    >
                      Repository
                    </a>
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="button button--ghost"
                      >
                        Live Demo
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-shell--muted" id="about">
        <div className="container about-grid">
          <div className="about-portrait">
            <div className="about-portrait__frame">
              <div className="about-portrait__image">
                <Image
                  src={profile.profileImage}
                  alt={`${profile.fullName} profile image`}
                  fill
                  sizes="(max-width: 768px) 320px, 420px"
                  className="theme-profile-image theme-profile-image-light object-cover"
                />
                <Image
                  src={profile.darkProfileImage}
                  alt={`${profile.fullName} dark mode profile image`}
                  fill
                  sizes="(max-width: 768px) 320px, 420px"
                  className="theme-profile-image theme-profile-image-dark object-cover"
                />
              </div>
            </div>
          </div>

          <div className="about-copy">
            <p className="eyebrow">About Me</p>
            <h2>Student developer with a practical bias toward software people can actually use.</h2>
            <p>
              {profile.bio} I prefer clean implementation over inflated architecture, and I care
              about how a system behaves after real users start relying on it.
            </p>

            <div className="surface-panel">
              <h3>Working principles</h3>
              <ul className="principles-list">
                {workingPrinciples.map((principle) => (
                  <li key={principle}>{principle}</li>
                ))}
              </ul>
            </div>

            <div className="skill-groups">
              {skillCategories.slice(0, 3).map((group) => (
                <div key={group.category} className="skill-group">
                  <p className="card-label">{group.category}</p>
                  <div className="tag-row">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell" id="contact">
        <div className="container">
          <div className="contact-panel">
            <div className="contact-panel__copy">
              <p className="eyebrow">Contact</p>
              <h2>Build something useful together.</h2>
              <p>
                I&apos;m looking for opportunities where I can contribute to mobile apps, web
                platforms, admin systems, or developer-facing tools with strong implementation
                quality.
              </p>
            </div>

            <div className="contact-panel__actions">
              <a href={`mailto:${profile.email}`} className="button button--primary">
                {profile.email}
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="button button--secondary"
              >
                github.com/{profile.githubUsername}
              </a>
              <CopyEmailButton email={profile.email} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
