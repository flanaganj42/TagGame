export interface User {
  id: string;
  username: string;
  points: number;
  tags_given: number;
  tags_received: number;
  avatar_url: string;
}

export interface Tag {
  id: string;
  tagger_id: string;
  tagged_id: string;
  points: number;
  timestamp: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: 'power-ups' | 'cosmetics' | 'rewards';
}