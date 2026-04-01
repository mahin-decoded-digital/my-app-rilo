import { Restaurant, MenuItem } from '@/types';

export const mockRestaurants: Restaurant[] = [
  {
    id: 'r1',
    name: 'Burger Joint',
    description: 'The best classic, smashed, and gourmet burgers in town. Locally sourced beef and fresh veggies.',
    imageUrl: 'https://placehold.co/400x200/FFBB00/FFFFFF?text=Burger+Joint',
    rating: 4.8,
    deliveryFee: 2.99,
    minOrder: 15,
    address: '123 Main St, Foodville, FL 33010'
  },
  {
    id: 'r2',
    name: 'Pizza Palace',
    description: 'Authentic wood-fired Neapolitan pizzas with a modern twist. Hot, fresh, and cheesy!',
    imageUrl: 'https://placehold.co/400x200/E53935/FFFFFF?text=Pizza+Palace',
    rating: 4.5,
    deliveryFee: 0,
    minOrder: 20,
    address: '456 Elm St, Foodville, FL 33012'
  },
  {
    id: 'r3',
    name: 'Sushi Central',
    description: 'Premium sushi rolls, fresh sashimi, and traditional Japanese hot dishes.',
    imageUrl: 'https://placehold.co/400x200/1E88E5/FFFFFF?text=Sushi+Central',
    rating: 4.9,
    deliveryFee: 4.99,
    minOrder: 30,
    address: '789 Oak Ave, Foodville, FL 33015'
  }
];

export const mockMenuItems: MenuItem[] = [
  // Burger Joint Items
  {
    id: 'm1',
    restaurantId: 'r1',
    name: 'Classic Cheeseburger',
    description: 'Double beef patty, american cheese, house sauce, lettuce, and tomato.',
    price: 12.99,
    imageUrl: 'https://placehold.co/100x100/FFBB00/FFFFFF?text=Cheeseburger'
  },
  {
    id: 'm2',
    restaurantId: 'r1',
    name: 'Truffle Fries',
    description: 'Crispy shoestring fries tossed in truffle oil and parmesan.',
    price: 6.99,
    imageUrl: 'https://placehold.co/100x100/FFBB00/FFFFFF?text=Fries'
  },
  {
    id: 'm3',
    restaurantId: 'r1',
    name: 'Vanilla Shake',
    description: 'Hand-spun vanilla bean milkshake with whipped cream.',
    price: 5.99,
    imageUrl: 'https://placehold.co/100x100/FFBB00/FFFFFF?text=Shake'
  },
  
  // Pizza Palace Items
  {
    id: 'm4',
    restaurantId: 'r2',
    name: 'Margherita Pizza',
    description: 'San Marzano tomato sauce, fresh mozzarella, basil, and extra virgin olive oil.',
    price: 16.99,
    imageUrl: 'https://placehold.co/100x100/E53935/FFFFFF?text=Margherita'
  },
  {
    id: 'm5',
    restaurantId: 'r2',
    name: 'Pepperoni Pizza',
    description: 'Classic cheese pizza topped with crispy pepperoni slices.',
    price: 18.99,
    imageUrl: 'https://placehold.co/100x100/E53935/FFFFFF?text=Pepperoni'
  },
  {
    id: 'm6',
    restaurantId: 'r2',
    name: 'Garlic Knots',
    description: 'Warm dough knots tossed in garlic butter and herbs, served with marinara.',
    price: 7.99,
    imageUrl: 'https://placehold.co/100x100/E53935/FFFFFF?text=Garlic+Knots'
  },
  
  // Sushi Central Items
  {
    id: 'm7',
    restaurantId: 'r3',
    name: 'Spicy Tuna Roll',
    description: 'Fresh yellowfin tuna, spicy mayo, and cucumber, topped with sesame seeds.',
    price: 9.99,
    imageUrl: 'https://placehold.co/100x100/1E88E5/FFFFFF?text=Tuna+Roll'
  },
  {
    id: 'm8',
    restaurantId: 'r3',
    name: 'Salmon Sashimi',
    description: '5 pieces of premium, thinly sliced fresh Atlantic salmon.',
    price: 14.99,
    imageUrl: 'https://placehold.co/100x100/1E88E5/FFFFFF?text=Sashimi'
  },
  {
    id: 'm9',
    restaurantId: 'r3',
    name: 'Miso Soup',
    description: 'Traditional Japanese soup with tofu, wakame seaweed, and scallions.',
    price: 3.99,
    imageUrl: 'https://placehold.co/100x100/1E88E5/FFFFFF?text=Miso+Soup'
  }
];