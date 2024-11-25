import React from 'react';
import { NavLink } from 'react-router-dom';
import { Target, Map, Trophy, ShoppingBag, User } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export default function Navigation() {
  const { currentUser, bonusPool } = useGameStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t md:relative md:border-t-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Target className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold hidden md:inline">Tag Game</span>
          </div>

          <div className="flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <Map className="w-5 h-5" />
              <span className="hidden md:inline">Map</span>
            </NavLink>

            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <Trophy className="w-5 h-5" />
              <span className="hidden md:inline">Leaderboard</span>
            </NavLink>

            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden md:inline">Shop</span>
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <User className="w-5 h-5" />
              <span className="hidden md:inline">Profile</span>
            </NavLink>
          </div>

          {currentUser && (
            <div className="hidden md:flex items-center gap-6">
              <div className="text-sm">
                <span className="text-gray-500">Points:</span>
                <span className="ml-1 font-semibold">{currentUser.points}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Bonus Pool:</span>
                <span className="ml-1 font-semibold text-green-600">${bonusPool}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}