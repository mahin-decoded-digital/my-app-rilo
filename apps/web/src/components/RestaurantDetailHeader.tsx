import React from "react";
import { Restaurant } from "@/types";
import { Star, MapPin, CreditCard, Info } from "lucide-react";
import { Card } from "@/components/ui/card";

interface RestaurantDetailHeaderProps {
  restaurant: Restaurant;
}

export default function RestaurantDetailHeader({ restaurant }: RestaurantDetailHeaderProps) {
  if (!restaurant) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-muted md:h-64 lg:h-80">
        <img
          src={restaurant.imageUrl ?? "https://placehold.co/800x400/F0F0F0/000000?text=Restaurant"}
          alt={restaurant.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white md:bottom-6 md:left-6 md:right-6">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {restaurant.name}
          </h1>
        </div>
      </div>

      <Card className="p-4 md:p-6">
        <p className="mb-5 text-muted-foreground md:text-lg">
          {restaurant.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm md:gap-6">
          <div className="flex items-center gap-1.5 text-primary">
            <Star className="h-5 w-5 fill-current" />
            <span className="font-semibold text-foreground">
              {restaurant.rating?.toFixed(1) ?? "0.0"} Rating
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{restaurant.address}</span>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground">
            <CreditCard className="h-4 w-4" />
            <span>
              {restaurant.deliveryFee === 0
                ? "Free Delivery"
                : `$${(restaurant.deliveryFee ?? 0).toFixed(2)} Delivery`}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Info className="h-4 w-4" />
            <span>Min. Order: ${(restaurant.minOrder ?? 0).toFixed(2)}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}