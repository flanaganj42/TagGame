import React from 'react';
import { useGameStore } from '../store/gameStore';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LogOut, Trophy, Target } from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, setCurrentUser } = useGameStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    navigate('/auth');
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-4 mb-8">
          <img
            src={currentUser.avatar_url}
            alt={currentUser.username}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{currentUser.username}</h1>
            <p className="text-gray-600">Member since {new Date(currentUser.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Total Points</h3>
            </div>
            <p className="text-2xl font-bold">{currentUser.points}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold">Tags Given</h3>
            </div>
            <p className="text-2xl font-bold">{currentUser.tags_given}</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">Tags Received</h3>
            </div>
            <p className="text-2xl font-bold">{currentUser.tags_received}</p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}