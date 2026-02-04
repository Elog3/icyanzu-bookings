import { useState } from "react";
import { ShoppingCart, Minus, Plus, Trash2, Send, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/menuData";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function CartSheet() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
    tableNumber,
    setTableNumber,
  } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const handleSubmitOrder = async () => {
    if (!tableNumber.trim()) {
      toast.error("Please enter your table number");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("orders").insert({
      table_number: tableNumber,
      customer_name: customerName || null,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total_amount: totalPrice,
    });

    if (error) {
      console.error("Order error:", error);
      toast.error("Failed to submit order", {
        description: "Please try again or call a waiter.",
      });
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast.success("Order sent to waiter!", {
      description: `Table ${tableNumber} - Your order will be prepared shortly.`,
    });

    // Reset after showing success
    setTimeout(() => {
      clearCart();
      setTableNumber("");
      setCustomerName("");
      setIsSuccess(false);
      setOpen(false);
    }, 3000);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="default" size="lg" className="fixed bottom-6 right-6 z-50 rounded-full shadow-elegant h-14 px-6 gap-3">
          <ShoppingCart className="h-5 w-5" />
          <span className="font-semibold">{totalItems}</span>
          {totalItems > 0 && (
            <span className="text-sm opacity-90">• {formatPrice(totalPrice)}</span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">Your Order</SheetTitle>
        </SheetHeader>

        {isSuccess ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center animate-scale-in">
              <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                <Check className="h-10 w-10 text-success" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Order Sent!</h3>
              <p className="text-muted-foreground">
                Your waiter has been notified and will prepare your order shortly.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-4">
              {items.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Your cart is empty</p>
                  <p className="text-sm">Add items from the menu to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-primary text-sm font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-6 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(totalPrice)}</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Table Number *</label>
                    <Input
                      placeholder="Enter your table number (e.g., 12)"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="text-center text-lg font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Name (optional)</label>
                    <Input
                      placeholder="Enter your name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  size="xl"
                  className="w-full"
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending Order...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Order to Waiter
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
