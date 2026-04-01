import React from 'react';
import { SERVICES } from "@/lib/constants";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  Globe, 
  Phone, 
  Cloud, 
  Zap, 
  Code, 
  Shield, 
  Database, 
  LayoutDashboard,
  Terminal
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Phone,
  Cloud,
  Zap,
  Code,
  Shield,
  Database,
  LayoutDashboard,
  Terminal
};

export default function Services() {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4">
            Our Core Competencies
          </h2>
          <p className="text-lg text-muted-foreground">
            We deliver end-to-end custom development services to transform your complex business challenges into elegant, scalable digital solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(SERVICES ?? []).map((service) => {
            const Icon = iconMap[service.icon] || Code;
            
            return (
              <Card 
                key={service.id} 
                className="group border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/50"
              >
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-colors group-hover:bg-primary/20">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}