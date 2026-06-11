import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ── Admin user ──
  const email = process.env.ADMIN_EMAIL || "tanvirrahmanaz@gmail.com";
  const password = process.env.ADMIN_PASSWORD || "changeme123";
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    update: { password: hash, name: "Tanvir Rahman" },
    create: { email, password: hash, name: "Tanvir Rahman" },
  });

  // ── Profile singleton ──
  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Tanvir Rahman",
      brandText: "Tanvir Rahman",
      title: "AI Engineer",
      bio: "AI Engineer focused on building intelligent systems that solve real problems. I work across the machine learning stack — from data pipelines and model training to deploying production-grade AI applications. Currently exploring deep learning, LLMs, and the systems that make them useful.",
      heroBadgeText: "ai · ml · systems",
      email,
      githubUsername: "tanvirrahmanaz",
    },
  });

  // ── Social links ──
  if ((await prisma.socialLink.count()) === 0) {
    await prisma.socialLink.createMany({
      data: [
        { platform: "github", label: "GitHub", url: "https://github.com/tanvirrahmanaz", order: 0 },
        { platform: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/tanvirrahmanaz", order: 1 },
        { platform: "youtube", label: "YouTube", url: "https://youtube.com/@tanvirrahmanaz", order: 2 },
      ],
    });
  }

  // ── Skills ──
  if ((await prisma.skill.count()) === 0) {
    await prisma.skill.createMany({
      data: [
        { name: "Python", category: "Languages", order: 0, logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "TensorFlow", category: "ML / AI", order: 1, logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
        { name: "PyTorch", category: "ML / AI", order: 2, logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
        { name: "scikit-learn", category: "ML / AI", order: 3, logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
        { name: "Pandas", category: "ML / AI", order: 4, logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
        { name: "JavaScript", category: "Languages", order: 5, logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "Next.js", category: "Web", order: 6, logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "PostgreSQL", category: "Tools", order: 7, logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "Docker", category: "Tools", order: 8, logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      ],
    });
  }

  // ── Demo projects ──
  if ((await prisma.project.count()) === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: "Image Classification Pipeline",
          slug: "image-classification-pipeline",
          summary: "End-to-end CNN pipeline for multi-class image classification with training dashboards and a deployed inference API.",
          content: "## Overview\n\nA production-style image classification system built with PyTorch.\n\n## Highlights\n\n- Custom CNN + transfer learning (ResNet-50)\n- Data augmentation and experiment tracking\n- FastAPI inference endpoint with Docker deployment\n\n## What I learned\n\nHandling class imbalance and serving models at low latency.",
          imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80",
          githubUrl: "https://github.com/tanvirrahmanaz",
          liveUrl: "",
          techStack: ["PyTorch", "FastAPI", "Docker"],
          featured: true,
          order: 0,
        },
        {
          title: "Sentiment Analyzer for Bangla Text",
          slug: "bangla-sentiment-analyzer",
          summary: "NLP model that classifies Bangla social media text into positive, negative and neutral sentiment.",
          content: "## Overview\n\nFine-tuned a multilingual transformer on a custom-labeled Bangla dataset.\n\n## Highlights\n\n- Data collection + cleaning pipeline\n- Fine-tuned mBERT, 89% F1\n- Simple web demo with live predictions",
          imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
          githubUrl: "https://github.com/tanvirrahmanaz",
          liveUrl: "",
          techStack: ["Transformers", "Python", "Hugging Face"],
          featured: true,
          order: 1,
        },
        {
          title: "ML Model Monitoring Dashboard",
          slug: "ml-monitoring-dashboard",
          summary: "Dashboard that tracks model drift, latency and prediction quality for deployed ML services.",
          content: "## Overview\n\nA monitoring layer for ML services with alerts on data drift.\n\n## Highlights\n\n- Drift detection with statistical tests\n- Real-time charts\n- Slack alert integration",
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
          githubUrl: "https://github.com/tanvirrahmanaz",
          liveUrl: "",
          techStack: ["Next.js", "PostgreSQL", "Python"],
          featured: true,
          order: 2,
        },
      ],
    });
  }

  // ── Demo blog post ──
  if ((await prisma.blogPost.count()) === 0) {
    await prisma.blogPost.create({
      data: {
        title: "Why I'm Betting on AI Engineering",
        slug: "why-im-betting-on-ai-engineering",
        excerpt: "A short note on why building with models — not just training them — is the most exciting place to be right now.",
        content: "Training models is only half the story. The other half — the part that actually touches people — is **engineering**: data pipelines, evaluation, deployment, monitoring.\n\n## The shift\n\nModels are becoming commodities. The differentiator is how well you wire them into real products.\n\n## What I'm focusing on\n\n- Solid ML fundamentals\n- Production deployment patterns\n- LLM application architecture\n\nMore posts coming soon — this blog is where I'll document the journey.",
        category: "AI",
        tags: ["ai", "career", "ml-engineering"],
        published: true,
      },
    });
  }

  // ── Education ──
  if ((await prisma.education.count()) === 0) {
    await prisma.education.createMany({
      data: [
        {
          institution: "Your University",
          degree: "B.Sc. in Computer Science & Engineering",
          field: "Machine Learning focus",
          startYear: "2021",
          endYear: "Present",
          description: "Coursework in algorithms, AI, and data science. Update this from the admin panel.",
          order: 0,
        },
      ],
    });
  }

  // ── Certification demo ──
  if ((await prisma.certification.count()) === 0) {
    await prisma.certification.create({
      data: {
        title: "Machine Learning Specialization",
        issuer: "Coursera · DeepLearning.AI",
        date: "2024",
        credentialUrl: "",
        order: 0,
      },
    });
  }

  console.log("Seed complete ✔");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
