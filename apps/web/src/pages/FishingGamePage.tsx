import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import {Loader2, Ship as FishIcon} from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { FISH_TYPES } from "@/data/fishData";
import { cn } from "@/lib/utils";

export default function FishingGamePage() {
  const navigate = useNavigate();

  // Zustand selectors -- always subscribe only to the fields/actions needed
  const currentScore = useGameStore((s) => s.currentScore);
  const fishCaught = useGameStore((s) => s.fishCaughtThisSession);
  const isFishing = useGameStore((s) => s.isFishing);
  const activeFish = useGameStore((s) => s.activeFish);
  const showGameOverDialog = useGameStore((s) => s.showGameOverDialog);
  const fetchGame = useGameStore((s) => s.fetchGame);

  const castLine = useGameStore((s) => s.castLine);
  const reelIn = useGameStore((s) => s.reelIn);
  const endGame = useGameStore((s) => s.endGame);
  const confirmEndGame = useGameStore((s) => s.confirmEndGame);
  const cancelEndGame = useGameStore((s) => s.cancelEndGame);

  // Fetch current game state on mount
  useEffect(() => {
    fetchGame();
  }, [fetchGame]);

  // On dialog confirm, we should navigate home
  useEffect(() => {
    if (!showGameOverDialog) return;
  }, [showGameOverDialog]);

  // Find active fish details for display, if any
  const fishDisplay = useMemo(() => {
    if (!activeFish) return null;
    return FISH_TYPES.find((f) => f.id === activeFish.id) ?? activeFish;
  }, [activeFish]);

  function handleCastLine() {
    castLine();
  }
  function handleReelIn() {
    reelIn();
  }
  function handleEndGame() {
    endGame();
  }
  function handleConfirmEndGame() {
    confirmEndGame();
    navigate("/");
  }
  function handleCancelEndGame() {
    cancelEndGame();
  }

  return (
    <main className="flex flex-col items-center py-8 px-4 min-h-[calc(100vh-4rem)] bg-gradient-to-b from-cyan-100 to-blue-50">
      <div className="w-full max-w-2xl mx-auto">
        {/* Score & Stats Top Row */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-6 justify-center">
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Score</CardTitle>
              <CardDescription>Total Points</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold text-primary">{currentScore}</span>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Fish Caught</CardTitle>
              <CardDescription>In This Session</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold text-blue-700">{fishCaught.length}</span>
            </CardContent>
          </Card>
        </div>

        {/* Fishing Area */}
        <section className="my-8 flex flex-col items-center">
          <div className="relative w-full max-w-md aspect-[4/3] mb-8 rounded-xl overflow-hidden bg-blue-200 border-4 border-sky-200 flex items-center justify-center shadow-lg">
            {isFishing ? (
              <div className="flex flex-col justify-center items-center h-full w-full">
                <Skeleton className="w-32 h-32 mx-auto bg-blue-300 flex items-center justify-center">
                  <Loader2 className="animate-spin w-16 h-16 text-sky-500 mx-auto" aria-label="Fishing..." />
                </Skeleton>
                <span className="mt-4 animate-pulse text-sky-700 font-semibold text-xl">Waiting for a bite...</span>
              </div>
            ) : activeFish ? (
              <div className="flex flex-col items-center w-full h-full justify-center">
                <img
                  src={fishDisplay?.imageUrl}
                  alt={fishDisplay?.name ?? 'Caught fish'}
                  className="w-32 h-32 rounded-xl mx-auto border-2 border-sky-400 shadow-md bg-white object-contain"
                  draggable={false}
                />
                <span className={cn(
                  "mt-4 px-4 py-2 rounded-full text-lg font-bold shadow",
                  fishDisplay?.rarity === 'common' && 'bg-slate-100 text-slate-700',
                  fishDisplay?.rarity === 'uncommon' && 'bg-green-100 text-green-800',
                  fishDisplay?.rarity === 'rare' && 'bg-blue-100 text-blue-700',
                  fishDisplay?.rarity === 'legendary' && 'bg-yellow-100 text-yellow-800',
                )}>
                  {fishDisplay?.name} ({fishDisplay?.points} pts)
                </span>
                <span className="text-xs mt-1 text-muted-foreground font-medium uppercase">
                  {fishDisplay?.rarity}
                </span>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <FishIcon className="w-16 h-16 text-blue-400 drop-shadow animate-bounce mb-1" aria-hidden />
                <span className="text-lg font-medium text-sky-800 select-none">The water is calm...</span>
              </div>
            )}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-blue-400 via-blue-200/80 to-transparent opacity-40"></div>
          </div>
        </section>

        {/* Game Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Button
            type="button"
            size="lg"
            onClick={handleCastLine}
            disabled={isFishing || Boolean(activeFish)}
            className="w-full sm:w-auto"
          >
            Cast Line
          </Button>
          {activeFish && (
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={handleReelIn}
              className="w-full sm:w-auto"
            >
              Reel In
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleEndGame}
            disabled={isFishing}
            className="w-full sm:w-auto"
          >
            End Game
          </Button>
        </div>
      </div>

      {/* Game Over Dialog */}
      <Dialog open={showGameOverDialog} onOpenChange={(val) => !val && cancelEndGame()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl text-destructive flex items-center gap-2">
              Game Over!
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-3">
            <div className="text-lg font-medium flex items-center gap-2">
              <span className="text-muted-foreground">Your Score:</span> <span className="text-2xl text-primary font-bold">{currentScore}</span>
            </div>
            <div className="text-lg font-medium flex items-center gap-2">
              <span className="text-muted-foreground">Total Fish Caught:</span> <span className="text-2xl text-blue-600 font-bold">{fishCaught.length}</span>
            </div>
          </div>
          <DialogFooter className="flex flex-row gap-2 w-full mt-4 justify-end">
            <Button variant="outline" onClick={handleCancelEndGame}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmEndGame}>
              Confirm End Game
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}