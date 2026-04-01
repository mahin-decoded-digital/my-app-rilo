import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/store/cartStore";
import { MenuItem } from "@/types";

interface MenuItemCardProps {
  menuItem: MenuItem;
  restaurantName: string;
}

export default function MenuItemCard({ menuItem, restaurantName }: MenuItemCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(menuItem, 1, restaurantName);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-4 flex gap-4 h-full">
        <div className="flex flex-col justify-between flex-1 space-y-2">
          <div>
            <h4 className="font-semibold text-lg leading-tight">{menuItem.name}</h4>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {menuItem.description}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="font-medium">
              ${menuItem.price.toFixed(2)}
            </span>
            <Button onClick={handleAddToCart} size="sm" className="shrink-0">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
        
        <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-md overflow-hidden bg-muted">
          <img
            src={menuItem.imageUrl}
            alt={menuItem.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </CardContent>
    </Card>
  );
}