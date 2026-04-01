import { create } from 'zustand';
import { CartItem, MenuItem } from '@/types/index';
import { api } from '@/lib/api';

const DELIVERY_FEE = 5.00;

export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string;
  fetchCart: () => Promise<void>;
  addItem: (item: MenuItem, quantity: number, restaurantName: string) => Promise<void>;
  updateItemQuantity: (menuItemId: string, quantity: number) => Promise<void>;
  removeItem: (menuItemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getItemCount: () => number;
  getDeliveryFee: () => number;
}

export const useCartStore = create<CartState>()(
  (set, get) => ({
    items: [],
    isLoading: false,
    error: '',

    fetchCart: async () => {
      set({ isLoading: true, error: '' });
      try {
        const { data } = await api.get<{ data: CartItem[] }>('/cart');
        set({ items: data, isLoading: false });
      } catch (err: any) {
        set({ error: err.message, isLoading: false });
      }
    },

    addItem: async (item, quantity, restaurantName) => {
      set({ isLoading: true, error: '' });
      try {
        const { data } = await api.post<{ data: CartItem[] }>('/cart', {
          item,
          quantity,
          restaurantName
        });
        set({ items: data, isLoading: false });
      } catch (err: any) {
        set({ error: err.message, isLoading: false });
      }
    },

    updateItemQuantity: async (menuItemId, quantity) => {
      set({ isLoading: true, error: '' });
      try {
        const { data } = await api.put<{ data: CartItem[] }>(`/cart/${menuItemId}`, { quantity });
        set({ items: data, isLoading: false });
      } catch (err: any) {
        set({ error: err.message, isLoading: false });
      }
    },

    removeItem: async (menuItemId) => {
      set({ isLoading: true, error: '' });
      try {
        const { data } = await api.delete<{ data: CartItem[] }>(`/cart/${menuItemId}`);
        set({ items: data, isLoading: false });
      } catch (err: any) {
        set({ error: err.message, isLoading: false });
      }
    },

    clearCart: async () => {
      set({ isLoading: true, error: '' });
      try {
        const { data } = await api.delete<{ data: CartItem[] }>('/cart');
        set({ items: data, isLoading: false });
      } catch (err: any) {
        set({ error: err.message, isLoading: false });
      }
    },

    getCartTotal: () => {
      const { items } = get();
      if (items.length === 0) return 0;
      
      const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return subtotal + DELIVERY_FEE;
    },

    getItemCount: () => {
      const { items } = get();
      return items.reduce((total, item) => total + item.quantity, 0);
    },

    getDeliveryFee: () => {
      const { items } = get();
      return items.length > 0 ? DELIVERY_FEE : 0;
    }
  })
);