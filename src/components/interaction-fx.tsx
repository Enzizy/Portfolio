"use client";

import { useEffect } from "react";

export default function InteractionFX() {
  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const magneticNodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-magnetic]"),
    );
    const parallaxNodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );

    const cleanups: Array<() => void> = [];

    for (const node of magneticNodes) {
      const handleMove = (event: MouseEvent) => {
        const rect = node.getBoundingClientRect();
        const offsetX = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
        const offsetY = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
        node.style.setProperty("--mx", `${offsetX * 10}px`);
        node.style.setProperty("--my", `${offsetY * 10}px`);
      };

      const handleLeave = () => {
        node.style.setProperty("--mx", "0px");
        node.style.setProperty("--my", "0px");
      };

      node.addEventListener("mousemove", handleMove);
      node.addEventListener("mouseleave", handleLeave);

      cleanups.push(() => {
        node.removeEventListener("mousemove", handleMove);
        node.removeEventListener("mouseleave", handleLeave);
      });
    }

    for (const node of parallaxNodes) {
      const intensity = Number(node.dataset.parallaxIntensity ?? "8");

      const handleMove = (event: MouseEvent) => {
        const rect = node.getBoundingClientRect();
        const offsetX = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
        const offsetY = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
        node.style.setProperty("--px", `${offsetX * intensity}px`);
        node.style.setProperty("--py", `${offsetY * intensity}px`);
      };

      const handleLeave = () => {
        node.style.setProperty("--px", "0px");
        node.style.setProperty("--py", "0px");
      };

      node.addEventListener("mousemove", handleMove);
      node.addEventListener("mouseleave", handleLeave);

      cleanups.push(() => {
        node.removeEventListener("mousemove", handleMove);
        node.removeEventListener("mouseleave", handleLeave);
      });
    }

    return () => {
      for (const cleanup of cleanups) {
        cleanup();
      }
    };
  }, []);

  return null;
}
