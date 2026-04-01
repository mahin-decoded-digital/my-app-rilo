import { ArrowRight, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWork = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-32 lg:pt-36 lg:pb-40">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-50/80 to-background dark:from-blue-950/20 dark:to-background" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-800 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-8">
          <Code className="mr-2 h-4 w-4" />
          <span>Savannah Lab — Premium Software Consultancy</span>
        </div>
        
        <h1 className="mx-auto max-w-5xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-7xl mb-6">
          Turning Vision into <span className="text-blue-600 dark:text-blue-500">Code</span>
        </h1>
        
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl mb-10">
          We architect, design, and build high-end custom software solutions. 
          From scalable web applications to cutting-edge AI integrations, we deliver 
          technology that drives your business forward.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" onClick={scrollToContact} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
            Get a Quote
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" onClick={scrollToWork} className="w-full sm:w-auto border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-900 dark:hover:bg-blue-900/50 dark:hover:text-blue-300">
            View Our Work
          </Button>
        </div>
      </div>
    </section>
  );
}