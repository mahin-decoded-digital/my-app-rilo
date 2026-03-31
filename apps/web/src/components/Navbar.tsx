import { Link, NavLink } from "react-router-dom";
import { Home, Zap, Heart, Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/play", label: "Play", icon: Zap },
  { to: "/collection", label: "Collection", icon: Heart },
  { to: "/highscores", label: "High Scores", icon: Star },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link 
          to="/"
          className="mr-6 flex items-center space-x-2 transition-opacity hover:opacity-80"
        >
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block text-xl text-primary">
            Baby Fishing!
          </span>
        </Link>
        
        <nav className="flex flex-1 items-center justify-end space-x-1 sm:space-x-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    buttonVariants({
                      variant: isActive ? "default" : "ghost",
                      size: "sm",
                    }),
                    "flex items-center gap-2 whitespace-nowrap rounded-full transition-colors"
                  )
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="hidden sm:block">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}