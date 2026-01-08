import { Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MenuItem, formatPrice } from "@/data/menuData";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(item);
    toast.success(`${item.name} added to order`, {
      duration: 2000,
    });
  };

  return (
    <div className="bg-card rounded-xl p-4 shadow-card hover:shadow-elegant transition-shadow duration-300">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
            {item.popular && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-medium shrink-0">
                <Star className="h-3 w-3 fill-current" />
                Popular
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
            {item.description}
          </p>
          <p className="font-semibold text-primary">{formatPrice(item.price)}</p>
        </div>
        <Button
          size="icon"
          variant="default"
          className="shrink-0 h-10 w-10 rounded-full"
          onClick={handleAdd}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
