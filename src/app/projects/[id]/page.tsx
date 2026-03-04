import Link from "next/link";
import { notFound } from "next/navigation";
import ScreenshotPlaceholder from "@/components/screenshot-placeholder";
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
    <main className="mx-auto w-full max-w-5xl px-5 py-8 md:px-8 md:py-14">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <Link
          href="/#projects"
          className="rounded-full border border-[#1f1c1a]/30 px-4 py-1.5 text-sm font-medium"
        >
          Back to Projects
        </Link>
        <div className="flex flex-wrap gap-2">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-pop rounded-full bg-[#1f1c1a] px-4 py-1.5 text-sm font-medium text-[#fdf8f1]"
            >
              Live Demo
            </a>
          ) : (
            <span className="rounded-full border border-[#1f1c1a]/20 px-4 py-1.5 text-sm text-[#6b5e57]">
              Live Demo (Soon)
            </span>
          )}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#1f1c1a]/40 px-4 py-1.5 text-sm font-medium"
          >
            GitHub Repo
          </a>
        </div>
      </div>

      <section className="glass-card reveal-up rounded-3xl p-6 md:p-8">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#7d4e3f]">
          Case Study
        </p>
        <h1 className="headline mt-3 text-4xl font-semibold md:text-5xl">{project.name}</h1>
        <p className="mt-4 text-base leading-relaxed text-[#493f39] md:text-lg">
          {project.longDescription}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={`${project.id}-${item}`}
              className="rounded-full border border-[#1f1c1a]/15 bg-[#fff] px-3 py-1 text-xs"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="glass-card hover-lift rounded-2xl p-5">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#80574a]">Overview</p>
          <p className="mt-3 text-sm leading-relaxed text-[#3b332f]">{project.shortDescription}</p>
        </article>
        <article className="glass-card hover-lift rounded-2xl p-5">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#80574a]">
            Highlight
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#3b332f]">{project.highlights[0]}</p>
        </article>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="glass-card hover-lift rounded-2xl p-5">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#80574a]">Problem</p>
          <p className="mt-3 text-sm leading-relaxed text-[#3b332f]">{project.problem}</p>
        </article>
        <article className="glass-card hover-lift rounded-2xl p-5">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#80574a]">Solution</p>
          <p className="mt-3 text-sm leading-relaxed text-[#3b332f]">{project.solution}</p>
        </article>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="glass-card hover-lift rounded-2xl p-5">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#80574a]">Features</p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#3b332f]">
            {project.features.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
        </article>
        <article className="glass-card hover-lift rounded-2xl p-5">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#80574a]">
            Challenges + Solutions
          </p>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#3b332f]">
            {project.challenges.map((item) => (
              <div key={item.challenge} className="rounded-xl bg-[#fff7eb] p-3">
                <p className="font-semibold">Challenge: {item.challenge}</p>
                <p className="mt-1">Solution: {item.solution}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-8">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#7d4e3f]">Visuals</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {project.screenshots.map((screenshot) => (
            <ScreenshotPlaceholder
              key={`${project.id}-${screenshot.alt}`}
              screenshot={screenshot}
              title={project.name}
              className="aspect-video"
            />
          ))}
        </div>
      </section>

      {project.videoUrl ? (
        <section className="mt-8">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#7d4e3f]">
            Demo Video
          </p>
          <div className="glass-card mt-4 rounded-2xl p-4">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-[#1f1c1a]/12">
              <iframe
                src={project.videoUrl}
                title={`${project.name} demo video`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
