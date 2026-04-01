import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CartSummary() {
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  // Select reactive slices
  const items = useCartStore((state) => state.items);
  const getDeliveryFee = useCartStore((state) => state.getDeliveryFee);
  const placeOrder = useOrderStore((state) => state.placeOrder);

  // Compute derived values safely
  const safeItems = items ?? [];
  const subtotal = safeItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = safeItems.length > 0 ? getDeliveryFee() : 0;
  const total = subtotal + deliveryFee;
  const itemCount = safeItems.reduce((count, item) => count + item.quantity, 0);

  const handleCheckout = async () => {
    if (safeItems.length === 0) return;
    
    setIsCheckingOut(true);
    try {
      const orderId = await placeOrder(safeItems, total);
      // Backend automatically clears cart, and placeOrder refetches it
      navigate("/order-confirm", { state: { orderId } });
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Failed to place order");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (safeItems.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="my-4 h-px w-full bg-border" />
        <div className="flex items-center justify-between font-semibold">
          <span>Total</span>
          <span className="text-lg">${total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          size="lg" 
          onClick={handleCheckout}
          disabled={safeItems.length === 0 || isCheckingOut}
        >
          {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
        </Button>
      </CardFooter>
    </Card>
  );
}