import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import RestaurantDetailHeader from '@/components/RestaurantDetailHeader';
import MenuItemCard from '@/components/MenuItemCard';
import { useRestaurantStore } from '@/store/restaurantStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function RestaurantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const allRestaurants = useRestaurantStore((state) => state.restaurants);
  const allMenuItems = useRestaurantStore((state) => state.menuItems);
  const getRestaurantById = useRestaurantStore((state) => state.getRestaurantById);
  const getMenuItemsByRestaurantId = useRestaurantStore((state) => state.getMenuItemsByRestaurantId);
  
  const restaurant = useMemo(
    () => (id ? getRestaurantById(id) : undefined),
    [id, allRestaurants, getRestaurantById]
  );
  
  const menuItems = useMemo(
    () => (id ? getMenuItemsByRestaurantId(id) : []),
    [id, allMenuItems, getMenuItemsByRestaurantId]
  );

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Restaurant not found</h2>
          <Button onClick={() => navigate('/')} variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 md:px-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')} 
          className="mb-6 -ml-4 gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Back to restaurants
        </Button>
        
        <RestaurantDetailHeader restaurant={restaurant} />
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">Menu</h2>
          
          {(!menuItems || menuItems.length === 0) ? (
            <p className="text-muted-foreground">No menu items available for this restaurant.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(menuItems ?? []).map((item) => (
                <MenuItemCard 
                  key={item.id} 
                  menuItem={item} 
                  restaurantName={restaurant.name} 
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}