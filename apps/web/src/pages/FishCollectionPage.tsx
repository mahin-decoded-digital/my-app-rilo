import { useEffect, useMemo } from "react";
import { useCollectionStore } from "@/store/collectionStore";
import { FISH_TYPES } from "@/data/fishData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {Ship as FishIcon} from "lucide-react";
import CaughtFishCard from "@/components/CaughtFishCard";

export default function FishCollectionPage() {
  const caughtFishCollection = useCollectionStore((s) => s.caughtFishCollection);
  const fetchCollection = useCollectionStore((s) => s.fetchCollection);

  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  // Display sorted by rarity then name, most rare first
  const sortedFish = useMemo(() => {
    // Merge collection counts with FISH_TYPES details
    const allFish = Object.values(caughtFishCollection)
      .map((caught) => {
        const fishInfo = FISH_TYPES.find(f => f.id === caught.fishId);
        return fishInfo ? { fish: fishInfo, count: caught.count } : null;
      })
      .filter(Boolean) as { fish: typeof FISH_TYPES[0], count: number }[];
    const rarityOrder = { legendary: 4, rare: 3, uncommon: 2, common: 1 };
    return allFish.sort(
      (a, b) => (rarityOrder[b.fish.rarity] - rarityOrder[a.fish.rarity]) || a.fish.name.localeCompare(b.fish.name)
    );
  }, [caughtFishCollection]);

  const hasFish = Object.keys(caughtFishCollection).length > 0;

  return (
    <main className="py-10 px-4 min-h-[calc(100vh-4rem)] bg-gradient-to-b from-blue-50 to-sky-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2 text-center flex items-center gap-2">
        <FishIcon className="size-8 text-blue-400 mr-1" aria-hidden />
        My Fish Collection
      </h1>
      <Separator className="mb-6 max-w-lg mx-auto" />
      {hasFish ? (
        <div className="w-full max-w-5xl grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {(sortedFish ?? []).map(({ fish, count }) => (
            <CaughtFishCard key={fish.id} caughtFish={{ fishId: fish.id, count }} />
          ))}
        </div>
      ) : (
        <Card className="max-w-xl mx-auto text-center mt-12 border-2 border-dashed border-sky-300">
          <CardHeader>
            <div className="flex flex-col items-center">
              <FishIcon className="w-14 h-14 text-sky-300 mb-2 animate-bounce" aria-hidden />
              <CardTitle className="text-xl text-muted-foreground font-semibold">Your collection is empty!</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-3">Go fishing to discover and collect unique fish. Every catch counts!</p>
          </CardContent>
        </Card>
      )}
    </main>
  );
}