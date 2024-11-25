import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { currentUser } = useGameStore();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}