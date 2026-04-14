"use client";

import { useEffect, useRef } from "react";

export default function PremiumVFX() {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) {
      return;
    }

    let raf = 0;
    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.3;
    let x = targetX;
    let y = targetY;

    const animate = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      glow.style.transform = `translate3d(${x - 240}px, ${y - 240}px, 0)`;
      raf = window.requestAnimationFrame(animate);
    };

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="vfx-grid-overlay" aria-hidden="true" />
      <div className="vfx-noise-overlay" aria-hidden="true" />
      <div ref={glowRef} className="vfx-cursor-glow" aria-hidden="true" />
    </>
  );
}
