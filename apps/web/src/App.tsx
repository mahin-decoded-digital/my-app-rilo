import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import FishingGamePage from "@/pages/FishingGamePage";
import FishCollectionPage from "@/pages/FishCollectionPage";
import HighScoresPage from "@/pages/HighScoresPage";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/play" element={<FishingGamePage />} />
          <Route path="/collection" element={<FishCollectionPage />} />
          <Route path="/highscores" element={<HighScoresPage />} />
        </Routes>
      </main>
      <Toaster position="top-center" richColors />
    </div>
  );
}