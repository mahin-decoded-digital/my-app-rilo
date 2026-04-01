import { useNavigate } from 'react-router-dom';
import { Restaurant } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const navigate = useNavigate();

  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200"
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
    >
      <div className="aspect-[2/1] w-full overflow-hidden bg-muted">
        <img 
          src={restaurant.imageUrl} 
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-lg font-bold line-clamp-1 flex-1">{restaurant.name}</h3>
          <Badge variant="secondary" className="flex items-center gap-1 px-2 py-0.5 shrink-0">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            <span className="font-medium">{restaurant.rating.toFixed(1)}</span>
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
          {restaurant.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div>
            <span className="font-medium text-foreground">Delivery:</span> {restaurant.deliveryFee === 0 ? 'Free' : `$${restaurant.deliveryFee.toFixed(2)}`}
          </div>
          <div>
            <span className="font-medium text-foreground">Min:</span> ${restaurant.minOrder.toFixed(2)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}