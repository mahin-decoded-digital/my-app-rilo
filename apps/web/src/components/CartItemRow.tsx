import { CartItem } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const increment = () => updateItemQuantity(item.menuItemId, item.quantity + 1);
  const decrement = () => updateItemQuantity(item.menuItemId, item.quantity - 1);
  const remove = () => removeItem(item.menuItemId);

  return (
    <div className="flex items-center justify-between py-4 border-b last:border-0">
      <div className="flex-1 pr-4">
        <h4 className="font-semibold text-sm md:text-base line-clamp-2">{item.name}</h4>
        <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">{item.restaurantName}</p>
        <p className="font-medium mt-1 text-sm">${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <div className="flex items-center border rounded-md h-9">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-full w-8 rounded-none hover:bg-muted" 
            onClick={decrement}
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <div className="w-10 text-center text-sm font-medium">
            {item.quantity}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-full w-8 rounded-none hover:bg-muted" 
            onClick={increment}
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0" 
          onClick={remove}
          aria-label="Remove item"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}