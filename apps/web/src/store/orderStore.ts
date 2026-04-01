import { create } from 'zustand';
import { Order, CartItem } from '@/types';
import { api } from '@/lib/api';
import { useCartStore } from './cartStore';

export interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string;
  fetchOrders: () => Promise<void>;
  placeOrder: (cartItems: CartItem[], total: number) => Promise<string>;
  getOrderById: (id: string) => Order | undefined;
}

export const useOrderStore = create<OrderState>()(
  (set, get) => ({
    orders: [],
    isLoading: false,
    error: '',
    
    fetchOrders: async () => {
      set({ isLoading: true, error: '' });
      try {
        const { data } = await api.get<{ data: Order[] }>('/orders');
        set({ orders: data, isLoading: false });
      } catch (err: any) {
        set({ error: err.message, isLoading: false });
      }
    },
    
    placeOrder: async (cartItems: CartItem[], total: number) => {
      set({ isLoading: true, error: '' });
      try {
        const { data } = await api.post<{ data: Order }>('/orders', { cartItems, total });
        
        // Also update local cart store to clear it out since the backend clears it
        const cartStore = useCartStore.getState();
        if (cartStore.fetchCart) {
          await cartStore.fetchCart();
        }
        
        set((state) => ({
          orders: [data, ...state.orders],
          isLoading: false
        }));
        
        return data.id;
      } catch (err: any) {
        set({ error: err.message, isLoading: false });
        throw err;
      }
    },
    
    getOrderById: (id: string) => {
      return get().orders.find((order) => order.id === id);
    },
  })
);