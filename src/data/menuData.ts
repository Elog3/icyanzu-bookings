export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "food" | "drinks" | "snacks";
  subcategory: string;
  image?: string;
  popular?: boolean;
}

export const menuItems: MenuItem[] = [
  // Food - Main Dishes
  {
    id: "grilled-tilapia",
    name: "Grilled Tilapia",
    description: "Fresh Lake Kivu tilapia with herbs, served with fries and salad",
    price: 8500,
    category: "food",
    subcategory: "Main Dishes",
    popular: true,
  },
  {
    id: "beef-brochettes",
    name: "Beef Brochettes",
    description: "Tender grilled beef skewers with spiced vegetables and ugali",
    price: 7500,
    category: "food",
    subcategory: "Main Dishes",
    popular: true,
  },
  {
    id: "chicken-curry",
    name: "Rwandan Chicken Curry",
    description: "Aromatic chicken curry with coconut milk, served with rice",
    price: 6500,
    category: "food",
    subcategory: "Main Dishes",
  },
  {
    id: "grilled-goat",
    name: "Grilled Goat Meat",
    description: "Traditional grilled goat with roasted plantains",
    price: 9000,
    category: "food",
    subcategory: "Main Dishes",
  },
  {
    id: "vegetable-stew",
    name: "Mixed Vegetable Stew",
    description: "Hearty vegetable stew with beans, served with ugali",
    price: 4500,
    category: "food",
    subcategory: "Main Dishes",
  },
  // Food - Light Bites
  {
    id: "samosas",
    name: "Beef Samosas",
    description: "Crispy pastries filled with spiced minced beef (6 pieces)",
    price: 3500,
    category: "food",
    subcategory: "Light Bites",
    popular: true,
  },
  {
    id: "chips-ketchup",
    name: "French Fries",
    description: "Crispy golden fries with ketchup and mayo",
    price: 2500,
    category: "food",
    subcategory: "Light Bites",
  },
  {
    id: "chicken-wings",
    name: "Spicy Chicken Wings",
    description: "Crispy wings tossed in signature spicy sauce (8 pieces)",
    price: 5500,
    category: "food",
    subcategory: "Light Bites",
  },
  {
    id: "mixed-platter",
    name: "Mixed Appetizer Platter",
    description: "Samosas, wings, and fries with dipping sauces",
    price: 8000,
    category: "food",
    subcategory: "Light Bites",
  },
  // Drinks - Beers
  {
    id: "mützig",
    name: "Mützig",
    description: "Premium Rwandan lager beer (500ml)",
    price: 1500,
    category: "drinks",
    subcategory: "Beers",
    popular: true,
  },
  {
    id: "primus",
    name: "Primus",
    description: "Classic Rwandan beer (500ml)",
    price: 1200,
    category: "drinks",
    subcategory: "Beers",
  },
  {
    id: "skol",
    name: "Skol Lager",
    description: "Refreshing light beer (500ml)",
    price: 1200,
    category: "drinks",
    subcategory: "Beers",
  },
  {
    id: "heineken",
    name: "Heineken",
    description: "International premium lager (330ml)",
    price: 2000,
    category: "drinks",
    subcategory: "Beers",
  },
  // Drinks - Cocktails
  {
    id: "mojito",
    name: "Classic Mojito",
    description: "Rum, fresh mint, lime, sugar, and soda water",
    price: 4500,
    category: "drinks",
    subcategory: "Cocktails",
    popular: true,
  },
  {
    id: "passion-martini",
    name: "Passion Fruit Martini",
    description: "Vodka, passion fruit, vanilla, and prosecco",
    price: 5000,
    category: "drinks",
    subcategory: "Cocktails",
  },
  {
    id: "margarita",
    name: "Classic Margarita",
    description: "Tequila, triple sec, fresh lime juice",
    price: 4500,
    category: "drinks",
    subcategory: "Cocktails",
  },
  {
    id: "long-island",
    name: "Long Island Iced Tea",
    description: "Vodka, gin, rum, tequila, triple sec, cola",
    price: 5500,
    category: "drinks",
    subcategory: "Cocktails",
  },
  // Drinks - Soft Drinks
  {
    id: "coca-cola",
    name: "Coca-Cola",
    description: "Classic Coca-Cola (330ml)",
    price: 800,
    category: "drinks",
    subcategory: "Soft Drinks",
  },
  {
    id: "fanta",
    name: "Fanta Orange",
    description: "Refreshing orange soda (330ml)",
    price: 800,
    category: "drinks",
    subcategory: "Soft Drinks",
  },
  {
    id: "inyange-water",
    name: "Inyange Water",
    description: "Pure mineral water (500ml)",
    price: 500,
    category: "drinks",
    subcategory: "Soft Drinks",
  },
  {
    id: "fresh-juice",
    name: "Fresh Tropical Juice",
    description: "Freshly squeezed passion, mango, or pineapple",
    price: 2000,
    category: "drinks",
    subcategory: "Soft Drinks",
    popular: true,
  },
  // Snacks
  {
    id: "popcorn",
    name: "Buttered Popcorn",
    description: "Fresh buttered popcorn (large bucket)",
    price: 1500,
    category: "snacks",
    subcategory: "Snacks",
  },
  {
    id: "nuts-mix",
    name: "Mixed Nuts",
    description: "Premium roasted nuts selection",
    price: 2000,
    category: "snacks",
    subcategory: "Snacks",
  },
  {
    id: "ice-cream",
    name: "Ice Cream",
    description: "Two scoops of vanilla, chocolate, or strawberry",
    price: 2500,
    category: "snacks",
    subcategory: "Snacks",
    popular: true,
  },
  {
    id: "fruit-salad",
    name: "Fresh Fruit Salad",
    description: "Seasonal tropical fruits with honey drizzle",
    price: 3000,
    category: "snacks",
    subcategory: "Snacks",
  },
];

export const categories = [
  { id: "all", name: "All Items" },
  { id: "food", name: "Food" },
  { id: "drinks", name: "Drinks" },
  { id: "snacks", name: "Snacks" },
];

export function formatPrice(price: number): string {
  return `${price.toLocaleString()} RWF`;
}
