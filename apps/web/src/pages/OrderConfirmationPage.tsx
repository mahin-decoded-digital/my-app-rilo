import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { useOrderStore } from '@/store/orderStore';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { CheckCircle, Home, Receipt } from 'lucide-react';

export default function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const orders = useOrderStore((state) => state.orders);
  const getOrderById = useOrderStore((state) => state.getOrderById);
  
  const orderId = location.state?.orderId;
  
  const order = useMemo(() => {
    return orderId ? getOrderById(orderId) : undefined;
  }, [orderId, orders, getOrderById]);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
            <Receipt className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Order not found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find the details for this order.
          </p>
          <Button onClick={() => navigate('/')} className="gap-2">
            <Home className="w-4 h-4" /> Return to Home
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 md:px-6 max-w-3xl">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your order. Your food is being prepared.
          </p>
        </div>

        <Card className="overflow-hidden shadow-md">
          <CardHeader className="bg-muted/50 border-b pb-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Receipt className="w-5 h-5 text-muted-foreground" /> Order Details
              </CardTitle>
              <div className="text-sm font-medium text-muted-foreground">
                {new Date(order.timestamp).toLocaleString()}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Order ID: <span className="font-mono text-foreground">{order.id}</span>
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 text-foreground border-b pb-2">
              Items ordered
            </h3>
            <ul className="space-y-4">
              {(order.items ?? []).map((item, index) => (
                <li 
                  key={`${item.menuItemId}-${index}`} 
                  className="flex justify-between items-center py-2"
                >
                  <div className="flex gap-4 items-center">
                    <span className="font-medium bg-muted w-8 h-8 rounded flex items-center justify-center text-xs">
                      {item.quantity}x
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.restaurantName}</p>
                    </div>
                  </div>
                  <div className="font-medium text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 pt-4 border-t flex justify-between items-center">
              <span className="text-lg font-bold text-foreground">Total Paid</span>
              <span className="text-2xl font-bold text-primary">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 p-6 flex justify-center border-t">
            <Button onClick={() => navigate('/')} size="lg" className="w-full sm:w-auto gap-2">
              <Home className="w-4 h-4" /> Return to Home
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}