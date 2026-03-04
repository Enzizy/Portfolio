import Image from "next/image";
import type { ScreenshotAsset } from "@/types/portfolio";

type ScreenshotPlaceholderProps = {
  screenshot: ScreenshotAsset;
  title: string;
  note?: string;
  className?: string;
};

export default function ScreenshotPlaceholder({
  screenshot,
  title,
  note = "Add screenshot later",
  className = "",
}: ScreenshotPlaceholderProps) {
  const hasRealImage = Boolean(screenshot.src);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#1f1c1a]/12 bg-[#fffdf8] ${className}`}
    >
      {hasRealImage ? (
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className="placeholder-wave flex h-full min-h-44 w-full items-center justify-center bg-[linear-gradient(160deg,#fff9ef_0%,#f2e7d8_90%)] p-5">
          <div className="text-center">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#80574a]">
              Visual Placeholder
            </p>
            <p className="mt-2 text-base font-semibold text-[#2f2926]">{title}</p>
            <p className="mt-1 text-xs text-[#5f544d]">{note}</p>
          </div>
        </div>
      )}
    </div>
  );
}
