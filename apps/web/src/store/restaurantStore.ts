import { create } from 'zustand';
import { Restaurant, MenuItem } from '@/types';
import { api } from '@/lib/api';

export interface RestaurantState {
  restaurants: Restaurant[];
  menuItems: MenuItem[];
  isLoading: boolean;
  error: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fetchData: () => Promise<void>;
  getFilteredRestaurants: () => Restaurant[];
  getRestaurantById: (id: string) => Restaurant | undefined;
  getMenuItemsByRestaurantId: (id: string) => MenuItem[];
}

export const useRestaurantStore = create<RestaurantState>()(
  (set, get) => ({
    restaurants: [],
    menuItems: [],
    isLoading: false,
    error: '',
    searchQuery: '',
    
    setSearchQuery: (query: string) => set({ searchQuery: query }),
    
    fetchData: async () => {
      set({ isLoading: true, error: '' });
      try {
        const [restaurantsRes, menuItemsRes] = await Promise.all([
          api.get<{ data: Restaurant[] }>('/restaurants'),
          api.get<{ data: MenuItem[] }>('/menu-items')
        ]);
        
        set({ 
          restaurants: restaurantsRes.data, 
          menuItems: menuItemsRes.data,
          isLoading: false 
        });
      } catch (err: any) {
        set({ error: err.message || 'Failed to fetch data', isLoading: false });
      }
    },
    
    getFilteredRestaurants: () => {
      const { restaurants, searchQuery } = get();
      if (!searchQuery.trim()) return restaurants;
      
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (restaurants ?? []).filter(
        (restaurant) => 
          restaurant.name.toLowerCase().includes(lowerCaseQuery) ||
          restaurant.description.toLowerCase().includes(lowerCaseQuery)
      );
    },
    
    getRestaurantById: (id: string) => {
      const { restaurants } = get();
      return (restaurants ?? []).find((restaurant) => restaurant.id === id);
    },

    getMenuItemsByRestaurantId: (id: string) => {
      const { menuItems } = get();
      return (menuItems ?? []).filter((menuItem) => menuItem.restaurantId === id);
    }
  })
);