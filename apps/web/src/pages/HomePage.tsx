import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {Zap, Heart, Star, Ship} from "lucide-react";
import { useGameStore } from "@/store/gameStore";

export default function HomePage() {
  const navigate = useNavigate();
  const startGame = useGameStore((s) => s.startGame);

  async function handleStartFishing() {
    await startGame();
    navigate("/play");
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-blue-100 to-blue-50 min-h-[calc(100vh-4rem)]">
      <section className="w-full max-w-xl bg-card rounded-2xl shadow-md px-8 py-10 flex flex-col items-center text-center border border-border">
        <Ship className="size-14 md:size-20 text-blue-400 mb-4 animate-bounce" aria-hidden />
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-3 tracking-tight drop-shadow">Baby Fishing Adventures!</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-7 max-w-md">
          Cast your line, collect cute fish, and aim for a fishing high score! Safe, fun, and simple for everyone.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button onClick={handleStartFishing} className="w-full sm:w-auto" size="lg">
            <Zap className="mr-2 size-5" /> Start Fishing
          </Button>
          <Button onClick={() => navigate("/collection") } variant="outline" className="w-full sm:w-auto" size="lg">
            <Heart className="mr-2 size-5" /> View Collection
          </Button>
          <Button onClick={() => navigate("/highscores")} variant="secondary" className="w-full sm:w-auto" size="lg">
            <Star className="mr-2 size-5" /> High Scores
          </Button>
        </div>
      </section>
    </main>
  );
}