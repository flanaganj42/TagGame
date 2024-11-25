import { create } from 'zustand';
import { User, Tag, ShopItem } from '../types';
import { supabase } from '../lib/supabase';

interface GameState {
  currentUser: User | null;
  nearbyPlayers: User[];
  tagHistory: Tag[];
  shopItems: ShopItem[];
  bonusPool: number;
  setCurrentUser: (user: User | null) => void;
  updateNearbyPlayers: (players: User[]) => void;
  addTag: (tag: Tag) => Promise<void>;
  updateBonusPool: (amount: number) => void;
  purchaseItem: (itemId: string) => Promise<boolean>;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentUser: null,
  nearbyPlayers: [],
  tagHistory: [],
  shopItems: [],
  bonusPool: 0,
  setCurrentUser: (user) => set({ currentUser: user }),
  updateNearbyPlayers: (players) => set({ nearbyPlayers: players }),
  addTag: async (tag) => {
    try {
      const { data, error } = await supabase
        .from('tags')
        .insert([tag])
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        tagHistory: [data, ...state.tagHistory],
        bonusPool: state.bonusPool + 1
      }));

      // Check if bonus pool should be awarded
      const { tagHistory, bonusPool } = get();
      if (tagHistory.length >= 1000) {
        // Award random player
        const randomPlayer = Math.floor(Math.random() * get().nearbyPlayers.length);
        const winner = get().nearbyPlayers[randomPlayer];
        
        // Reset bonus pool
        set({ bonusPool: 0 });
        
        return winner;
      }
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  },
  updateBonusPool: (amount) => set({ bonusPool: amount }),
  purchaseItem: async (itemId) => {
    const { currentUser, shopItems } = get();
    if (!currentUser) return false;

    const item = shopItems.find((i) => i.id === itemId);
    if (!item || currentUser.points < item.price) return false;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ points: currentUser.points - item.price })
        .eq('id', currentUser.id);

      if (error) throw error;

      set((state) => ({
        currentUser: state.currentUser
          ? { ...state.currentUser, points: state.currentUser.points - item.price }
          : null
      }));

      return true;
    } catch (error) {
      console.error('Error purchasing item:', error);
      return false;
    }
  }
}));