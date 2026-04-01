import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import RestaurantDetailPage from '@/pages/RestaurantDetailPage';
import CartPage from '@/pages/CartPage';
import OrderConfirmationPage from '@/pages/OrderConfirmationPage';

import { useRestaurantStore } from '@/store/restaurantStore';
import { useCartStore } from '@/store/cartStore';
import { useOrderStore } from '@/store/orderStore';

export default function App() {
  const fetchRestaurants = useRestaurantStore(state => state.fetchData);
  const fetchCart = useCartStore(state => state.fetchCart);
  const fetchOrders = useOrderStore(state => state.fetchOrders);

  useEffect(() => {
    fetchRestaurants();
    fetchCart();
    fetchOrders();
  }, [fetchRestaurants, fetchCart, fetchOrders]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/order-confirm" element={<OrderConfirmationPage />} />
      {/* Fallback route to catch unmatched URLs */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}