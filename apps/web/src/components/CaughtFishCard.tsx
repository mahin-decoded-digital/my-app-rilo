import { useMemo } from 'react';
import { CaughtFish, Fish } from '@/types/game';
import { FISH_TYPES } from '@/data/fishData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CaughtFishCardProps {
  caughtFish: CaughtFish;
}

const rarityStyles: Record<Fish['rarity'], string> = {
  common: 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200',
  uncommon: 'bg-green-100 text-green-800 hover:bg-green-200 border-green-300',
  rare: 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300',
  legendary: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-400 shadow-sm font-bold tracking-wide',
};

export default function CaughtFishCard({ caughtFish }: CaughtFishCardProps) {
  const fishData = useMemo(() => {
    return FISH_TYPES.find((f) => f.id === caughtFish.fishId);
  }, [caughtFish.fishId]);

  if (!fishData) {
    return null;
  }

  return (
    <Card className="overflow-hidden flex flex-col items-center text-center transition-all hover:shadow-md hover:-translate-y-1 duration-200 bg-card">
      <CardHeader className="w-full p-4 pb-2">
        <div className="relative w-full aspect-square bg-muted/50 rounded-xl overflow-hidden mb-3 border border-border/50 shadow-inner">
          <img
            src={fishData.imageUrl}
            alt={fishData.name}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        <h3 className="font-bold text-lg leading-tight text-card-foreground">
          {fishData.name}
        </h3>
      </CardHeader>
      <CardContent className="w-full p-4 pt-0 flex flex-col items-center gap-2 mt-auto">
        <Badge 
          className={rarityStyles[fishData.rarity]} 
          variant="outline"
        >
          {fishData.rarity.toUpperCase()}
        </Badge>
        <div className="w-full bg-secondary/40 rounded-lg py-2 px-4 mt-2 flex justify-between items-center border border-border/50">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Total Caught
          </span>
          <span className="text-lg font-black text-foreground">
            {caughtFish.count}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}