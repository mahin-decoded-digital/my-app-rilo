import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
}

const PROJECTS: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform built with React, Node.js, and Stripe integration. Features real-time inventory management and user authentication.",
    imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=E-Commerce+App",
    tags: ["React", "Node.js", "Stripe", "Tailwind"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Full Stack"
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop kanban boards, and team workspaces.",
    imageUrl: "https://placehold.co/600x400/0f172a/ffffff?text=Task+Manager",
    tags: ["TypeScript", "React", "Firebase"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Frontend"
  },
  {
    id: "3",
    title: "AI Image Generator",
    description: "Web interface for an AI image generation model. Allows users to input prompts, adjust parameters, and save generated artwork.",
    imageUrl: "https://placehold.co/600x400/334155/ffffff?text=AI+Image+Gen",
    tags: ["Next.js", "OpenAI", "Prisma"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "AI"
  },
  {
    id: "4",
    title: "Financial Dashboard",
    description: "A comprehensive dashboard for visualizing personal finance data. Includes interactive charts, transaction categorizations, and budget tracking.",
    imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Fin+Dashboard",
    tags: ["React", "D3.js", "Tailwind"],
    githubUrl: "https://github.com",
    category: "Frontend"
  },
  {
    id: "5",
    title: "Real Estate API",
    description: "RESTful API service for a real estate platform. Includes advanced querying, geospatial search, and secure user authentication.",
    imageUrl: "https://placehold.co/600x400/0f172a/ffffff?text=Real+Estate+API",
    tags: ["Express", "MongoDB", "Jest"],
    githubUrl: "https://github.com",
    category: "Backend"
  },
  {
    id: "6",
    title: "Weather Progressive Web App",
    description: "A fast, offline-capable weather application providing detailed forecasts, radar maps, and severe weather alerts.",
    imageUrl: "https://placehold.co/600x400/334155/ffffff?text=Weather+PWA",
    tags: ["React", "PWA", "Service Workers"],
    liveUrl: "https://example.com",
    category: "Frontend"
  }
];

const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map(p => p.category)))];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return PROJECTS;
    }
    return PROJECTS.filter(project => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background text-foreground" id="portfolio">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Portfolio</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore some of my recent work across different domains, from complex web applications to robust backend APIs.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {CATEGORIES.map(category => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="rounded-full"
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground text-lg">No projects found for this category.</p>
            <Button 
              variant="link" 
              onClick={() => setActiveCategory("All")}
              className="mt-2"
            >
              View all projects
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="flex flex-col overflow-hidden group border-border shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="relative w-full h-48 overflow-hidden bg-muted">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm shadow-sm">
                      {project.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="p-4 md:p-6 pb-0 md:pb-0">
                  <CardTitle className="text-xl line-clamp-1">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-4 md:p-6 flex-grow">
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 md:p-6 pt-0 md:pt-0 flex justify-between gap-4 mt-auto">
                  {project.liveUrl && (
                    <Button asChild variant="default" size="sm" className="w-full gap-2">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  
                  {project.githubUrl && (
                    <Button asChild variant={project.liveUrl ? "outline" : "default"} size="sm" className="w-full gap-2">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  
                  {!project.liveUrl && !project.githubUrl && (
                    <Button disabled variant="outline" size="sm" className="w-full">
                      Private Project
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}