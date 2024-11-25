import React from 'react';
import { ShoppingBag, Gift, Zap } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import toast from 'react-hot-toast';

const SHOP_ITEMS = [
  {
    id: '1',
    name: 'Double Points',
    description: 'Earn 2x points for the next hour',
    price: 100,
    image_url: 'https://images.unsplash.com/photo-1533740566848-5f7d3e04e3d7?w=300',
    category: 'power-ups'
  },
  {
    id: '2',
    name: 'Rainbow Trail',
    description: 'Leave a colorful trail as you move',
    price: 200,
    image_url: 'https://images.unsplash.com/photo-1507908708918-778587c9e563?w=300',
    category: 'cosmetics'
  },
  {
    id: '3',
    name: 'Gift Card',
    description: '$10 Amazon Gift Card',
    price: 1000,
    image_url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300',
    category: 'rewards'
  }
];

export default function Shop() {
  const { currentUser, purchaseItem } = useGameStore();

  const handlePurchase = async (itemId: string) => {
    const success = await purchaseItem(itemId);
    if (success) {
      toast.success('Item purchased successfully!');
    } else {
      toast.error('Failed to purchase item');
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingBag className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold">Shop</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SHOP_ITEMS.map((item) => (
          <div key={item.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-purple-600">{item.price} points</span>
              <button
                onClick={() => handlePurchase(item.id)}
                disabled={!currentUser || currentUser.points < item.price}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Purchase
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}