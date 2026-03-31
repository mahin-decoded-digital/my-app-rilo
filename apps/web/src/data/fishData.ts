import { Fish } from '@/types/game';

export const FISH_TYPES: Fish[] = [
  // Common Fish
  {
    id: 'fish-minnow',
    name: 'Minnow',
    points: 5,
    rarity: 'common',
    imageUrl: 'https://placehold.co/200x200/9CA3AF/FFFFFF?text=Minnow',
  },
  {
    id: 'fish-goldfish',
    name: 'Goldfish',
    points: 10,
    rarity: 'common',
    imageUrl: 'https://placehold.co/200x200/F59E0B/FFFFFF?text=Goldfish',
  },
  {
    id: 'fish-carp',
    name: 'Carp',
    points: 15,
    rarity: 'common',
    imageUrl: 'https://placehold.co/200x200/78716C/FFFFFF?text=Carp',
  },
  {
    id: 'fish-trout',
    name: 'Trout',
    points: 20,
    rarity: 'common',
    imageUrl: 'https://placehold.co/200x200/10B981/FFFFFF?text=Trout',
  },

  // Uncommon Fish
  {
    id: 'fish-catfish',
    name: 'Catfish',
    points: 35,
    rarity: 'uncommon',
    imageUrl: 'https://placehold.co/200x200/4B5563/FFFFFF?text=Catfish',
  },
  {
    id: 'fish-pufferfish',
    name: 'Pufferfish',
    points: 40,
    rarity: 'uncommon',
    imageUrl: 'https://placehold.co/200x200/FBBF24/000000?text=Pufferfish',
  },
  {
    id: 'fish-salmon',
    name: 'Salmon',
    points: 45,
    rarity: 'uncommon',
    imageUrl: 'https://placehold.co/200x200/F43F5E/FFFFFF?text=Salmon',
  },

  // Rare Fish
  {
    id: 'fish-clownfish',
    name: 'Clownfish',
    points: 80,
    rarity: 'rare',
    imageUrl: 'https://placehold.co/200x200/EA580C/FFFFFF?text=Clownfish',
  },
  {
    id: 'fish-anglerfish',
    name: 'Anglerfish',
    points: 100,
    rarity: 'rare',
    imageUrl: 'https://placehold.co/200x200/1E3A8A/FFFFFF?text=Anglerfish',
  },
  {
    id: 'fish-swordfish',
    name: 'Swordfish',
    points: 120,
    rarity: 'rare',
    imageUrl: 'https://placehold.co/200x200/0EA5E9/FFFFFF?text=Swordfish',
  },

  // Legendary Fish
  {
    id: 'fish-golden-kraken',
    name: 'Golden Kraken',
    points: 500,
    rarity: 'legendary',
    imageUrl: 'https://placehold.co/200x200/EAB308/000000?text=Golden+Kraken',
  },
  {
    id: 'fish-rainbow-leviathan',
    name: 'Rainbow Leviathan',
    points: 1000,
    rarity: 'legendary',
    imageUrl: 'https://placehold.co/200x200/8B5CF6/FFFFFF?text=Rainbow\nLeviathan',
  },
];