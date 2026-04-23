import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export default async function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="project-detail-page">
      <div className="container project-detail-stack">
        <div className="project-nav">
          <Link href="/#projects" className="button button--secondary">
            Back to Projects
          </Link>

          <div className="project-actions">
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
                className="button button--primary"
              >
                Live Demo
              </a>
            ) : null}
          </div>
        </div>

        <section className="project-detail-hero">
          <article className="project-detail-panel">
            <p className="eyebrow">Case Study</p>
            <h1>{project.name}</h1>
            <p>{project.longDescription}</p>

            <div className="tag-row">
              {project.tech.map((item) => (
                <span key={`${project.id}-${item}`}>{item}</span>
              ))}
            </div>
          </article>

          <aside className="project-detail-metrics">
            <div>
              <dt>Primary Outcome</dt>
              <dd>{project.highlights[0]}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{project.tech.join(" · ")}</dd>
            </div>
            <div>
              <dt>Project Type</dt>
              <dd>{project.liveUrl ? "Deployed web product" : "Build and case study"}</dd>
            </div>
          </aside>
        </section>

        <section className="project-detail-grid">
          <article className="case-study-card">
            <p className="card-label">Problem</p>
            <p>{project.problem}</p>
          </article>

          <article className="case-study-card">
            <p className="card-label">Solution</p>
            <p>{project.solution}</p>
          </article>

          <article className="case-study-card">
            <p className="card-label">Core Features</p>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>

          <article className="case-study-card">
            <p className="card-label">Challenges</p>
            <ul>
              {project.challenges.map((item) => (
                <li key={item.challenge}>
                  <strong>Challenge:</strong> {item.challenge}
                  <br />
                  <strong>Solution:</strong> {item.solution}
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </main>
  );
}
