import React from 'react';
import { Mail, MapPin, Phone, Globe, MessageSquare, Code } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Code className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold tracking-tight text-foreground">
                Savannah<span className="text-primary">Lab</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Turning Vision into Code. Premium software development consultancy building scalable solutions for the modern web and beyond.
            </p>
            <div className="flex space-x-5">
              <a href="#" aria-label="Website" className="text-muted-foreground hover:text-primary transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#contact" aria-label="Contact" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Services</h3>
            <ul className="space-y-4">
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Custom Web Apps</a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Mobile Development</a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Cloud Infrastructure</a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">AI Integration</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <a href="#portfolio" className="text-muted-foreground hover:text-primary transition-colors">Our Work</a>
              </li>
              <li>
                <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Client Success</a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-muted-foreground">
                <MapPin className="w-5 h-5 mr-3 text-primary shrink-0 mt-0.5" />
                <span>123 Innovation Drive,<br />Tech District, CA 94103</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone className="w-5 h-5 mr-3 text-primary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Mail className="w-5 h-5 mr-3 text-primary shrink-0" />
                <span>hello@savannahlab.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Savannah Lab. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}