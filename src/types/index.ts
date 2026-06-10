export type ProfileData = {
  id: number;
  name: string;
  title: string;
  typingLines: string[];
  bio: string;
  avatarUrl: string;
  resumeUrl: string;
  cvUrl: string;
  email: string;
  githubUsername: string;
  location: string;
};

export type SocialLinkData = {
  id: string;
  platform: string;
  label: string;
  url: string;
  order: number;
};

export type SkillData = {
  id: string;
  name: string;
  logoUrl: string;
  category: string;
  order: number;
};

export type ProjectData = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  techStack: string[];
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type BlogPostData = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type EducationData = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  description: string;
  order: number;
};

export type CertificationData = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  imageUrl: string;
  order: number;
};

export type MessageData = {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  read: boolean;
  createdAt: string;
};
