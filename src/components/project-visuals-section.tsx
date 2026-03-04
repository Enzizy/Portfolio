"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PortfolioProject } from "@/types/portfolio";
import ScreenshotPlaceholder from "@/components/screenshot-placeholder";

type ProjectVisualsSectionProps = {
  projects: PortfolioProject[];
};

export default function ProjectVisualsSection({
  projects,
}: ProjectVisualsSectionProps) {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? null,
    [activeProjectId, projects],
  );

  return (
    <section id="visuals" className="reveal-up mt-12" style={{ animationDelay: "360ms" }}>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#7d4e3f]">
          Project Visuals
        </p>
        <p className="text-xs text-[#6f6159]">
          Click preview to open placeholder modal
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className="glass-card hover-lift reveal-up rounded-2xl p-4"
            style={{ animationDelay: `${420 + index * 90}ms` }}
          >
            <button
              type="button"
              onClick={() => setActiveProjectId(project.id)}
              className="w-full text-left"
            >
              <ScreenshotPlaceholder
                screenshot={project.screenshots[0]}
                title={project.name}
                className="aspect-video"
              />
            </button>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold">{project.name}</h3>
                <p className="text-xs text-[#6f6159]">Add screenshot later</p>
              </div>
              <Link
                href={`/projects/${project.id}`}
                className="text-sm font-medium underline decoration-[#d9653b] decoration-2 underline-offset-3"
              >
                Case Study
              </Link>
            </div>
          </article>
        ))}
      </div>

      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setActiveProjectId(null)}
          role="presentation"
        >
          <div
            className="glass-card w-full max-w-3xl rounded-3xl p-5 md:p-6"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProject.name} visual preview`}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold">{activeProject.name} Preview</h3>
              <button
                type="button"
                className="btn-pop hover-dark-invert rounded-full border border-[#1f1c1a]/25 px-3 py-1 text-sm"
                onClick={() => setActiveProjectId(null)}
              >
                Close
              </button>
            </div>
            <ScreenshotPlaceholder
              screenshot={activeProject.screenshots[0]}
              title={activeProject.name}
              className="aspect-video"
            />
            <p className="mt-3 text-sm text-[#5f544d]">
              Placeholder preview is ready. Replace `screenshots` in `src/data/projects.ts`
              with real image paths when available.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
