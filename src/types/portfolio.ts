export type ScreenshotAsset = {
  src: string;
  alt: string;
};

export type ProjectChallenge = {
  challenge: string;
  solution: string;
};

export type PortfolioProject = {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  tech: string[];
  repoUrl: string;
  liveUrl?: string;
  highlights: string[];
  problem: string;
  solution: string;
  features: string[];
  challenges: ProjectChallenge[];
  screenshots: ScreenshotAsset[];
  videoUrl?: string;
  isFeatured: boolean;
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  achievements: string[];
};

export type TestimonialItem = {
  name: string;
  role: string;
  company?: string;
  quote: string;
};

export type SkillCategory = {
  category: string;
  items: string[];
};

export type MetricItem = {
  label: string;
  value: string;
};

export type CurrentlyBuildingItem = {
  title: string;
  description: string;
  eta: string;
};
