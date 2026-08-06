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

  // ── Real projects from Tanvir's GitHub ──
  const projects = [
    {
      title: "SMS Spam Classifier",
      slug: "sms-spam-classifier",
      summary: "An NLP web application that classifies text messages as spam or legitimate using a trained machine-learning model.",
      content: "## Overview\n\nA practical machine-learning application for detecting spam messages from user-provided text. The project combines NLP preprocessing, a scikit-learn classification pipeline, and a simple Streamlit interface.\n\n## Highlights\n\n- Text cleaning and NLP preprocessing\n- Spam-versus-ham classification\n- Interactive browser-based prediction interface\n- Public deployment for live testing",
      imageUrl: "https://opengraph.githubassets.com/1/tanvirrahmanaz/SMS-Spam-Classifier-Model",
      githubUrl: "https://github.com/tanvirrahmanaz/SMS-Spam-Classifier-Model",
      liveUrl: "https://sms-spam-classifier-model.onrender.com/",
      techStack: ["Python", "scikit-learn", "NLTK", "Streamlit"],
      featured: true,
      order: 0,
    },
    {
      title: "Topic Modeling",
      slug: "topic-modeling",
      summary: "A natural-language-processing project that explores hidden themes and patterns inside collections of text.",
      content: "## Overview\n\nA notebook-based NLP project focused on topic-modeling workflows and exploratory analysis of textual datasets.\n\n## Highlights\n\n- Text preparation and preprocessing\n- Topic discovery experiments\n- Exploratory NLP analysis\n- Reproducible notebook workflow",
      imageUrl: "https://opengraph.githubassets.com/1/tanvirrahmanaz/Topic_modeling",
      githubUrl: "https://github.com/tanvirrahmanaz/Topic_modeling",
      liveUrl: "",
      techStack: ["Python", "NLP", "Topic Modeling", "Jupyter"],
      featured: true,
      order: 1,
    },
    {
      title: "Machine Learning Project Collection",
      slug: "machine-learning-project-collection",
      summary: "A collection of machine-learning notebooks and experiments covering data preparation, model training, and evaluation.",
      content: "## Overview\n\nA growing collection of practical machine-learning work used to explore datasets, prepare features, train models, and evaluate results.\n\n## Highlights\n\n- Data cleaning and exploratory analysis\n- Feature preparation\n- Model-training experiments\n- Evaluation and comparison workflows",
      imageUrl: "https://opengraph.githubassets.com/1/tanvirrahmanaz/ML_project",
      githubUrl: "https://github.com/tanvirrahmanaz/ML_project",
      liveUrl: "",
      techStack: ["Python", "scikit-learn", "Pandas", "Jupyter"],
      featured: true,
      order: 2,
    },
    {
      title: "Deep Learning Lab",
      slug: "deep-learning-lab",
      summary: "Hands-on deep-learning experiments for building an understanding of neural networks and model-training workflows.",
      content: "## Overview\n\nA learning-focused repository containing deep-learning experiments and notebooks. It documents practical work with neural-network concepts and training workflows.\n\n## Highlights\n\n- Neural-network experimentation\n- Model-training practice\n- Notebook-based learning workflow\n- Ongoing deep-learning study",
      imageUrl: "https://opengraph.githubassets.com/1/tanvirrahmanaz/Deep-Learning",
      githubUrl: "https://github.com/tanvirrahmanaz/Deep-Learning",
      liveUrl: "",
      techStack: ["Python", "Deep Learning", "Neural Networks", "Jupyter"],
      featured: true,
      order: 3,
    },
    {
      title: "Room Mate Finder",
      slug: "room-mate-finder",
      summary: "A full-stack platform for publishing room listings and helping users search, filter, save, and connect with potential roommates.",
      content: "## Overview\n\nA responsive full-stack roommate-finding platform with secure authentication, room-listing management, advanced filtering, favorites, and owner contact features.\n\n## Highlights\n\n- JWT authentication and protected APIs\n- Room-listing CRUD and availability tracking\n- Search, sorting, filtering, and pagination\n- Favorites and owner-contact flow\n- Separate React client and Express API\n\n## Repositories\n\n- [Client](https://github.com/tanvirrahmanaz/room-mate-finder-client)\n- [Server](https://github.com/tanvirrahmanaz/room-mate-finder-server)",
      imageUrl: "https://opengraph.githubassets.com/1/tanvirrahmanaz/room-mate-finder-client",
      githubUrl: "https://github.com/tanvirrahmanaz/room-mate-finder-client",
      liveUrl: "https://room-mate-finderbd.web.app/",
      techStack: ["React", "Tailwind CSS", "Express", "MongoDB"],
      featured: true,
      order: 4,
    },
    {
      title: "CourseFlow",
      slug: "courseflow",
      summary: "A full-stack course-management platform where students enroll in courses and instructors securely manage their own content.",
      content: "## Overview\n\nCourseFlow provides separate student and instructor experiences. Students can discover and enroll in courses, while instructors can create, update, and delete courses through a protected dashboard.\n\n## Highlights\n\n- Firebase email-and-password authentication\n- JWT-protected backend endpoints\n- Course search and detailed course pages\n- Enrollment management with seat limits\n- Instructor-owned course CRUD\n- Responsive interface and live deployment",
      imageUrl: "https://opengraph.githubassets.com/1/tanvirrahmanaz/course-management",
      githubUrl: "https://github.com/tanvirrahmanaz/course-management",
      liveUrl: "https://course-management-bd.web.app/",
      techStack: ["React", "Firebase", "Express", "MongoDB"],
      featured: true,
      order: 5,
    },
  ];

  // Remove the placeholder projects that shipped with the template.
  await prisma.project.deleteMany({
    where: {
      slug: {
        in: [
          "image-classification-pipeline",
          "bangla-sentiment-analyzer",
          "ml-monitoring-dashboard",
        ],
      },
    },
  });

  // Upsert real projects so rerunning the seed also updates an existing database.
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
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
