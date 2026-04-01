import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import CartItemRow from '@/components/CartItemRow';
import CartSummary from '@/components/CartSummary';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:px-6">
        <div className="mb-8 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)} 
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Your Cart</h1>
        </div>

        {(!items || items.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-foreground">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Looks like you haven't added any food yet.</p>
            <Button onClick={() => navigate('/')} size="lg">
              Browse Restaurants
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-card rounded-lg border shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4 border-b pb-4 text-foreground">
                    Order Items
                  </h2>
                  <div className="flex flex-col">
                    {(items ?? []).map((item) => (
                      <CartItemRow key={item.menuItemId} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}