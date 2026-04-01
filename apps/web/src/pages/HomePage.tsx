import React, { useMemo } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import RestaurantCard from '@/components/RestaurantCard';
import { useRestaurantStore } from '@/store/restaurantStore';

export default function HomePage() {
  const searchQuery = useRestaurantStore((state) => state.searchQuery);
  const allRestaurants = useRestaurantStore((state) => state.restaurants);
  const getFilteredRestaurants = useRestaurantStore((state) => state.getFilteredRestaurants);

  // Using useMemo to prevent infinite renders while remaining reactive to store updates
  const restaurants = useMemo(
    () => getFilteredRestaurants(),
    [searchQuery, allRestaurants, getFilteredRestaurants]
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Discover Restaurants
            </h1>
            <p className="text-muted-foreground mt-1">
              Find your favorite food and get it delivered.
            </p>
          </div>
          <div className="w-full md:w-96">
            <SearchBar />
          </div>
        </div>

        {(!restaurants || restaurants.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-xl font-medium text-foreground">No restaurants found.</p>
            <p className="text-muted-foreground mt-2">Try adjusting your search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(restaurants ?? []).map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}