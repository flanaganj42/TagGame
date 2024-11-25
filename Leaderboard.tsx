import React from 'react';
import { Trophy, Share2 } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export default function Leaderboard() {
  const { nearbyPlayers } = useGameStore();

  const handleShare = async (username: string, points: number) => {
    const text = `I'm playing Tag! ${username} just scored ${points} points! Join me at TagGame!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Tag Game',
          text,
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold">Leaderboard</h2>
      </div>

      <div className="space-y-4">
        {nearbyPlayers
          .sort((a, b) => b.points - a.points)
          .map((player, index) => (
            <div
              key={player.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <span className="font-bold text-lg w-8">#{index + 1}</span>
                <img
                  src={player.avatar_url}
                  alt={player.username}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{player.username}</h3>
                  <p className="text-sm text-gray-600">{player.points} points</p>
                </div>
              </div>
              <button
                onClick={() => handleShare(player.username, player.points)}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}