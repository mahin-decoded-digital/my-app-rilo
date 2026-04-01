import { Service, Project, Testimonial } from "@/types";

export const SERVICES: Service[] = [
  {
    id: "web",
    title: "Custom Web Apps",
    description: "High-performance, scalable web applications built with modern frontend frameworks and robust backend architectures.",
    icon: "Globe",
  },
  {
    id: "mobile",
    title: "Mobile Development",
    description: "Native and cross-platform mobile experiences that engage users and deliver seamless functionality across devices.",
    icon: "Phone",
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    description: "Secure, highly available cloud architectures leveraging AWS, Google Cloud, or Azure to scale your business.",
    icon: "Cloud",
  },
  {
    id: "ai",
    title: "AI Integration",
    description: "Intelligent systems and machine learning models integrated directly into your existing software workflows.",
    icon: "Sparkles",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Fintech Dashboard",
    description: "A comprehensive financial analytics dashboard for enterprise wealth management.",
    category: "Web App",
    imageUrl: "https://placehold.co/800x600/2563eb/ffffff?text=Fintech+Dashboard",
    link: "#",
  },
  {
    id: "proj-2",
    title: "HealthConnect",
    description: "Telemedicine mobile application connecting patients with healthcare professionals securely.",
    category: "Mobile",
    imageUrl: "https://placehold.co/800x600/10b981/ffffff?text=HealthConnect",
    link: "#",
  },
  {
    id: "proj-3",
    title: "Global Logistics API",
    description: "Scalable cloud-based tracking system handling millions of requests daily.",
    category: "Cloud",
    imageUrl: "https://placehold.co/800x600/8b5cf6/ffffff?text=Logistics+API",
    link: "#",
  },
  {
    id: "proj-4",
    title: "SmartRetail AI",
    description: "AI-powered inventory forecasting and customer personalization engine for e-commerce.",
    category: "AI Integration",
    imageUrl: "https://placehold.co/800x600/f59e0b/ffffff?text=SmartRetail+AI",
    link: "#",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Sarah Jenkins",
    role: "CTO",
    company: "Nexus Financial",
    content: "Savannah Lab transformed our legacy systems into a modern, lightning-fast web application. Their expertise in custom development is unmatched.",
    avatarUrl: "https://placehold.co/150x150/1e293b/ffffff?text=SJ",
  },
  {
    id: "test-2",
    name: "David Chen",
    role: "Founder",
    company: "MedStream Mobile",
    content: "The mobile app they delivered exceeded all our expectations. It's intuitive, robust, and has significantly increased our user engagement and retention.",
    avatarUrl: "https://placehold.co/150x150/1e293b/ffffff?text=DC",
  },
  {
    id: "test-3",
    name: "Elena Rodriguez",
    role: "VP of Engineering",
    company: "GlobalTech Solutions",
    content: "Migrating to their custom cloud infrastructure saved us 40% in monthly server costs while improving our uptime to 99.99%. Outstanding service.",
    avatarUrl: "https://placehold.co/150x150/1e293b/ffffff?text=ER",
  },
];