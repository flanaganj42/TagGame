import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navigation from './components/Navigation';
import AuthGuard from './components/AuthGuard';
import GameMap from './components/GameMap';
import Leaderboard from './components/Leaderboard';
import Shop from './components/Shop';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Toaster position="top-right" />
        <Navigation />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/"
              element={
                <AuthGuard>
                  <GameMap />
                </AuthGuard>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <AuthGuard>
                  <Leaderboard />
                </AuthGuard>
              }
            />
            <Route
              path="/shop"
              element={
                <AuthGuard>
                  <Shop />
                </AuthGuard>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthGuard>
                  <ProfilePage />
                </AuthGuard>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;