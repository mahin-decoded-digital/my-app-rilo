import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { TESTIMONIALS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star } from "lucide-react";

function TestimonialsSection() {
  const testimonials = TESTIMONIALS ?? [];
  
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 bg-background border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Client Testimonials
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here's what our partners have to say about working with Savannah Lab.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                <CardDescription className="font-medium text-primary">
                  {testimonial.role}, {testimonial.company}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="italic text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Portfolio />
        <TestimonialsSection />
        <section id="contact" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Tell us about your vision. Our team of experts will review your requirements and get back to you with a tailored proposal.
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}