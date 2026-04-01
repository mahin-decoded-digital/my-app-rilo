import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Code, Settings } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Services", id: "services" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => handleScroll(e, "root")} 
          className="flex items-center space-x-2 text-primary"
        >
          <Code className="h-8 w-8" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Savannah Lab
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {(NAV_LINKS ?? []).map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScroll(e, link.id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              aria-label="Toggle theme"
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === "light" && <Sun className="h-5 w-5" />}
              {theme === "dark" && <Moon className="h-5 w-5" />}
              {theme === "system" && <Settings className="h-5 w-5" />}
            </Button>
            <Button onClick={(e) => handleScroll(e as any, "contact")}>
              Get a Quote
            </Button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            aria-label="Toggle theme"
          >
            {theme === "light" && <Sun className="h-5 w-5" />}
            {theme === "dark" && <Moon className="h-5 w-5" />}
            {theme === "system" && <Settings className="h-5 w-5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="flex flex-col space-y-4 px-4 py-6">
            {(NAV_LINKS ?? []).map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                onClick={(e) => handleScroll(e, link.id)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-border">
              <Button 
                className="w-full" 
                onClick={(e) => handleScroll(e as any, "contact")}
              >
                Get a Quote
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}