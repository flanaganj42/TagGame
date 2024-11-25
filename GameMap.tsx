import React, { useEffect, useState } from 'react';
import { MapPin, Users } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import toast from 'react-hot-toast';

export default function GameMap() {
  const { currentUser, nearbyPlayers, addTag } = useGameStore();
  const [position, setPosition] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition(
        (pos) => setPosition(pos),
        (err) => toast.error('Please enable location services to play!')
      );
    }
  }, []);

  const handleTag = async (targetId: string) => {
    if (!position) return;
    
    try {
      const tag = {
        id: crypto.randomUUID(),
        tagger_id: currentUser!.id,
        tagged_id: targetId,
        points: 10,
        timestamp: new Date().toISOString(),
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      };
      
      addTag(tag);
      toast.success('Tag successful! +10 points');
    } catch (error) {
      toast.error('Failed to tag player');
    }
  };

  return (
    <div className="relative w-full h-[70vh] bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          <span className="font-medium">{nearbyPlayers.length} Nearby Players</span>
        </div>
      </div>
      
      {nearbyPlayers.map((player) => (
        <button
          key={player.id}
          onClick={() => handleTag(player.id)}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`
          }}
        >
          <div className="relative">
            <MapPin className="w-8 h-8 text-red-500 group-hover:text-red-600 transition-colors" />
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="whitespace-nowrap font-medium">{player.username}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}